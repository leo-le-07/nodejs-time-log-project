const { TimeLog } = require('../models');
const { to, responseError, responseSuccess } = require('../services/util.service');

module.exports = {
  async getAll(req, res) {
    const [error, timeLogs] = await to(TimeLog.findAll());

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { timeLogs });
  },
  async create(req, res) {
    const {
      timeInHour, userId, projectId,
    } = req.body;
    const [error, user] = await to(TimeLog.create({
      timeInHour, userId, projectId,
    }));

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { id: user.id }, 201);
  },
  async get(req, res) {
    const { timeLog } = req;

    return responseSuccess(res, { timeLog });
  },
  async delete(req, res) {
    const { timeLog } = req;

    const [error, _] = await to(timeLog.destroy()); // eslint-disable-line no-unused-vars
    if (error) return responseError(res, 'Error occured trying to delete time log');

    return responseSuccess(res, { message: 'Deleted task' }, 204);
  },
  async update(req, res) {
    const { timeLog } = req;
    const data = req.body;
    timeLog.set(data);

    const [error, updatedTimeLog] = await to(timeLog.save());

    if (error) return responseError(res, error);

    return responseSuccess(res, { timeLog: updatedTimeLog });
  },
};