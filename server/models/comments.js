'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.hasOne(models.Users, {
        foreignKey: 'id',
      });
      models.Comments.belongsTo(models.Episode_infos, {
        onDelete: 'cascade',
        foreignKey: 'id',
      });
      models.Comments.hasMany(models.Notifications, {
        foreignKey: 'comment_id',
      });
      models.Comments.hasMany(models.Likes, {
        foreignKey: 'target_id',
      });
    }
  }
  Comments.init(
    {
      episodeid: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      parentcomment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};
