
const { Task } = require('../models');
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
};
