'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, bio, image } = this; // context will be the User instance
      return { id, username, email, bio, image };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {foreignKey: 'userId'})
      User.hasMany(models.Conversation, {
        foreignKey: 'senderId'})
      User.hasMany(models.Conversation, {
        foreignKey: 'receiverId'})
      User.belongsToMany(models.User, {
        through: 'Follow',
        otherKey: 'followedId',
        foreignKey: 'followerId',
        as: 'followers'
      })
      User.belongsToMany(models.User, {
        through: 'Follow',
        otherKey: 'followerId',
        foreignKey: 'followedId',
        as: 'followed'
      })
      User.hasMany(models.Follow, {foreignKey: 'followerId'})
      User.hasMany(models.Follow, {foreignKey: 'followedId'})
      // User.belongsTo(models.Feed, {foreignKey: 'userId'})
      User.hasMany(models.Like, {foreignKey: 'userId'})
      User.hasMany(models.Dislike, {foreignKey: 'userId'})
      User.hasMany(models.Comment, {foreignKey: 'userId'})
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
