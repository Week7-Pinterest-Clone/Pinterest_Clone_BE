const { Router } = require("express");
const usersRouter = Router();

const authMiddleware = require("../middlewares/authMiddleware");
const loginAuthMiddleware = require("../middlewares/loginAuthMiddleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

//회원가입
usersRouter.post("/signup", loginAuthMiddleware, usersController.signup);

//로그인
usersRouter.post("/login", loginAuthMiddleware, usersController.login);

//유저 프로필 조회
usersRouter.get("/:userId", authMiddleware, usersController.profile);

module.exports = usersRouter;
