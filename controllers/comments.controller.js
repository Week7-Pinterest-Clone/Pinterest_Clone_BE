const CommentService = require("../services/comments.service");
const InvalidParamsError = require("../exceptions/index.exception");
class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals.user;

    if (!comment) {
      throw new InvalidParamsError("댓글 내용을 입력해주세요");
    }
    await this.commentService.createComment({ comment, postId, userId });

    res.status(201).json({ msg: "댓글을 작성하였습니다." });
  };

  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const { userId } = res.locals.user;

    const fcomment = await this.commentService.updateComment({
      commentId,
      comment,
      userId,
    });
    res.status(200).json({ data: fcomment, massage: "댓글을 수정하였습니다." });
  };
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const comment = await this.commentService.deleteComment({
      commentId,
      userId,
    });
    console.log(comment);
    res.status(200).json({ data: comment, msg: "댓글을 삭제했습니다." });
  };
}
module.exports = CommentController;
