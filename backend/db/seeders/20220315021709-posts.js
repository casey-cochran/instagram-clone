'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Posts', [
     {image: 'https://tiny.cc/public/images/robot_small.png', caption: 'my first post', userId: 1  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://tiny.cc/public/images/sloganbg.png', caption: 'my second post', userId: 1 ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RllxPFy9RQXW2inG4M5xLFDg7LfBSSs1ShT4R4c6OjDlszRvZ7a5fm0xzmSVQUso1ig&usqp=CAU', caption: 'my third post', userId: 1 ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0yxKfT_hvoJmCb_PMV4csUDZRnNZRhnE8jjr5OkjbHJx_llj6vowyazART4E4CZuYC0&usqp=CAU', caption: 'my fourth post', userId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7KF4DaKCB0-uzDigkE0MzLlPM6sG34iiD3vD-TfEWPQUGfWfZHVYf4ddgLp8TOxUmrE&usqp=CAU', caption: 'my fifth post', userId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiv_K6xln3SrTl7WYHj07NIJrxJehxP_izkoaCtFl03ulq9bFKBKG4dvj0c4zWA7Ipp_I&usqp=CAU', caption: 'my sixth post', userId: 3 ,createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Posts', null, {});
  }
};
