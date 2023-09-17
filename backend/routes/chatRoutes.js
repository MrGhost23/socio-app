const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chatController");

const router = require("express").Router();

router.post("/", createChat);
router.get("/:username", userChats);
router.get("/find/:firstUsername/:secondUsername", findChat);

module.exports = router;
