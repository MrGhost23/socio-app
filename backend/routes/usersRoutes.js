const {
  getUser,
  getUserFriends,
  addRemoveFriends,
} = require("../controllers/usersController.js");
const { authenticateUser } = require("../middleware/authentication.js");

const router = require("express").Router();

router.get("/:id", authenticateUser, getUser);
router.get("/:id/friends", authenticateUser, getUserFriends);

router.patch("/:id/:friendId", authenticateUser, addRemoveFriends);

module.exports = router;
