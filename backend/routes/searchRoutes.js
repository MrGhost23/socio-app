const { searchUsers, searchPosts } = require("../controllers/searchController");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    const users = await searchUsers(query);
    const posts = await searchPosts(query);

    res.json({ users, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
