const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

module.exports.unreadMessages = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find(
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      ["_id"]
    );

    let chatsIDs = [];
    for (let i = 0; i < chats.length; i++) {
      chatsIDs.push(chats[i]._id);
    }

    const allChatsMesssages = await Message.find(
      {
        chat: { $in: chatsIDs },
        readBy: { $not: { $elemMatch: { $eq: req.user._id } } },
      },
      ["content", "chat"]
    );

    res.status(200).send(allChatsMesssages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports.allMessages = asyncHandler(async (req, res) => {
  const { chatId, skip } = req.body;

  try {
    const messages = await Message.find({ chat: chatId })
      .skip(skip)
      .populate("sender", "firstname lastname avatarImage email status")
      .populate("readBy", "firstname lastname avatarImage")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports.messagesCount = async (req, res) => {
  const count = await Message.find({ chat: req.body.chatId }).count();
  res.json(count);
};

module.exports.sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    readBy: [req.user._id],
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate(
      "sender",
      "firstname lastname avatarImage"
    );
    message = await message.populate(
      "readBy",
      "firstname lastname avatarImage"
    );
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports.updateReadBy = asyncHandler(async (req, res) => {
  const { chatId } = req.body;

  try {
    const filter = {
      chat: chatId,
      readBy: { $not: { $elemMatch: { $eq: req.user._id } } },
    };
    const update = { $push: { readBy: req.user._id } };
    const messagesToUpdate = await Message.updateMany(filter, update, {
      new: true,
    });

    const updatedChat = await Chat.find({ _id: chatId }).populate(
      "latestMessage"
    );

    res.json({ updatedChat });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
