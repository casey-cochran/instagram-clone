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
     {image: 'https://img.freepik.com/free-vector/red-rooster-cock-side-view-abstract_1284-16627.jpg?t=st=1648132808~exp=1648133408~hmac=0e1115395558600addef9f6a39c0e717a509ed5aca0686fe73d4bf62b3200ea8&w=1060', caption: 'Pictures of roosters are the best', userId: 1  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/modern-futuristic-sci-fi-background_35913-2150.jpg?t=st=1648132808~exp=1648133408~hmac=4b00b6dad050aaec9e736fb596243dd555b7382f09804f37b661b2eeee36ae7c&w=1800', caption: 'Nice view of some tunnel', userId: 7  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/empty-dark-room-modern-futuristic-sci-fi-background-3d-illustration_35913-2291.jpg?t=st=1648132808~exp=1648133408~hmac=f1fe24230be3a72fc1792e5dc291d704eba1613ada6a7dba56b6320d9265414b&w=1800', caption: 'Tunnels are my favorite', userId: 7  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/empty-dark-room-modern-futuristic-sci-fi-background-3d-illustration_35913-2332.jpg?t=st=1648132808~exp=1648133408~hmac=c6a215b9a48764014c813054aa31c4223e8d095243ffca39f0940c24e4ef1ba9&w=1800', caption: 'This tunnel is nice too', userId: 7  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/river-surrounded-by-forests-cloudy-sky-thuringia-germany_181624-30863.jpg?t=st=1648132808~exp=1648133408~hmac=e899eb7899e076422381a15c1ac9e2f8004e415812f48ea71336eba770191fa8&w=1800', caption: 'Look at the scenery', userId: 10  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?t=st=1648132808~exp=1648133408~hmac=d8e8ac79c8f9c361e515c27ee0198a3b1ca06aca9c204ea53969dd9476b77f17&w=1800', caption: 'This ones a classic', userId: 10  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-photo/seljalandsfoss-waterfall-during-sunset-beautiful-waterfall-iceland_335224-596.jpg?t=st=1648132808~exp=1648133408~hmac=bbd9597fe13f5530b4002356ffb7ae73bbb6620b91bb4a220db080864be83e47&w=1800', caption: 'My one and only post', userId: 9  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_23-2148281227.jpg?t=st=1648132808~exp=1648133408~hmac=b1833753b6cd2ff3766c05e5f2ffa61b10395f22cf55eb249db98240e988c478&w=1800', caption: 'Freepik has good images', userId: 6  ,createdAt: new Date(), updatedAt: new Date()},
     {image: 'https://img.freepik.com/free-vector/set-persons-avatars-people_111701-352.jpg?w=1800', caption: 'Could be anyone', userId: 11  ,createdAt: new Date(), updatedAt: new Date()},
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
