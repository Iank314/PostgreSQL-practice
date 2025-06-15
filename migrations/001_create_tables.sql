-- users and projects
CREATE TABLE users (
  id   SERIAL PRIMARY KEY,
  name TEXT    NOT NULL,
  email TEXT   UNIQUE NOT NULL
);

CREATE TABLE projects (
  id             SERIAL PRIMARY KEY,
  name           TEXT          NOT NULL,
  owner_user_id  INTEGER       NOT NULL
    REFERENCES users(id)
);

CREATE TYPE task_status AS ENUM ('todo','in_progress','done');

CREATE TABLE tasks (
  id          SERIAL         PRIMARY KEY,
  project_id  INTEGER         NOT NULL
    REFERENCES projects(id),
  title       TEXT            NOT NULL,
  description TEXT,
  status      task_status     NOT NULL DEFAULT 'todo',
  priority    INTEGER         NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
  due_date    DATE,
  metadata    JSONB,
  in_progress_at TIMESTAMPTZ,
  done_at        TIMESTAMPTZ
);

CREATE INDEX idx_tasks_proj_prio_due
  ON tasks(project_id, priority DESC, due_date);

CREATE INDEX idx_tasks_overdue
  ON tasks(due_date) WHERE status <> 'done';
-- );
