const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { username, description, postImage } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(username);
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
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePosts,
};
