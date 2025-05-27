# 📦 Project Title

A Scelloo simple task app for add a based for a given and track the progress of the task.

---

## 🚀 Tech Stack

- Node.js  
- Express  
- PostgreSQL (via Sequelize ORM)  
- Render (Hosting)  
- Dotenv (for environment variables)  

---

## ⚙️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/Iupac120/scelloo.git

##  npm dependencies
npm install

##  configure environment variables
DB_NAME=######
DB_USERNAME=####
DB_PASSWORD=#####
DB_DIALECT=postgres
DB_HOST= #######
DB_PORT= 5432
JWT_SECRET=#####
JWT_EXPIRES_IN=#####


##  Run application
npm start

## Verify connection logs
Connection to database successful
Database synced successfully
Server running on port 3000

## Base URL
http://localhost:3000/api

## API Documentation Base URL
http://localhost:3000/api-docs

## API Endpoints
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/{id}
DELETE /api/v1/tasks/{id}
GET /api/v1/report-time
GET /api/v1/report

## Contact 
oforokpara@gmail.com
