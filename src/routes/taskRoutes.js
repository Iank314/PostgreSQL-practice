// src/routes/taskRoutes.js
const router = require('express').Router();
const tc     = require('../controllers/taskController');

router
  .get('/projects/:projectId/tasks', tc.getTasksByProject)
  .get('/tasks/:taskId',            tc.getTaskById)
  .post('/projects/:projectId/tasks',tc.createTask)
  .put('/tasks/:taskId',            tc.updateTask)
  .delete('/tasks/:taskId',         tc.deleteTask);

module.exports = router;
