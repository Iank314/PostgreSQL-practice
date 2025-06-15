const router = require('express').Router();
const pc     = require('../controllers/projectController');

router
  .get('/projects', pc.getProjects)
  .get('/projects/:projectId', pc.getProjectById)
  .post('/projects', pc.createProject)
  .put('/projects/:projectId', pc.updateProject)
  .delete('/projects/:projectId', pc.deleteProject);

module.exports = router;
