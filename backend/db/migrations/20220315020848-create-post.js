'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      caption: {
        type: Sequelize.STRING(350),
        allowNull: false
      },
      totalLikes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalDislikes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalComments: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
