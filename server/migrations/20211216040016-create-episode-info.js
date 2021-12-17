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
      dramaid: {
        type: Sequelize.INTEGER,
      },
      dramaname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      seasonindex: {
        type: Sequelize.INTEGER,
      },
      episodeindex: {
        type: Sequelize.INTEGER,
      },
      commentnum: {
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
