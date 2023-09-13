const {
  getUser,
  followUser,
  getFollowersAndFollowing,
  blockUnblockUser,
  getBlockedUsers,
  getFollowers,
  getFollowing,
} = require("../controllers/usersController.js");
const verifyToken = require("../middleware/auth.js");

const router = require("express").Router();

router.get("/:username", verifyToken, getUser);
router.put("/:username/follow", verifyToken, followUser);
router.get("/:username/followers", verifyToken, getFollowers);
router.get("/:username/following", verifyToken, getFollowing);
router.post("/:username/block-unblock", verifyToken, blockUnblockUser);
router.get("/:username/blocked-users", verifyToken, getBlockedUsers);

module.exports = router;
