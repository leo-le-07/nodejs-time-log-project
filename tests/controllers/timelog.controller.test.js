const request = require('supertest-as-promised');
const server = require('../../app');
const models = require('../../models');

const { TimeLog } = models;

const testHelpers = require('../helpers/utils');

describe('Tasks', () => {
  describe('/GET timelogs', () => {
    beforeEach(async () => {
      await testHelpers.generateTasks();
    });

    it('should get all time logs', async () => {
      const res = await request(server).get('/v1/tasks');
      expect(res.status).toBe(200);
      expect(res.body.tasks.length).toEqual(1);
      expect(res.body.tasks[0].name).toEqual('Test task');
    });
  });

  describe('/POST timelogs', () => {
    let project;
    let user;

    beforeEach(async () => {
      project = await testHelpers.getOneRandomProject();
      user = await testHelpers.getOneRandomUser();
    });

    afterEach(() => {
      project = undefined;
      user = undefined;
    });

    it('should not create new time log when missing user', async () => {
      const body = {
        timeInHour: 5,
        projectId: project.id
      };
      const res = await request(server).post('/v1/timelogs').send(body);
      expect(res.status).toBe(422);
      expect(res.body).toEqual({
        success: false,
        error: 'notNull Violation: TimeLog.userId cannot be null'
      })
    });

    it('should not create new time log when missing project', async () => {
      const body = {
        timeInHour: 5,
        userId: user.id
      };
      const res = await request(server).post('/v1/timelogs').send(body);
      expect(res.status).toBe(422);
      expect(res.body).toEqual({
        success: false,
        error: 'notNull Violation: TimeLog.projectId cannot be null'
      })
    });

    it('should create new time log successfuly', async () => {
      const body = {
        timeInHour: 5,
        userId: user.id,
        projectId: project.id
      };
      const res = await request(server).post('/v1/timelogs').send(body);
      expect(res.status).toBe(201);
    });
  });

  describe('/GET timelogs/:id', () => {
    it('should get time log with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const timelog = await TimeLog.create({
        timeInHour: 3, userId: user.id, projectId: project.id
      })
      const res = await request(server).get(`/v1/timelogs/${timelog.id}`);
      expect(res.status).toBe(200);
      expect(res.body.timeLog).toHaveProperty('timeInHour', "3.0");
      expect(res.body.timeLog).toHaveProperty('userId', user.id);
      expect(res.body.timeLog).toHaveProperty('projectId', project.id);
    });
  });

  describe('/DELETE timelogs/:id', () => {
    it('should delete time log with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const timelog = await TimeLog.create({
        timeInHour: 3, userId: user.id, projectId: project.id
      })
      const res = await request(server).delete(`/v1/timelogs/${timelog.id}`);
      expect(res.status).toBe(204);
    });
  });

  describe('/PUT timelogs/:id', () => {
    it('should update time log with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const timelog = await TimeLog.create({
        timeInHour: 3, userId: user.id, projectId: project.id
      })
      const body = {
        timeInHour: 3.5
      }
      const res = await request(server).put(`/v1/timelogs/${timelog.id}`).send(body);
      expect(res.status).toBe(200);
      expect(res.body.timeLog).toHaveProperty('timeInHour', 3.5);
    });
  });
});
