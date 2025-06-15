INSERT INTO users (name,email) VALUES
  ('Alice','alice@example.com'),
  ('Bob','bob@example.com');

INSERT INTO projects (name,owner_user_id) VALUES
  ('Website Redesign', 1),
  ('Mobile App',       2);

INSERT INTO tasks (project_id,title,due_date,priority) VALUES
  (1,'Gather requirements','2025-06-20',3),
  (1,'Design mockups',    '2025-06-25',2),
  (2,'Backend API',       '2025-06-18',5),
  (2,'Frontend UI',       '2025-06-22',4);
