const { User } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  /**유저생성 */
  createUser = async ({ email, nickname, password }) => {
    await User.create({
      email,
      nickname,
      password,
    });

    return;
  };

  /**유저 정보 찾아오기
   * @param {String} email 유저이메일
   * @param {String} password 유저비번
   * @returns 찾은 유저정보
   */
  findUser = async (email, password) => {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ email }, { password }],
      },
    });

    return user;
  };

  /**유저 이메일로 찾기
   * @param {*} email 찾을 유저이메일
   * @returns 찾은 유저정보
   */
  findByEmail = async (email) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  };

  findById = async (userId) => {
    const user = await User.findByPk(userId);
    return user;
  };

  updateToken = async (refreshToken, userId) => {
    await User.update({ refreshToken }, { where: { userId: userId } });
  };
}

module.exports = UserRepository;
