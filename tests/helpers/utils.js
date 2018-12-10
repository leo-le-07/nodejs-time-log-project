const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const models = require('../../models');

const { Project, User, Task } = models;

const projects = [
  { name: 'Travaria' },
  { name: 'Webster' },
];
const users = [
  { name: 'NL/AB', password: '123', role: 'normal' },
  { name: 'TL/TD', password: '123', role: 'normal' }
]

const _generateProjects = () => {
  return Promise.map(projects, async (project) => {
    return Project.findOrCreate({ where: { name: project.name }}).get(0);
  });
}

const _generateUsers = () => {
  return Promise.map(users, async (user) => {
    return User.findOrCreate({ where: {
      name: user.name,
      password: user.password,
      role: user.role
    }}).get(0);
  });
};

const _getOneRandomProject = async () => {
  await _generateProjects();
  return Project.findOne({ order: [Sequelize.fn('RAND')] });
};

const _getOneRandomUser = async () => {
  await _generateUsers();
  return User.findOne({ order: [Sequelize.fn('RAND')] });
};

module.exports = {
  cleanDatabase: () => (
    Promise.all(
      Object.keys(models).map((key) => {
        if (['sequelize', 'Sequelize'].includes(key)) return null;
        return models[key].destroy({ where: {}, force: true });
      }),
    )
  ),
  generateProjects: () => (_generateProjects()),
  getOneRandomProject: () => (_getOneRandomProject()),
  getOneRandomUser: () => (_getOneRandomUser()),
  generateUsers: () => (_generateUsers()),
  generateTasks: async () => {
    const project = await _getOneRandomProject();
    const user = await _getOneRandomUser();

    Task.create({
      name: 'Test task', point: 2.5, userId: user.id, projectId: project.id
    });
  },
  withLogin: async (req, user = {name: 'Random-User', password: '123'}) => {
    const newUser = await User.findOrCreate({ where: { name: user.name, password: user.password } });
    const authToken = jwt.sign({ user: newUser }, 'your_jwt_sescret');
    return req.set('Authorization', `Bearer ${authToken}`);
  },
};
