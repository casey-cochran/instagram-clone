'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, {
      foreignKey: 'followerId', as: 'followers'
    })
    Follow.belongsTo(models.User, {
      foreignKey: 'followedId', as: 'followed'
    })

  };
  return Follow;
};
