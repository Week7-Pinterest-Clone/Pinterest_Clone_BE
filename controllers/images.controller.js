const ImageService = require("../services/images.service");
const PostsService = require("../services/posts.service");
const UserService = require("../services/users.service");
const aws = require("aws-sdk");
require("dotenv").config();

class ImagesController {
  imageService = new ImageService();
  postsService = new PostsService();
  usersService = new UserService();

  profileUpdate = async (req, res, next) => {
    const { email } = res.locals.user;
    //console.log(email, "이메일");
    const { userId } = req.params;
    //console.log(userId)
    const findUser = await this.usersService.profile(userId);
    //console.log(findUser)
    if (email !== findUser.email) {
      return res.status(400).json({ errorMessage: "권한이 없습니다." });
    }
    try {
      //console.log(req.file);
      const image = req.files;
      const { nickname, introduce } = req.body;

      //이미지 수정
      if (image) {
        const findUserImage = findUser.avatar.split("/")[4];
        const findUserLastImage = `profile-image/${findUserImage}`;
        console.log(findUserImage, "아아아아");

        try {
          const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
          });

          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: findUserLastImage,
          };

          s3.deleteObject(params, function (err, data) {
            if (err) {
              console.log(err, err.stack);
            } else {
              res.status(200)
              next();
            }
          });
        } catch (error) {
          next(error);
        }

        const value = Object.values({ image });
        const imageUrl = value[0][0].transforms[0].location;
        await this.imageService.uploadImage(imageUrl, userId);
      }

      //닉네임 수정
      if (nickname) {
        await this.usersService.updateNickname(nickname, userId);
      }

      //소개글 수정
      if (introduce) {
        await this.usersService.updateIntroduce(introduce, userId);
      }

      if (!image && !nickname && !introduce) {
        res.status(200).json({ msg: "변경할 내용이 없습니다" });
      }
      res.status(200).json({ msg: "프로필 수정 완료!" });
    } catch (error) {
      next(error);
    }
  };

  // 게시글(post) 이미지
  createPosts = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    try {
      const images = req.files;

      const values = Object.values({ images });
      const imageUrls = values[0][0].transforms[0].location;

      // if (!images) {
      //   res.status(400).send({ message: "이미지를 추가해 주세요." });
      //   return;
      // }
      await this.imageService.createPost(imageUrls, userId, title, content);

      res.status(200).json({ msg: "이미지 업로드 완료!", postimg: imageUrls });
    } catch (error) {
      next(error);
    }
  };

  // S3 이미지 삭제
  // deleteImage = async (req, res, next) => {
  //   const { userId } = res.locals.user;
  //   const { postId } = req.params;
  //   const findPost = await this.postsService.findOnePost(postId);
  //   const findkey = findPost.postImg.split("/")[3];
  //   console.log(findkey);

  //   if (userId !== findPost.userId) {
  //     return res.status(400).json({ errorMessage: "권한이 없습니다." });
  //   }

  //   try {

  //     const s3 = new aws.S3({
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //       region: process.env.AWS_REGION,
  //     });

  //     const params = {
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: findkey,
  //     };

  //     s3.deleteObject(params, function (err, data) {
  //       if (err) {
  //         console.log(err, err.stack);
  //       } else {
  //         res.status(200).json({ message: "이미지와 게시글이 삭제되었습니다." });
  //         next();
  //       }

  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

module.exports = ImagesController;
