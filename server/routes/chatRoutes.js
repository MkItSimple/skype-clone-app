const express = require("express");
const router = express.Router();
const { authCheck } = require("../middlewares/auth");

const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
  updateGroupChat,

  deleteGroupChat,
} = require("../controllers/chatController");

router.post("/chat", authCheck, accessChat);
router.get("/chat", authCheck, fetchChats);
router.post("/chat/group", authCheck, createGroupChat);
router.put("/chat/group", authCheck, updateGroupChat);
router.post("/chat/rename", authCheck, renameGroupChat);
router.put("/chat/groupadd", authCheck, addToGroup);
router.put("/chat/groupremove", authCheck, removeFromGroup);

router.delete("/chat/group/:chatId", authCheck, deleteGroupChat);

module.exports = router;
