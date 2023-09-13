const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }
    const newComment = new Comment({
      text,
      author: req.user.userId,
      post: postId,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "firstName lastName username userPicture"
    );

    res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
  deleteComment,
};
