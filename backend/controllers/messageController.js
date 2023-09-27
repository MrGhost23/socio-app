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
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.allowMessage) {
      return res
        .status(403)
        .json({ message: "This chat does not allow messages" });
    }

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
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const result = await Message.find({ chatId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
