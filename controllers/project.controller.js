const { Project } = require('../models');
const { to, responseError, responseSuccess } = require('../services/util.service');

module.exports = {
  async getAll(req, res) {
    const [error, tasks] = await to(Project.findAll());

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { tasks });
  },
};
