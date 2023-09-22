const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderUsername, req.body.receiverUsername],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: { $in: [req.params.username] } });

    const chatsWithLatestMessage = [];

    for (const chat of chats) {
      const latestMessage = await Message.findOne({ chatId: chat._id })
        .sort({ createdAt: -1 })
        .select({ createdAt: 1, text: 1 })
        .lean();

      chatsWithLatestMessage.push({
        chatId: chat._id,
        members: chat.members,
        latestMessage: latestMessage || null,
      });
    }

    res.status(200).json(chatsWithLatestMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstUsername, req.params.secondUsername] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChat, userChats, findChat };
