const express = require("express");
const router = express.Router();
const { authCheck } = require("../middlewares/auth");

const {
  allMessages,
  sendMessage,
  updateReadBy,
  unreadMessages,
  messagesCount,
} = require("../controllers/messageControllers");

router.get("/message/:chatId", authCheck, allMessages);

router.get("/unread", authCheck, unreadMessages);
router.post("/message", authCheck, sendMessage);
router.put("/message", authCheck, updateReadBy);

router.post("/messages", authCheck, allMessages);
router.post("/messages/count", authCheck, messagesCount);

module.exports = router;
