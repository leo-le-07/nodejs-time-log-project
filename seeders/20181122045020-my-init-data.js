'use strict';

const models = require('../models');
const User = models.User;
const Project = models.Project;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'NL/AB',
      password: '123',
      role: 'normal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'NT/TD',
      password: '123',
      role: 'normal',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Projects', [{
      name: 'webster',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'travaria',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const users = await User.findAll();
    const projects = await Project.findAll();

    await queryInterface.bulkInsert('Tasks', [
      {
        name: 'WB-1 - Access /WIP from /patient-summary',
        point: 2,
        userId: users[0].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'WB-2 - Health Care Provider column doesn\'t update upon saving an edit',
        point: 1,
        userId: users[0].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1111 - Access /WIP from /patient-summary',
        point: 5,
        userId: users[0].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1112 - Health Care Provider column doesn\'t update upon saving an edit',
        point: 3,
        userId: users[0].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'WB-3 - Access /WIP from /patient-summary',
        point: 2,
        userId: users[1].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'WB-4 - Health Care Provider column doesn\'t update upon saving an edit',
        point: 1,
        userId: users[1].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1113 - Access /WIP from /patient-summary',
        point: 5,
        userId: users[1].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1114 - Health Care Provider column doesn\'t update upon saving an edit',
        point: 3,
        userId: users[1].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('TimeLogs', [
      {
        timeInHour: 4,
        userId: users[0].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        timeInHour: 2,
        userId: users[0].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        timeInHour: 4,
        userId: users[1].id,
        projectId: projects[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        timeInHour: 6,
        userId: users[1].id,
        projectId: projects[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkDelete('Users', {}),
      queryInterface.bulkDelete('Projects', {}),
      queryInterface.bulkDelete('Tasks', {}),
      queryInterface.bulkDelete('TimeLogs', {}),
    ])
  }
};
