const isEmpty = require('lodash/isEmpty');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
    });
    User.hasMany(models.TimeLog, {
      foreignKey: 'userId',
      as: 'timeLogs',
    });
  };

  User.beforeSave(async (user, options) => {
    if (isEmpty(user.role)) {
      user.role = 'normal';
    }
  });

  return User;
};
