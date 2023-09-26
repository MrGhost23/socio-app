const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const Activity = require("../models/Activity");
const { cleanupActivities } = require("../utils/activityUtils");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid postId" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }

    const newComment = new Comment({
      text,
      author: req.user._id,
      post: postId,
    });

    const savedComment = await newComment.save();

    const newActivity = new Activity({
      userId: req.user._id,
      postId,
      actionType: "comment",
      timestamp: Date.now(),
    });
    await newActivity.save();

    const isCurrentUserOwner = req.user._id.equals(post.userId);
    if (!isCurrentUserOwner) {
      const notification = new Notification({
        sender: req.user._id,
        receiver: post.userId,
        actionType: "comment",
        postId,
      });
      await notification.save();
    }

    if (req.user) {
      await cleanupActivities(req.user._id);
    }

    res.status(StatusCodes.CREATED).json(savedComment);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const currentUser = req.user;

    if (!currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const blockedUserIds = currentUser.blockedUsers.map((userId) =>
      userId.toString()
    );

    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "firstName lastName username userPicture",
      match: { _id: { $nin: blockedUserIds } },
    });

    const filteredComments = comments.filter(
      (comment) => comment.author !== null
    );

    res.status(StatusCodes.OK).json(filteredComments);
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
    console.log(comment.author._id);

    if (comment.author.toString() !== req.user._id.toString()) {
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

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You do not have permission to delete this comment" });
    }

    await comment.deleteOne();
    await Activity.findOneAndDelete({
      userId: req.user._id,
      postId: comment.post,
      actionType: "comment",
    });
    await Notification.findOneAndDelete({
      sender: req.user._id,
      receiver: comment.author,
      actionType: "comment",
      postId: comment.post,
    });

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
