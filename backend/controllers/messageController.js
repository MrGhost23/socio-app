const Chat = require("../models/Chat");
const Message = require("../models/Message");

const addMessage = async (req, res) => {
  const { chatId, senderUsername, text } = req.body;
  const message = new Message({
    chatId,
    senderUsername,
    text,
  });
  try {
    const result = await message.save();
    await Chat.findByIdAndUpdate(chatId, { isRead: false }, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
