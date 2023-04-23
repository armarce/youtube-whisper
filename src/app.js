const express =  require('express');
const app = express();
const path = require('path');
const errorHandler = require('./middlewares/error.middleware.js');

app.use(express.static(path.join(__dirname, '..', 'temp')));

app.use(express.json());

app.use('/v1', require('./routes/transcript.route.js'));

app.use(errorHandler);

module.exports = app;