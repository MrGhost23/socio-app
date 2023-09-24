const router = require("express").Router();

const {
  getFeedPosts,
  getUserPosts,
  likePosts,
  deletePost,
  getSinglePost,
} = require("../controllers/postsController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/user/:username", authenticateUser, getUserPosts);

router.get("/:postId", authenticateUser, getSinglePost);
router.delete("/:postId", authenticateUser, deletePost);

router.get("/", authenticateUser, getFeedPosts);
router.patch("/:id/like", authenticateUser, likePosts);

module.exports = router;
