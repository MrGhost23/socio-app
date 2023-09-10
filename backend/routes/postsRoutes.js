const router = require("express").Router();

const {
  getFeedPosts,
  getUserPosts,
  likePosts,
} = require("../controllers/postsController");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, getFeedPosts);
router.get("/:username/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePosts);

module.exports = router;
