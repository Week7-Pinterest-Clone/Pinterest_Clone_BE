const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const LikeController = require("../controllers/likes.controller");
const likeController = new LikeController();

router.put("/like/:commentId", authMiddleware, likeController.liketoggle);

module.exports = router;
