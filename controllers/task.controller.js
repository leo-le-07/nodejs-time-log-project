const { Task } = require('../models');
const { to, responseError, responseSuccess } = require('../services/util.service');

module.exports = {
  async getAll(req, res) {
    const [error, tasks] = await to(Task.findAll());

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { tasks });
  },
  async create(req, res) {
    const {
      name, point, userId, projectId,
    } = req.body;
    const [error, user] = await to(Task.create({
      name, point, userId, projectId,
    }));

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { id: user.id }, 201);
  },
  async get(req, res) {
    const { task } = req;

    return responseSuccess(res, { task });
  },
  async delete(req, res) {
    const { task } = req;

    const [error, _] = await to(task.destroy()); // eslint-disable-line no-unused-vars
    if (error) return responseError(res, 'Error occured trying to delete task');

    return responseSuccess(res, { message: 'Deleted task' }, 204);
  },
  async update(req, res) {
    const { task } = req;
    const data = req.body;
    task.set(data);

    const [error, updatedTask] = await to(task.save());

    if (error) return responseError(res, error);

    return responseSuccess(res, { task: updatedTask });
  },
};
