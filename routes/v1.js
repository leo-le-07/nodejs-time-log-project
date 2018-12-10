const express = require('express');

const router = express.Router();
const passport = require('passport');
require('../passport');

const customMiddleware = require('../middleware/custom');

const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');
const TimeLogController = require('../controllers/timelog.controller');
const ProjectController = require('../controllers/project.controller');
const ReportController = require('../controllers/report.controller');
const AuthController = require('../controllers/auth.controller');

router.get('/api', (req, res, next) => {
  res.json(
    {
      status: 'success',
      message: 'Parcel Pending API',
      data:
        { version_number: 'v1.0.0' },
    },
  );
  return next();
});

/* eslint-disable */
router.post(  '/login', AuthController.authenticate);

router.get(   '/users', passport.authenticate('jwt', { session: false }), UserController.getAll);
router.post(  '/users', passport.authenticate('jwt', { session: false }), UserController.create);

router.get(   '/tasks', TaskController.getAll);
router.post(  '/tasks', TaskController.create);
router.get(   '/tasks/:taskId', customMiddleware.task, TaskController.get);
router.delete('/tasks/:taskId', customMiddleware.task, TaskController.delete);
router.put(   '/tasks/:taskId', customMiddleware.task, TaskController.update);

router.get(   '/timeLogs', TimeLogController.getAll);
router.post(  '/timeLogs', TimeLogController.create);
router.get(   '/timeLogs/:timeLogId', customMiddleware.timeLog, TimeLogController.get);
router.delete('/timeLogs/:timeLogId', customMiddleware.timeLog, TimeLogController.delete);
router.put(   '/timeLogs/:timeLogId', customMiddleware.timeLog, TimeLogController.update);

router.get(   '/projects', ProjectController.getAll);

router.post(  '/reports/tasks', ReportController.getTasks);
/* eslint-enable */

module.exports = router;
