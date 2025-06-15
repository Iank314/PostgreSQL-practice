// src/controllers/reportController.js
const db = require('../models/db');

// A: Task counts by status for a user
exports.tasksByStatus = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { rows } = await db.query(
      `SELECT t.status, COUNT(*) AS count
       FROM tasks t
       JOIN projects p ON t.project_id = p.id
       WHERE p.owner_user_id = $1
       GROUP BY t.status`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// B: Top 5 projects with most overdue tasks
exports.topOverdueProjects = async (_, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT p.id, p.name, COUNT(*) AS overdue_count
       FROM tasks t
       JOIN projects p ON t.project_id = p.id
       WHERE t.due_date < CURRENT_DATE AND t.status <> 'done'
       GROUP BY p.id, p.name
       ORDER BY overdue_count DESC
       LIMIT 5`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// C: Average days in progress → done, per project
exports.avgProgressTime = async (_, res, next) => {
  try {
    const { rows } = await db.query(
      `WITH spans AS (
         SELECT
           id,
           project_id,
           EXTRACT(EPOCH FROM (done_at - in_progress_at))/86400 AS days_in_progress
         FROM tasks
         WHERE in_progress_at IS NOT NULL AND done_at IS NOT NULL
       )
       SELECT
         p.id,
         p.name,
         ROUND(AVG(spans.days_in_progress)::numeric,2) AS avg_days_in_progress
       FROM spans
       JOIN projects p ON spans.project_id = p.id
       GROUP BY p.id, p.name`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
