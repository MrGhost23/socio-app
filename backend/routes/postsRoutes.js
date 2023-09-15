const router = require("express").Router();

const {
  getFeedPosts,
  getUserPosts,
  likePosts,
  editPost,
  deletePost,
  getSinglePost,
} = require("../controllers/postsController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/user/:username", authenticateUser, getUserPosts);

router.get("/:postId", authenticateUser, getSinglePost);
router.patch("/:postId", authenticateUser, editPost);
router.delete("/:postId", authenticateUser, deletePost);

router.get("/", authenticateUser, getFeedPosts);
router.patch("/:id/like", authenticateUser, likePosts);

module.exports = router;
