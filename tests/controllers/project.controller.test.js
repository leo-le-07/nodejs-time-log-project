const request = require('supertest-as-promised');
const server = require('../../app');

const testHelpers = require('../helpers/utils');

describe('Projects', () => {
  describe('/GET projects', () => {
    beforeEach(async () => {
      await testHelpers.generateProjects();
    });

    it('should get all projects', async () => {
      const res = await request(server).get('/v1/projects');
      expect(res.status).toBe(200);
      expect(res.body.tasks.length).toEqual(2);
      expect(res.body.tasks.map(task => task.name)).toEqual(
        expect.arrayContaining(['Travaria', 'Webster'])
      );
    });
  });
});
