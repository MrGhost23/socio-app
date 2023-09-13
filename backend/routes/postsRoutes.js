const router = require("express").Router();

const {
  getFeedPosts,
  getUserPosts,
  likePosts,
  editPost,
  deletePost,
  getSinglePost,
} = require("../controllers/postsController");
const verifyToken = require("../middleware/auth");

router.get("/user/:username", verifyToken, getUserPosts);

router.get("/:postId", verifyToken, getSinglePost);
router.patch("/:postId", verifyToken, editPost);
router.delete("/:postId", verifyToken, deletePost);

router.get("/", verifyToken, getFeedPosts);
router.patch("/:id/like", verifyToken, likePosts);

module.exports = router;
