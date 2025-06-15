// src/routes/reportRoutes.js
const router = require('express').Router();
const rc     = require('../controllers/reportController');

router
  .get('/reports/status/:userId',       rc.tasksByStatus)
  .get('/reports/overdue-projects',     rc.topOverdueProjects)
  .get('/reports/avg-progress-time',    rc.avgProgressTime);

module.exports = router;
