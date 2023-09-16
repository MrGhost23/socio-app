const { login, logout, register } = require("../controllers/authController");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login).get("/logout", logout);

module.exports = router;
