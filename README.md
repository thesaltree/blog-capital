# Personal Blog Platform

## Table of Contents
1. [Introduction](#Introduction)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Application Components](#application-components)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Database](#database)
6. [Authentication](#authentication)
7. [Development](#development)
8. [Testing](#testing)
9. [Continuous Integration](#continuous-integration)
10. [Troubleshooting](#troubleshooting)

## Introduction
This project is a monorepo containing a full-stack blog application with a Next.js frontend, Express.js backend, and MySQL database. It demonstrates various rendering techniques and includes basic user authentication.

## Project Structure
The project follows a monorepo structure:

```
attack-capital-assignment/
├── applications/
│   ├── frontend/    # Next.js TypeScript frontend
│   ├── backend/     # Express.js backend
│   └── db/          # MySQL database scripts
├── infrastructure/
│   ├── k8s/         # Kubernetes configuration files (not implemented)
│   └── terraform/   # Terraform configuration files (not implemented)
|── .github/
|   └── workflows/   # GitHub Actions CI/CD workflows
└── docker-compose.yml
```

**Note:** Due to time constraints, the Kubernetes and Terraform configurations for deploying in a cloud environment are not implemented. The `docker-compose.yml` file is used to define the development environment.

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/downloads)
- [Make](https://www.gnu.org/software/make/) (usually pre-installed on macOS and Linux)

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/thesaltree/personal-blog-platform
   cd personal-blog-platform
   ```

2. Build the project:
   ```bash
   make build
   ```

3. Start the development environment:
   ```bash
   make up
   ```

4. Access the applications:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000

## Application Components

### Backend
The Express.js backend provides the following API endpoints:

- `POST /signup`: User registration
- `POST /login`: User authentication
- `GET /posts`: Retrieve all posts
- `POST /post`: Create a new post
- `GET /posts/:id`: Get details of a specific post
- `GET /posts?author=:authorId`: Get all posts by a specific author

### Frontend
The Next.js frontend includes the following pages:

- `/`: Home page (SSR) - displays all posts
- `/login`: Login page (CSR)
- `/signup`: Signup page (CSR)
- `/posts/:id`: Post details page (ISR)
- `/posts/dashboard`: User dashboard (CSR) - create posts and view own posts
- `/authors/:id`: Author posts (CSR) - filtered posts by author

### Database
The application uses MySQL as its database. The schema is defined in `applications/db/init.sql`.

#### Schema

| Table Name | Column Name  | Data Type | Constraints                                           |
|------------|--------------|-----------|-------------------------------------------------------|
| user       | id           | INT       | PRIMARY KEY, AUTO_INCREMENT                           |
|            | name         | VARCHAR(255)       | NOT NULL                                              |
|            | email        | VARCHAR(255) | UNIQUE, NOT NULL                                      |
|            | passwordHash | VARCHAR(255) | NOT NULL                                              |
| post       | id           | INT       | PRIMARY KEY, AUTO_INCREMENT                           |
|            | title        | VARCHAR(255) | NOT NULL                                              |
|            | content      | TEXT      |                                                       |
|            | authorId     | INT       | NOT NULL, FOREIGN KEY (references user.id)            |
|            | createdAt    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                             |
|            | updatedAt    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

#### Indexes
- `PRIMARY KEY` on `id` for both `user` and `post` tables
- `UNIQUE` index on `user.email`
- Index `idx_post_authorId` on `post.authorId` for improved query performance

#### Relationships
- `post.authorId` is a foreign key that references `user.id`, establishing a one-to-many relationship between users and posts.

#### Initial Data
The `init.sql` script also includes sample data:
- 3 users are created with example email addresses and hashed passwords
- 5 posts are created and associated with three of the sample users

#### Usage
To interact with the database during development:

1. Access the database shell:
   ```bash
   make db-shell
   ```

2. Once in the MySQL shell, you can run queries, e.g.:
   ```sql
   SELECT * FROM user;
   SELECT * FROM post;
   ```


## Authentication
The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in the cookies which is secure and works with sever-side checks and sent with each request to the backend. Passwords are hashed using bcrypt before storage in the mysqldb.

## Development
Use the following commands to manage the development environment:

```bash
# Start the development environment
make up

# Stop the development environment
make down

# View logs
make logs

# Access the database shell
make db-shell

# Clean up containers and volumes
make clean
```

## Testing
Frontend tests have been written in Jest. Use the following command in the frontend directory to run tests:

```bash
npm test
```

## Continuous Integration
This project uses GitHub Actions for continuous integration. The workflow includes the following steps:

1. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

2. Run linting for both frontend and backend:
   ```bash
   npm run lint
   ```

3. Run tests for the frontend:
   ```bash
   npm test
   ```

These checks are automatically run on every push to the repository and pull request to ensure code quality and catch potential issues early.

## Troubleshooting
If you encounter any issues:

1. Ensure Docker is running and up-to-date
2. Check the logs using `make logs`
3. Try cleaning and rebuilding the environment:
   ```bash
   make clean
   make build
   make up
   ```