const { addMessage, getMessages } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", addMessage);

router.get("/:chatId", getMessages);

module.exports = router;
