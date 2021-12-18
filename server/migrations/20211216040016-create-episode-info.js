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
      dramaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      drama_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      season_index: {
        type: Sequelize.INTEGER,
      },
      episode_index: {
        type: Sequelize.INTEGER,
      },
      comment_num: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episode_infos');
  },
};
