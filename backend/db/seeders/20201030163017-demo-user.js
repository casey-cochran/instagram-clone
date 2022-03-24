'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        image: 'https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?t=st=1648132808~exp=1648133408~hmac=c6ff910af4d08289049bee77f83c51152c0b77190fae2263cf6a2e6a940bb691&w=1480',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        image: 'https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?t=st=1648132808~exp=1648133408~hmac=dc514cbc1f82ca1e3ccecc64a427aa6dc43864e0f3895b354c1ce59df422d97a&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Lets keep it short',
        image: 'https://img.freepik.com/free-vector/abstract-banner-background-with-red-shapes_1361-3348.jpg?t=st=1648132808~exp=1648133408~hmac=1779e7dd2f5030e0b4545a8c68b7dea4ade505b1d8b9f710d90b2ffdcd79148d&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Coding is a tough thing to learn',
        image: 'https://img.freepik.com/free-vector/hand-painted-watercolor-nature-background_23-2148941599.jpg?t=st=1648132808~exp=1648133408~hmac=e7e7dd748dd8596a666d62e8935c1310c5f6ae69c4e7a5cdbe724ef22c5a7b7a&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Demon Slayer = best anime',
        image: 'https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149009911.jpg?t=st=1648132808~exp=1648133408~hmac=21d3b4ad7613496d5e58bcebde593a84a0830b422bf17d12aceb6a61ba81e34d&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Long walks on the beach',
        image: 'https://img.freepik.com/free-photo/red-black-brush-stroke-banner-background-perfect-canva_1361-3597.jpg?t=st=1648132808~exp=1648133408~hmac=6cc831a6f3f77bfbf0c176f048a80594253d9ea639c4b01d2698c929a5d46819&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Long walks in the park',
        image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg?t=st=1648132808~exp=1648133408~hmac=dc7ee5c4a863feaefe60c20ff230b404634c4605e121de2ae32b3783393114b7&w=1060',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Whats your top 5 travel destinations?',
        image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-798.jpg?t=st=1648132808~exp=1648133408~hmac=3b1efe6d951f2ae8329bf50d783f550ef95eb6506e36d9a002bbb59d2499374d&w=1060',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'One of my favorite foods is pizza',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_23-2148281796.jpg?t=st=1648132808~exp=1648133408~hmac=7dec5b391a71ffdf2fd4ca5273651184c5d5f8050ac8e439f30cc6525e332b63&w=1060',
        bio: 'A little long paragraph that is supposed to be my bio but I am not sure what to put here so I am just typing out my current thoughts about this long bio',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Just a few more days..',
        image: 'https://img.freepik.com/free-vector/gradient-black-backgrounds-with-golden-frames_23-2149150610.jpg?t=st=1648132808~exp=1648133408~hmac=9e8681d09782d6084feecff09a98438e799fe581ebbf49543727f102806343a7&w=1800',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Could be worse..',
        image: 'https://img.freepik.com/free-photo/oak-wood-textured-design-background_53876-160563.jpg?t=st=1648132808~exp=1648133408~hmac=46ca1f491e25e02c00e56e7f46a14846b1059c98ff55d6622ea4ea84e0c03699&w=740',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        bio: 'Time goes by quickly.',
        image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_23-2148276163.jpg?t=st=1648132808~exp=1648133408~hmac=891e3f9f45c41997b557025f3225aa96e7145461cf7d6b1b9761dc4d8d9f0c1e&w=1060',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
