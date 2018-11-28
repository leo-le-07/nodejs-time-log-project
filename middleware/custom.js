
const { Task, TimeLog } = require('../models');
const { to, responseError } = require('../services/util.service');

module.exports = {
  async task(req, res, next) {
    const { taskId } = req.params;
    const [error, task] = await to(Task.findOne({ where: { id: taskId } }));

    if (error) return responseError(res, 'Error when finding task');

    if (!task) return responseError(res, "Can't find task with id");

    req.task = task;
    return next();
  },
  async timeLog(req, res, next) {
    const { timeLogId } = req.params;
    const [error, timeLog] = await to(TimeLog.findOne({ where: { id: timeLogId } }));

    if (error) return responseError(res, 'Error when finding time log');

    if (!timeLog) return responseError(res, "Can't find time log with id");

    req.timeLog = timeLog;
    return next();
  },
};
