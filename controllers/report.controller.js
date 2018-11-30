const { responseError, responseSuccess } = require('../services/util.service');
const reportService = require('../services/report.service');

module.exports = {
  async getTasks(req, res) {
    const { projectId, reportedDate } = req.body;
    const [error, tasks] = await reportService.getTasks(projectId, reportedDate);

    if (error) return responseError(res, error, 422);

    return responseSuccess(res, { tasks });
  },
};
