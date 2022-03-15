'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Conversations', [
     {messages: 'testing a sample message', senderId: 1, receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {messages: 'are my messages sending', senderId: 1, receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {messages: 'did this send back?', senderId: 1, receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {messages: 'are messages loading', senderId: 1,receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {messages: 'creating an instagram clone', senderId: 1, receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
     {messages: 'last message', senderId: 1, receiverId: 2 ,createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Conversations', null, {});
  }
};
