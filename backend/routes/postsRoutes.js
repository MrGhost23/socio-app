const router = require("express").Router();

const {
  getFeedPosts,
  getUserPosts,
  likePosts,
} = require("../controllers/postsController");
const { authenticateUser } = require("../middleware/authentication");

router.get("/", authenticateUser, getFeedPosts);
router.get("/:userId/posts", authenticateUser, getUserPosts);

router.patch("/:id/like", authenticateUser, likePosts);

module.exports = router;
