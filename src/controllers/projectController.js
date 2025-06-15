const db = require('../models/db');

exports.getProjects = async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT p.id, p.name, p.owner_user_id AS ownerId, u.name AS ownerName
       FROM projects p
       JOIN users u ON u.id = p.owner_user_id
       ORDER BY p.id`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT id, name, owner_user_id AS ownerId
       FROM projects WHERE id = $1`,
      [req.params.projectId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { name, owner_user_id } = req.body;
    const { rows } = await db.query(
      `INSERT INTO projects (name, owner_user_id)
       VALUES ($1, $2)
       RETURNING id, name, owner_user_id AS ownerId`,
      [name, owner_user_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { name, owner_user_id } = req.body;
    const { rows } = await db.query(
      `UPDATE projects
       SET name = $1, owner_user_id = $2
       WHERE id = $3
       RETURNING id, name, owner_user_id AS ownerId`,
      [name, owner_user_id, req.params.projectId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { rowCount } = await db.query(
      `DELETE FROM projects WHERE id = $1`,
      [req.params.projectId]
    );
    if (!rowCount) return res.status(404).json({ error: 'Project not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
