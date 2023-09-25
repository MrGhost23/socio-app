const router = require("express").Router();

const {
  getNotificationsWithUserData,
  markAsReadNotification,
} = require("../controllers/notificationController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser, getNotificationsWithUserData);
router.patch("/:notificationId", authenticateUser, markAsReadNotification);

module.exports = router;
