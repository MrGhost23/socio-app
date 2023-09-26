const {
  createChat,
  userChats,
  findChat,
  markChatAsRead,
} = require("../controllers/chatController");

const router = require("express").Router();

router.get("/find/:firstUsername/:secondUsername", findChat);
router.get("/:username", userChats);
router.patch("/:chatId", markChatAsRead);
router.post("/", createChat);

module.exports = router;
