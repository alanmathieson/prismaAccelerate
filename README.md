Prisma Accelerate Testing

This repository is designed for testing Prisma Accelerate with a Node.js Express API. It provides an isolated environment to verify database interactions, caching behavior, and API responses using Supertest and Jest.

🚀 Features
	•	Connects to a Prisma Accelerate database.
	•	Provides API endpoints for managing projects and process maps.
	•	Uses Jest and Supertest for automated API testing.
	•	Supports CRUD operations for projects and process maps.

🛠️ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/your-username/prismaAccelerate.git
cd prismaAccelerate

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add the database connection:

DATABASE_URL="your_prisma_accelerate_database_url"

If using Prisma Accelerate, ensure the URL follows:

postgresql://your-database-url

4️⃣ Generate Prisma Client

npx prisma generate

5️⃣ Run the Server

node server.js

The API will run on http://localhost:3001.

📡 API Endpoints

Method	Endpoint	Description
GET	/projects	Fetch all projects
GET	/projects/:id	Fetch a specific project by ID
POST	/projects	Create a new project
PATCH	/projects/:id	Update a project
DELETE	/projects/:id	Delete a project

🧪 Running Tests

To run the test suite:

npm test

Tests are located in the /tests folder and use Jest + Supertest.

Current Tests

✅ GET /projects - Fetches all projects