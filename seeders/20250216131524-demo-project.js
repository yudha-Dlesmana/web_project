'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Projects', [
      {
        projectName: 'MERN-MEAN',
        startAt: new Date('2012-12-20'),
        endAt: new Date('2013-02-21'),
        desc: 'loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel purus ac orci laoreet posuere. Aenean et nunc eu ex molestie feugiat. Integer eget suscipit diam, id bibendum massa.',
        tech: ['Node Js', 'TypeScript', 'Next Js'],
        img: '/img/pic/gambar-project5.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: 'MEAN',
        startAt: new Date('2012-12-20'),
        endAt: new Date('2013-02-21'),
        desc: 'loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel purus ac orci laoreet posuere. Aenean et nunc eu ex molestie feugiat. Integer eget suscipit diam, id bibendum massa.',
        tech: ['Node Js', 'TypeScript', 'Next Js'],
        img: '/img/pic/gambar-project4.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: 'MERN',
        startAt: new Date('2012-12-20'),
        endAt: new Date('2013-02-21'),
        desc: 'loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel purus ac orci laoreet posuere. Aenean et nunc eu ex molestie feugiat. Integer eget suscipit diam, id bibendum massa.',
        tech: ['Node Js', 'TypeScript', 'Next Js'],
        img: '/img/pic/gambar-project3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Projects', null, {})
  }
};
