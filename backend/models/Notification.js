const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  actionType: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
