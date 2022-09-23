const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        msg: "Incorrect Email",
        responseStatus: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        msg: "Incorrect Password",
        responseStatus: false,
      });
    delete user.password;
    const loginResponse = {
      responseStatus: true,
      status: user.status,
      logginStatus: user.logginStatus,
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatarImage: user.avatarImage,
      token: generateToken(user._id),
    };

    return res.json(loginResponse);
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", responseStatus: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    return res.json({
      responseStatus: true,
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatarImage: user.avatarImage,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const updates = req.body.updates;

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      updates
    ).exec();

    return res.json({
      updates,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getContacts = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports.allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const status = req.body.status;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        status: status,
      },
      { new: true }
    );
    return res.json({
      newStatus: userData.status,
    });
  } catch (ex) {
    next(ex);
  }
};
