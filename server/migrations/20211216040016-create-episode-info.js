'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episode_info', {
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
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episode_info');
  },
};
