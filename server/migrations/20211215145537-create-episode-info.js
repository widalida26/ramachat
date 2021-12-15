'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episode_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      drama_id: {
        type: Sequelize.INTEGER,
      },
      drama_name: {
        type: Sequelize.STRING,
      },
      season_index: {
        type: Sequelize.INTEGER,
      },
      episode_index: {
        type: Sequelize.INTEGER,
      },
      comment_num: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episode_infos');
  },
};
