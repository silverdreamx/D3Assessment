'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Maillists', {
      teacher: {
        type: Sequelize.STRING,
        allowNull: false
      },
      student: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.INTEGER(2)
      }
  })},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Maillists');
  }
};