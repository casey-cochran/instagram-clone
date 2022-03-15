'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    messages: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here
    Conversation.belongsTo(models.User, {foreignKey: 'senderId'})
    Conversation.belongsTo(models.User, {foreignKey: 'receiverId'})
  };
  return Conversation;
};
