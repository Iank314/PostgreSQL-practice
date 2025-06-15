const db = require('../models/db');

exports.getUsers = async (req, res, next) => {
  try {
    const { rows } = await db.query(`SELECT id, name, email FROM users ORDER BY id`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [req.params.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { rows } = await db.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email`,
      [name, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { rows } = await db.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email`,
      [name, email, req.params.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { rowCount } = await db.query(
      `DELETE FROM users WHERE id = $1`,
      [req.params.userId]
    );
    if (!rowCount) return res.status(404).json({ error: 'User not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
