const express = require("express");
const router = express.Router();
const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
const likeRouter = require("./likes.routes");

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/save", postsRouter);
router.use("/comments", likeRouter);
router.use("/comments", commentRouter);

module.exports = router;
