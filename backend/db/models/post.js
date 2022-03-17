'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 350]
      }
    },
    totalLikes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalDislikes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalComments: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {foreignKey: 'userId'})
    // Post.belongsTo(models.Feed, {foreignKey: 'postId'})
    Post.hasMany(models.Like, {foreignKey: 'postId', onDelete: 'cascade', hooks:true})
    Post.hasMany(models.Dislike, {foreignKey: 'postId', onDelete: 'cascade', hooks:true})
    Post.hasMany(models.Comment, {foreignKey: 'postId', onDelete: 'cascade', hooks:true})
  };
  return Post;
};
