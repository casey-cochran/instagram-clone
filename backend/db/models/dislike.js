'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dislike = sequelize.define('Dislike', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Dislike.associate = function(models) {
    // associations can be defined here
    Dislike.belongsTo(models.Post, {foreignKey: 'postId'})
    Dislike.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Dislike;
};
