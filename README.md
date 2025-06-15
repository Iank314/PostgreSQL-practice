# Task Tracker Microservice

A simple RESTful Task Tracker service built with Node.js, Express, and PostgreSQL. This service allows you to manage users, projects, and tasks, and provides reporting endpoints for task statuses and durations.

## Overview

This microservice provides:

* Full CRUD operations for **Users**, **Projects**, and **Tasks**
* Task listing ordered by priority and due date
* Reporting endpoints:

  * Task counts by status for a specific user
  * Top 5 projects with the most overdue tasks
  * Average time tasks spend in progress before completion

All data is stored in a PostgreSQL database, with Node.js and Express handling the API layer.

---

## Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **ORM / Driver:** `pg` (node-postgres)
* **Environment Management:** `dotenv`

---

## Prerequisites

* Node.js (v14+)
* PostgreSQL (v12+)
* `psql` or pgAdmin for database management

---

## Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/PostgreSQL-practice.git
cd PostgreSQL-practice
```

### Database Migrations & Seed Data

1. **Create the database** (if not already present):

   ```bash
   createdb postgresql_practice
   ```

2. **Run migrations** to create tables:

   ```bash
   psql -h localhost -U postgres -d postgresql_practice -f migrations/001_create_tables.sql
   ```

3. **Load seed data**:

   ```bash
   psql -h localhost -U postgres -d postgresql_practice -f migrations/002_seed_data.sql
   ```

### Install Dependencies

```bash
npm install
```

---

## Running the Server

Start the Express server:

```bash
npm start
# or
node src/app.js
```

You should see:

```
Listening on port 3000
```

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Users

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/users`     | List all users          |
| GET    | `/api/users/:id` | Get a single user by ID |
| POST   | `/api/users`     | Create a new user       |
| PUT    | `/api/users/:id` | Update a user           |
| DELETE | `/api/users/:id` | Delete a user           |

### Projects

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/projects`     | List all projects          |
| GET    | `/api/projects/:id` | Get a single project by ID |
| POST   | `/api/projects`     | Create a new project       |
| PUT    | `/api/projects/:id` | Update a project           |
| DELETE | `/api/projects/:id` | Delete a project           |

### Tasks

| Method | Endpoint                         | Description                       |
| ------ | -------------------------------- | --------------------------------- |
| GET    | `/api/projects/:projectId/tasks` | List tasks for a specific project |
| GET    | `/api/tasks/:taskId`             | Get a single task by ID           |
| POST   | `/api/projects/:projectId/tasks` | Create a new task in a project    |
| PUT    | `/api/tasks/:taskId`             | Update any field(s) of a task     |
| DELETE | `/api/tasks/:taskId`             | Delete a task                     |

### Reports

| Method | Endpoint                         | Description                                         |
| ------ | -------------------------------- | --------------------------------------------------- |
| GET    | `/api/reports/status/:userId`    | Count of tasks by status for a given user           |
| GET    | `/api/reports/overdue-projects`  | Top 5 projects with the most overdue tasks          |
| GET    | `/api/reports/avg-progress-time` | Average time in days tasks spend in progress → done |

---

## Testing with curl / PowerShell

Examples using PowerShell’s `Invoke-RestMethod`:

```powershell
# Create a new task
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/projects/1/tasks" -ContentType "application/json" -Body '{"title":"New task","priority":2,"due_date":"2025-06-30"}'

# List users
Invoke-RestMethod -Uri "http://localhost:3000/api/users"

# Overdue projects report
Invoke-RestMethod -Uri "http://localhost:3000/api/reports/overdue-projects"

# Avg progress time report
Invoke-RestMethod -Uri "http://localhost:3000/api/reports/avg-progress-time"
```

Or using `curl.exe`:

```bash
curl.exe -X POST http://localhost:3000/api/projects/1/tasks -H "Content-Type: application/json" -d '{"title":"Test task","priority":1,"due_date":"2025-06-10"}'
```

---

## Future Improvements

* **Input validation** using a library like `Joi` or `express-validator`
* **Authentication/Authorization** (e.g., JWT-based)
* **Pagination** for list endpoints
* **Logging & Monitoring** (e.g., Winston, Morgan, or a dedicated APM)
* **Unit & Integration Tests** (Jest, Supertest)
* **API Documentation** with Swagger / OpenAPI

---

