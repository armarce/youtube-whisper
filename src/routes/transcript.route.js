const express = require('express');
const route = express.Router();
const tasksController = require('../controllers/tasks.controller.js');

route.get('/:task/:model/:id', tasksController.execute);

module.exports = route;