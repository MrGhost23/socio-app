const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "You must provide a comment"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre("save", async function (next) {
  if (!this.author) {
    const err = new Error("Comment must have an author");
    return next(err);
  }
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
