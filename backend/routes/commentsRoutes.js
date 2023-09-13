const router = require("express").Router();
const {
  createComment,
  getCommentsForPost,
  deleteComment,
} = require("../controllers/commentController");
const verifyToken = require("../middleware/auth");

router.post("/:postId/comments", verifyToken, createComment);

router.get("/:postId/comments", verifyToken, getCommentsForPost);

router.delete("/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
