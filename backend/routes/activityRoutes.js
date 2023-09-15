const router = require("express").Router();
const { getAllUserActivities } = require("../controllers/activityController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/:username/activities", authenticateUser, getAllUserActivities);

module.exports = router;
