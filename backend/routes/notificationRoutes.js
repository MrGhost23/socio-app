const router = require("express").Router();

const {
  getNotificationsWithUserData,
} = require("../controllers/notificationController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser, getNotificationsWithUserData);

module.exports = router;
