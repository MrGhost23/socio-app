const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createChat = async (req, res) => {
  const { senderUsername, receiverUsername } = req.body;

  const existingChat = await Chat.findOne({
    members: {
      $all: [senderUsername, receiverUsername],
    },
  });

  if (existingChat) {
    return res.status(200).json({ exist: true });
  }

  const newChat = new Chat({
    members: [senderUsername, receiverUsername],
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
        isRead: chat.isRead,
      });
    }

    chatsWithLatestMessage.sort((a, b) => {
      if (a.latestMessage && b.latestMessage) {
        return b.latestMessage.createdAt - a.latestMessage.createdAt;
      } else if (a.latestMessage) {
        return -1;
      } else if (b.latestMessage) {
        return 1;
      }
      return 0;
    });

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

const markChatAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { isRead: true },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error marking chat as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const unAllowMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { allowMessage: false },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error marking allowMessage false:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createChat,
  userChats,
  findChat,
  markChatAsRead,
  unAllowMessage,
};
