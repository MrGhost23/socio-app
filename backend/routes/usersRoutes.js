const {
  getUser,
  followUser,
  blockUnblockUser,
  getBlockedUsers,
  getFollowers,
  getFollowing,
  toggleBookmark,
  getBookmarkedPosts,
  isFollowing,
} = require("../controllers/usersController.js");
const verifyToken = require("../middleware/auth.js");

const router = require("express").Router();

router.get("/:username", verifyToken, getUser);
router.put("/:username/follow", verifyToken, followUser);
router.get("/:username/followers", verifyToken, getFollowers);
router.get("/:username/following", verifyToken, getFollowing);
router.get("/:username/isFollowing", verifyToken, isFollowing);
router.post("/:username/block-unblock", verifyToken, blockUnblockUser);
router.get("/:username/blocked-users", verifyToken, getBlockedUsers);
router.post("/:username/toggle-bookmark/:postId", verifyToken, toggleBookmark);
router.get("/:username/bookmarked-posts", verifyToken, getBookmarkedPosts);

module.exports = router;
