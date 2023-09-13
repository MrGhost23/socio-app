const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid postId" });
    }
    const newComment = new Comment({
      text,
      author: req.user.userId,
      post: postId,
    });
    const savedComment = await newComment.save();
    res.status(StatusCodes.CREATED).json(savedComment);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
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

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Comment not found" });
    }
    console.log(comment.author._id)

    if (comment.author.toString() !== req.user.userId.toString()) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You don't have permission to edit this comment" });
    }

    comment.text = text;
    const updatedComment = await comment.save();

    res.json(updatedComment);
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.userId.toString()) {
      return res
        .status(StatusCodes.FORBIDDEN)
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
  editComment,
  deleteComment,
};
