'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Projects', 'userId', {
      type: Sequelize.INTEGER,
      allowNull:false,
    });

    await queryInterface.addConstraint('Projects', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_userId_users',
        references: {
          table: 'Users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Projects', 'fk_userId_users');
    await queryInterface.removeColumn('Projects', 'userId')
  }
};
