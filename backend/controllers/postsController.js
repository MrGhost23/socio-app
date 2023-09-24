const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { cleanupActivities } = require("../utils/activityUtils");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");

const createPost = async (req, res) => {
  try {
    const { username, description } = req.body;
    let postImage = null;
    if (req.file) {
      postImage = req.file.filename;
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (!description && !postImage) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You must type caption for you post" });
    }
    const newPost = new Post({
      username,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      description,
      userPicture: user.userPicture,
      postImage,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find().sort({ createdAt: -1 }).exec();
    res.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ message: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { description } = req.body;

    let postImage = null;
    if (req.file) {
      postImage = req.file.filename;
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }

    post.description = description;
    post.postImage = postImage;

    await post.save();

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }
    await Notification.deleteMany({ postId: post._id });

    await Activity.deleteMany({ postId: post._id });

    await post.deleteOne();

    res.json({ success: true, message: "Post deleted successfully!" });
  } catch (error) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ success: false, message: "Post deleted successfully!" });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 }).exec();
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const post = await Post.findById(id);
    const receiverUser = await User.findById(post.userId);

    const isLiked = post.likes.get(username);
    if (isLiked) {
      post.likes.delete(username);
      await Activity.findOneAndDelete({
        userId: req.user._id,
        postId: req.params.id,
        actionType: "like",
      });
      await Notification.findOneAndDelete({
        sender: req.user._id,
        receiver: receiverUser._id,
        actionType: "like",
        postId: req.params.id,
      });
    } else {
      post.likes.set(username, true);
      const newActivity = new Activity({
        userId: req.user._id,
        postId: req.params.id,
        actionType: "like",
        timestamp: Date.now(),
      });
      await newActivity.save();

      const notification = new Notification({
        sender: req.user._id,
        receiver: receiverUser._id,
        actionType: "like",
        postId: req.params.id,
      });
      await notification.save();
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    const user = await User.findOne({ username });
    if (user) {
      await cleanupActivities(user._id);
    }

    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getSinglePost,
  editPost,
  deletePost,
  getFeedPosts,
  getUserPosts,
  likePosts,
};
