const Sequelize = require('sequelize');
const isEmpty = require('lodash/isEmpty');
const moment = require('moment');
const { to } = require('await-to-js');
const { Task, Project, User } = require('../models');

const { Op } = Sequelize;

const formatDate = date => moment(date, 'DD/MM/YYYY');

const createdDateQueryBuilder = date => ({
  createdAt: {
    $gt: date.toDate(),
    $lt: date.add(1, 'days').toDate(),
  },
});

const projectIdQueryBuilder = (projectId) => {
  if (!projectId || (Array.isArray(projectId) && isEmpty(projectId))) return {};
  if (Array.isArray(projectId)) {
    return {
      projectId: {
        [Op.or]: projectId,
      },
    };
  }
  return { projectId };
};

module.exports = {
  async getTasks(projectId, reportedDate) {
    let date;
    if (isEmpty(reportedDate)) {
      date = moment();
    } else {
      date = formatDate(reportedDate);
    }

    const condition = {
      ...createdDateQueryBuilder(date),
      ...projectIdQueryBuilder(projectId),
    };

    return to(Task.findAll(
      {
        where: condition,
        attributes: ['id', 'name', 'point', 'createdAt', 'updatedAt'],
        include: [{
          model: Project,
          attributes: ['id', 'name'],
        }, {
          model: User,
          attributes: ['id', 'name', 'role'],
        }],
      },
    ));
  },
};
