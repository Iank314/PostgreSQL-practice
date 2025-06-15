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

-- a simple enum for status
CREATE TYPE task_status AS ENUM ('todo','in_progress','done');

-- tasks & history for status timestamps
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
  -- optional extra columns for a simple status-time solution
  in_progress_at TIMESTAMPTZ,
  done_at        TIMESTAMPTZ
);

-- Indexes for your “list by priority→due_date” and overdue lookups
CREATE INDEX idx_tasks_proj_prio_due
  ON tasks(project_id, priority DESC, due_date);

CREATE INDEX idx_tasks_overdue
  ON tasks(due_date) WHERE status <> 'done';

-- If you wanted a full history instead:
-- CREATE TABLE task_status_history (
--   task_id   INTEGER    REFERENCES tasks(id),
--   status    task_status NOT NULL,
--   logged_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
