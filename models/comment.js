"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId",
      });
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "postId",
      });
      this.hasMany(models.Like, {
        foreignKey: "commentId",
        sourceKey: "commentId",
      });
    }
  }
  Comment.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "postId",
        },
        onDelete: "cascade",
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "userId",
        },
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
