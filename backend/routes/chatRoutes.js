const {
  createChat,
  userChats,
  findChat,
  markChatAsRead,
  unAllowMessage,
} = require("../controllers/chatController");

const router = require("express").Router();

router.get("/find/:firstUsername/:secondUsername", findChat);
router.get("/:username", userChats);
router.patch("/:chatId", markChatAsRead);
router.patch("/:chatId/unAllowMessage", unAllowMessage);
router.post("/", createChat);

module.exports = router;
