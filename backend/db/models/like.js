'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.Post, {foreignKey: 'postId'})
    Like.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Like;
};
