'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = models => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks'
    });
    User.hasMany(models.TimeLog, {
      foreignKey: 'userId',
      as: 'timeLogs'
    });
  };
  return User;
};