const UserService = require("../services/users.service");
const joi = require("../util/joi");
const bcrypt = require("bcrypt");
const {
  InvalidParamsError,
  ValidationError,
} = require("../exceptions/index.exception");
require("dotenv").config();

class UsersController {
  userService = new UserService();

  /**회원가입 컨트롤러 */
  signup = async (req, res, next) => {
    try {
      const { email, nickname, password } =
        await joi.signupSchema.validateAsync(req.body);

      if (!email || !nickname || !password) {
        throw new InvalidParamsError("입력란을 확인해 주세요");
      }

      if (password.includes(nickname) || nickname.includes(password))
        throw new ValidationError("패스워드에 닉네임이 포함될수 없습니다.");

      // 비밀번호 hash
      const hashed = await bcrypt.hash(password, 12);

      const users = await Object.create({
        email: email,
        nickname: nickname,
        password: hashed,
      });

      // hash된 유저 정보를 service로 전달
      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      await this.userService.createUser(users);

      res.status(201).json({ message: "회원가입 성공." });
    } catch (error) {
      next(error);
    }
  };

  /**로그인 컨트롤러 */
  login = async (req, res, next) => {
    try {
      const { email, password } = await joi.loginSchema.validateAsync(req.body);
      console.log(email, password);
      if (!email || !password) {
        throw new InvalidParamsError("입력란을 확인해주세요");
      }

      const { accessToken, refreshToken } = await this.userService.verifyUser(
        email,
        password
      );
      console.log(accessToken);
      console.log(refreshToken);
      /**쿠키에 Token전송 */
      res.cookie("refreshToken", refreshToken);
      res.cookie("accessToken", accessToken);

      return res
        .status(200)
        .json({ accessToken, refreshToken, message: "로그인 성공." });
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const profile = await this.userService.profile(userId);

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
