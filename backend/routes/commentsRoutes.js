const router = require("express").Router();
const {
  createComment,
  getCommentsForPost,
  deleteComment,
  editComment,
} = require("../controllers/commentController");
const verifyToken = require("../middleware/auth");
const authenticateUser = require("../middleware/authenticateUser");

router.post("/:postId/comments", authenticateUser, createComment);

router.get("/:postId/comments", authenticateUser, getCommentsForPost);

router.patch("/comments/:commentId", authenticateUser, editComment);

router.delete("/comments/:commentId", authenticateUser, deleteComment);

module.exports = router;
