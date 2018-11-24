const { User } = require('../models');
const { to, responseError, responseSuccess } = require('../services/util.service');

module.exports = {
  async create(req, res) {
    const { name, password } = req.body;
    const [error, user] = await to(User.create({ name, password }));

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { id: user.id }, 201);
  },
  async getAll(req, res) {
    const [error, users] = await to(User.findAll());

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { users });
  },
};
