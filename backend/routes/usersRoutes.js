const { getUser, followUser } = require("../controllers/usersController.js");

const router = require("express").Router();

router.get("/:username", getUser);
router.put("/:username/follow", followUser);

module.exports = router;
