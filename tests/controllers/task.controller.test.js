const request = require('supertest-as-promised');
const server = require('../../app');
const models = require('../../models');

const { Task } = models;

const testHelpers = require('../helpers/utils');

describe('Tasks', () => {
  describe('/GET tasks', () => {
    beforeEach(async () => {
      await testHelpers.generateTasks();
    });

    it('should get all tasks', async () => {
      const res = await request(server).get('/v1/tasks');
      expect(res.status).toBe(200);
      expect(res.body.tasks.length).toEqual(1);
      expect(res.body.tasks[0].name).toEqual('Test task');
    });
  });

  describe('/POST tasks', () => {
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

    it('should not create new task when missing user', async () => {
      const body = {
        name: 'New test task',
        point: 5,
        projectId: project.id
      };
      const res = await request(server).post('/v1/tasks').send(body);
      expect(res.status).toBe(422);
      expect(res.body).toEqual({
        success: false,
        error: 'notNull Violation: Task.userId cannot be null'
      })
    });

    it('should not create new task when missing project', async () => {
      const body = {
        name: 'New test task',
        point: 5,
        userId: user.id
      };
      const res = await request(server).post('/v1/tasks').send(body);
      expect(res.status).toBe(422);
      expect(res.body).toEqual({
        success: false,
        error: 'notNull Violation: Task.projectId cannot be null'
      })
    });

    it('should create new task successfuly', async () => {
      const body = {
        name: 'New test task',
        point: 5,
        userId: user.id,
        projectId: project.id
      };
      const res = await request(server).post('/v1/tasks').send(body);
      expect(res.status).toBe(201);
    });
  });

  describe('/GET tasks/:id', () => {
    it('should get task with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const task = await Task.create({
        name: 'New test task', point: 3, userId: user.id, projectId: project.id
      })
      const res = await request(server).get(`/v1/tasks/${task.id}`);
      expect(res.status).toBe(200);
      expect(res.body.task).toHaveProperty('name', 'New test task');
      expect(res.body.task).toHaveProperty('point', 3);
      expect(res.body.task).toHaveProperty('userId', user.id);
      expect(res.body.task).toHaveProperty('projectId', project.id);
    });
  });

  describe('/DELETE tasks/:id', () => {
    it('should delete task with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const task = await Task.create({
        name: 'New test task', point: 3, userId: user.id, projectId: project.id
      })
      const res = await request(server).delete(`/v1/tasks/${task.id}`);
      expect(res.status).toBe(204);
    });
  });

  describe('/PUT tasks/:id', () => {
    it('should update task with id', async () => {
      const project = await testHelpers.getOneRandomProject();
      const user = await testHelpers.getOneRandomUser();
      const task = await Task.create({
        name: 'New test task', point: 3, userId: user.id, projectId: project.id
      })
      const body = {
        name: 'Updated test task'
      }
      const res = await request(server).put(`/v1/tasks/${task.id}`).send(body);
      expect(res.status).toBe(200);
      expect(res.body.task).toHaveProperty('name', 'Updated test task');
    });
  });
});
