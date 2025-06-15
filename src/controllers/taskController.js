// src/controllers/taskController.js
const db = require('../models/db');

// List all tasks for a project (already done)
exports.getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { rows } = await db.query(
      `SELECT id, title, description, status, priority, created_at, due_date
       FROM tasks
       WHERE project_id = $1
       ORDER BY priority DESC, due_date ASC`,
      [projectId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { rows } = await db.query(
      `SELECT * FROM tasks WHERE id = $1`,
      [taskId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// Create a new task in a project
exports.createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description = null, status = 'todo', priority = 1, due_date = null } = req.body;
    const { rows } = await db.query(
      `INSERT INTO tasks
         (project_id, title, description, status, priority, due_date)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [projectId, title, description, status, priority, due_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// Update a task (status, priority, title, etc.)
exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, due_date } = req.body;
    // Build a dynamic SET clause:
    const fields = [];
    const vals   = [];
    let idx = 1;
    for (const [k,v] of Object.entries({ title, description, status, priority, due_date })) {
      if (v !== undefined) {
        fields.push(`${k} = $${idx}`);
        vals.push(v);
        idx++;
      }
    }
    if (!fields.length) return res.status(400).json({ error: 'No fields to update' });

    const sql = `
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *`;
    vals.push(taskId);

    const { rows } = await db.query(sql, vals);
    if (!rows.length) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { rowCount } = await db.query(
      `DELETE FROM tasks WHERE id = $1`,
      [taskId]
    );
    if (!rowCount) return res.status(404).json({ error: 'Task not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
