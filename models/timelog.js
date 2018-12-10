module.exports = (sequelize, DataTypes) => {
  const TimeLog = sequelize.define('TimeLog', {
    timeInHour: DataTypes.DECIMAL,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
