'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {content: 'trying to load comments for a post', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'I am loving this newly created post', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'another user is trying to comment here', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'final capstone project', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'only 4 more weeks until finish', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'not sure what else to comment here', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
     {content: 'my final comment please do not delete me', userId: 2, postId: 1, createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
