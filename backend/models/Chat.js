const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
