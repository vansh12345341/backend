# Workflow Builder and Runner Backend
This Node.js application serves as the backend for a Workflow Builder and Runner system. It handles the creation, storage, and execution of workflows using MongoDB. Each workflow can consist of various tasks, such as data filtering, format conversion, and making HTTP requests.

# Features
Create Workflows: Endpoints to define and save workflows in a MongoDB database.
Retrieve Workflows: Fetch all stored workflows to be displayed on the frontend.
Execute Workflows: Run selected workflows with uploaded files and perform defined tasks.
# Technology Stack
Node.js: The runtime environment for the backend.
Express: Framework used to build the web server.
MongoDB: Database to store workflow definitions.
Mongoose: ODM (Object Document Mapping) for MongoDB.
Multer: Middleware for handling multipart/form-data, used for file uploads.
dotenv: Module to load environment variables from a .env file.
# Setup and Installation
Prerequisites
Node.js installed on your machine.
MongoDB running locally or remotely.
A .env file in the root of the project with your MongoDB URI.
Installing
Clone the repository: git clone <repository-url>
Navigate to the project directory:cd workflow-backend
Install dependencies:npm install
Set up environment variables:Create a .env file in the root of your project and specify your MongoDB URI: MONGO_DB_URI=mongodb://localhost:27017/your-database-name
Run the server: npm start
This will start the server at http://localhost:3001 by default.
# API Endpoints
1. POST /workflows - Create a new workflow.
Body: JSON object representing the workflow structure.
Response: JSON with the created workflow ID.
2. GET /getworkflows - Retrieve all workflows.
Response: Array of workflows with their IDs.
3. POST /execute - Execute a workflow with an uploaded file.
Form Data:
fileData: The file to process.
workflowId: ID of the workflow to execute.
Response: Success message or error.
# Development
Logging: The server logs important information to the console for debugging.
Error Handling: Basic error handling is implemented to catch and respond to errors effectively.
