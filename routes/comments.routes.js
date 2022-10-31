const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const CommentController = require("../controllers/comments.controller");
const commentControlloer = new CommentController();

router.post("/:postId", authMiddleware, commentControlloer.createComment);
router.get("/:postId", authMiddleware, commentControlloer.findAllComment);
router.put("/:commentId", authMiddleware, commentControlloer.updateComment);
router.delete("/:commentId", authMiddleware, commentControlloer.deleteComment);

module.exports = router;
