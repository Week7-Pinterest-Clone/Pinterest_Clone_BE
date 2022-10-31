const { Comment, User, Like } = require("../models/");

class CommentRepository extends Comment {
  constructor() {
    super();
  }
  //*댓글작성
  createComment = async ({ comment, postId, userId }) => {
    const createComment = await Comment.create({
      comment,
      userId,
      postId,
    });
    return createComment;
  };
  //*댓글 찾기
  findOneComment = async ({ commentId }) => {
    const comments = await Comment.findOne({ where: { commentId } });
    return comments;
  };

  //*댓글수정
  updateComment = async ({ userId, comment, commentId }) => {
    const updateComment = await Comment.update(
      { comment: comment },
      { where: { commentId: commentId, userId: userId } }
    );
    return updateComment;
  };
  //*댓글 삭제
  deleteComment = async ({ commentId }) => {
    const deleteComment = await Comment.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}
module.exports = CommentRepository;
