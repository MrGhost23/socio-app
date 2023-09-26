const { searchUsers, searchPosts } = require("../controllers/searchController");
const authenticateUser = require("../middleware/authenticateUser");

const router = require("express").Router();

router.get("/", authenticateUser, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await searchUsers(query, req.user);
    const posts = await searchPosts(query, req.user);

    res.json({ users, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
