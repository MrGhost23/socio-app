const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
  try {
    const { username, description, postImage } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (!description) {
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
    const isLiked = post.likes.get(username);
    if (isLiked) {
      post.likes.delete(username);
    } else {
      post.likes.set(username, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePosts,
};
