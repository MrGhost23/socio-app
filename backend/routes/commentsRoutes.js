const router = require("express").Router();
const {
  createComment,
  getCommentsForPost,
  deleteComment,
  editComment,
} = require("../controllers/commentController");
const verifyToken = require("../middleware/auth");

router.post("/:postId/comments", verifyToken, createComment);

router.get("/:postId/comments", verifyToken, getCommentsForPost);

router.patch("/comments/:commentId", verifyToken, editComment);

router.delete("/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
