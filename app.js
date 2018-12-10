const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up express app
const app = express();
const v1 = require('./routes/v1');

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
const models = require('./models');

// Sync database
if (process.env.NODE_ENV === 'dev') {
  models.sequelize.sync().then(() => {
    console.log('Nice~ Database looks fine');
  }).catch((error) => {
    console.log(error, 'Something went wrong with the Database Update!');
  });
}

// Require our routes into the application
app.use('/v1', v1);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.!',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  server.listen(port);
}

module.exports = app;
