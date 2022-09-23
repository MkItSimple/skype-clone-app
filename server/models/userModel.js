const mongoose = require("mongoose");

const StringType = {
  type: String,
  default: "",
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  // avatarImage: {
  //   type: String,
  //   default: "",
  // },
  avatarImage: {
    public_id: StringType,
    url: StringType,
  },
  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("User", userSchema);
