'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Comments, {
        foreignKey: 'user_id',
<<<<<<< HEAD:server/models/user.js
        sourceKey: 'id',
=======
      });
      models.Users.hasMany(models.Notifications, {
        foreignKey: 'user_id',
      });
      models.Users.hasMany(models.Likes, {
        foreignKey: 'user_id',
>>>>>>> d6bf81ea56740392ccc1ce9ce6a403450c1610f1:server/models/users.js
      });
    }
  }
  Users.init(
    {
      user_id: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
