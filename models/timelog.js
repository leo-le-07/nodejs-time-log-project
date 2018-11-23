module.exports = (sequelize, DataTypes) => {
  const TimeLog = sequelize.define('TimeLog', {
    timeInHour: DataTypes.DECIMAL,
  }, {});
  TimeLog.associate = (models) => {
    TimeLog.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    TimeLog.belongsTo(models.Project, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE',
    });
  };
  return TimeLog;
};
