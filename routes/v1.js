const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');

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

router.get('/users', UserController.getAll);
router.post('/users', UserController.create);

module.exports = router;
