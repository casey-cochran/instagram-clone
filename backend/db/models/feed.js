'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feed = sequelize.define('Feed', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Feed.associate = function(models) {
    // associations can be defined here
    // Feed.hasMany(models.Post, {foreignKey: 'postId'})
    // Feed.hasMany(models.User, {foreignKey: 'userId'})
  };
  return Feed;
};
