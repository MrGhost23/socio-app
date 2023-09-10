const {
  getUser,
  getUserFriends,
  addRemoveFriends,
  followUser,
} = require("../controllers/usersController.js");
const { authenticateUser } = require("../middleware/authentication.js");

const router = require("express").Router();

router.get("/:username", getUser);
router.get("/:username/friends", getUserFriends);
router.put("/:username/follow", followUser);

module.exports = router;
