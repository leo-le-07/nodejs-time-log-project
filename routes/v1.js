const express = require('express');

const router = express.Router();

const customMiddleware = require('../middleware/custom');

const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');

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
router.get(   '/users', UserController.getAll);
router.post(  '/users', UserController.create);

router.get(   '/tasks', TaskController.getAll);
router.post(  '/tasks', TaskController.create);
router.get(   '/tasks/:taskId', customMiddleware.task, TaskController.get);
router.delete('/tasks/:taskId', customMiddleware.task, TaskController.delete);
router.put(   '/tasks/:taskId', customMiddleware.task, TaskController.update);
/* eslint-enable */

module.exports = router;
