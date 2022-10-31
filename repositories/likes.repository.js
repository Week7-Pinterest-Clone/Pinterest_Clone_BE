const { Like } = require("../models/");
const { Comment } = require("../models/");

class LikeRepository extends Like {
  constructor() {
    super();
  }
  //*좋아요 데이터 찾기
  findLike = async ({ userId, commentId }) => {
    const findLike = await Like.findOne({ where: { userId, commentId } });
    return findLike;
  };
  //*좋아요 만들기
  createLike = async ({ userId, commentId }) => {
    const createLike = await Like.create({ userId, commentId });
    return createLike;
  };
  //*좋아요 취소
  destroyLike = async ({ userId, commentId }) => {
    const destroyLike = await Like.destroy({ where: { userId, commentId } });
    return destroyLike;
  };
  //*좋아요 on
  upLike = async ({ commentId }) => {
    const upLike = await Comment.increment(
      { likeCount: 1 },
      { where: { commentId } }
    );
    return upLike;
  };
  //*좋아요off
  downLike = async ({ commentId }) => {
    const downLike = await Comment.increment(
      { likeCount: -1 },
      { where: { commentId } }
    );
    return downLike;
  };
  //*좋아요 count 가져오기
  likeCount = async ({ commentId }) => {
    const likeCount = await Comment.findOne({ where: { commentId } });
    return likeCount;
  };
}
module.exports = LikeRepository;
