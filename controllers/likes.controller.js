const LikeService = require("../services/likes.service");
const InvalidParamsError = require("../exceptions/index.exception");
const like = require("../models/like");

class LikeController {
  likeService = new LikeService();

  liketoggle = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;
      if (!userId || !commentId) {
        throw new InvalidParamsError("잘못된 요청입니다.");
      }
      const findLike = await this.likeService.findLike({ userId, commentId });
      if (!findLike) {
        const createLike = await this.likeService.createLike({
          userId,
          commentId,
        });
        const likeCount = await this.likeService.likeCount({ commentId });
        return res
          .status(201)
          .json({ createLike, data: likeCount, msg: "좋아요 등록완료" });
      }
      if (findLike) {
        const destroyLike = await this.likeService.destroyLike({
          userId,
          commentId,
        });
        const likeCount = await this.likeService.likeCount({ commentId });
        return res
          .status(200)
          .json({ destroyLike, data: likeCount, msg: "좋아요 등록취소" });
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = LikeController;
