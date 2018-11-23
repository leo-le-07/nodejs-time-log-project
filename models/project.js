module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
  }, {});
  Project.associate = (models) => {
    Project.hasMany(models.Task, {
      foreignKey: 'projectId',
      as: 'tasks',
    });
    Project.hasMany(models.TimeLog, {
      foreignKey: 'projectId',
      as: 'timeLogs',
    });
  };
  return Project;
};
