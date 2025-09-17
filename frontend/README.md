## Candidate Management System

A full-stack web application built with **React, Node.js, Express, and SQLite** for managing candidate details.  
This project supports **CRUD operations** (Create, Read, Update, Delete) on candidate records.

## Features
- Add new candidates (name, email, phone, status, resume link)
- View list of all candidates
- Update candidate details
- Delete candidates
- Stores data in **SQLite database**
- REST API built with **Express.js**
- Frontend built with **React.js**

## Project Structure 
```
CandidateManagementProject/
|
├── backend/
│ ├── db.js
│ ├── index.js
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── index.js
│ │ ├── components/
│ │ │ ├── CandidateForm.jsx
│ │ │ ├── CandidateList.jsx
│ ├── package.json

```


## setup backend 
- cd backend
- npm install cors sqlite3 body-parser 
- npm start
Backend runs on http://localhost:5000

## setup frontend 
- cd frontend
- npm install
- npm start
Frontend runs on http://localhost:3000 

## API Endpoints

- **GET** `/api/candidates` - Get all candidates  
- **POST** `/api/candidates` - Add a new candidate  
- **PUT** `/api/candidates/:id` - Update an existing candidate by ID  
- **DELETE** `/api/candidates/:id` - Delete a candidate by ID  

## Tech Stack 
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: SQLite 

## Screenshot 
![CandidateList](<Screenshot (397).png>)