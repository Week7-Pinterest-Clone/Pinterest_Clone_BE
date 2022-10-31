const { Post, User, Save } = require('../models');

class PostRepository {
  //게시글전체조회
  findAllPost = async () => {
    const allPost = await Post.findAll({
      include: { model: User },
    });

    return allPost;
  };
  //게시글상세조회
  findOnePost = async (postId) => {

    const postsOne = await Post.findOne({
      where: { postId },
      include: [{ model: User }],
    });
    console.log(postsOne)
    return postsOne;
  };
  //게시글업로드
  createPosts = async (userId, title, content) => {
    await Post.create({
      userId,
      title,
      content,
    });
    return;
  };

  //게시글 삭제
  deletePosts = async (postId) => {
    const deletePost = Post.destroy({
      where: { postId },
    });

    return deletePost;
  };

  //게시글 저장 (찜하기)

  findSave = async ({ postId, userId }) => {
    const findSave = await Save.findOne({ where: { userId, postId } });

    return findSave;
  };
  createSave = async (postId, userId) => {
    await Save.create({ userId: userId, postId: postId });
  };
  destroysave = async (postId, userId) => {
    await Save.destroy({ where: { postId: postId, userId: userId } });
  };
}

module.exports = PostRepository;
