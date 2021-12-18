'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode_infos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Episode_infos.hasMany(models.Comments, {
        foreignKey: 'episode_id',
      });
    }
  }
  Episode_infos.init(
    {
      dramaId: DataTypes.INTEGER,
      dramaName: DataTypes.STRING,
      seasonIndex: DataTypes.INTEGER,
      episodeIndex: DataTypes.INTEGER,
      commentNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Episode_infos',
    }
  );
  return Episode_infos;
};
