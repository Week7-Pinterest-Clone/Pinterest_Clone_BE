"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
      this.belongsTo(models.Comment, {
        foreignKey: "commentId",
        targetKey: "commentId",
      });
    }
  }
  Like.init(
    {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      commentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Comment",
          key: "commentId",
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
    },
    {
      sequelize,
      modelName: "Like",
      timestamps: false,
    }
  );
  return Like;
};
