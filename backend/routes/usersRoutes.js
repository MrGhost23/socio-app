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
const authenticateUser = require("../middleware/authenticateUser.js");

const router = require("express").Router();

router.get("/:username", authenticateUser, getUser);
router.put("/:username/follow", authenticateUser, followUser);
router.get("/:username/followers", authenticateUser, getFollowers);
router.get("/:username/following", authenticateUser, getFollowing);
router.get("/:username/isFollowing", authenticateUser, isFollowing);
router.post("/:username/block-unblock", authenticateUser, blockUnblockUser);
router.get("/:username/blocked-users", authenticateUser, getBlockedUsers);
router.post(
  "/:username/toggle-bookmark/:postId",
  authenticateUser,
  toggleBookmark
);
router.get("/:username/bookmarked-posts", authenticateUser, getBookmarkedPosts);

module.exports = router;
