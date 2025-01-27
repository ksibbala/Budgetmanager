<<<<<<< HEAD
# Budgetmanager
Build docker images for Budgetmanager project in node js and deployed it in K8s
=======

# Budget Manager - Backend

This is the backend for the Budget Manager application, built with Node.js, Express, and MongoDB using Mongoose for data modeling. The backend API handles various features such as user authentication, transaction management, and budget tracking.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/get-started)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (optional, for visualizing the MongoDB database)

## Getting Started

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd budget-manager-backend
```

### 2. Install Dependencies

Install the required Node.js dependencies by running:

```bash
npm install
```

This will install the necessary packages, including **Express**, **Mongoose**, and other dependencies listed in `package.json`.

### 3. Run MongoDB using Docker

If you don't have MongoDB running locally, you can use Docker to set up a MongoDB container. Run the following command to pull and run the official MongoDB Docker image:

```bash
docker pull mongo
docker run -d -p 27017:27017 --name mongo-db mongo
```

This will start MongoDB on `localhost:27017`.

### 4. Configure the Environment

Create a `.env` file in the root of your project (if not already present) and add the following environment variables:

```bash
MONGO_URI=mongodb://localhost:27017/budget-manager
PORT=5000
```

- `MONGO_URI`: MongoDB connection URI, pointing to your Docker container.
- `PORT`: The port your backend will listen on (default: 5000).

### 5. Start the Backend Server

Start the backend server by running:

```bash
npm start
```

If you're using **nodemon** for automatic restarts during development, you can run:

```bash
npx nodemon server.js
```

Your backend will now be running on `http://localhost:3000`.

### 6. Verify the Connection

Ensure that your backend is connected to MongoDB. You can check the server logs for confirmation:

```bash
docker logs mongo-db
```

Additionally, you can verify by visiting your API endpoints (e.g., `http://localhost:3000/api/transactions`).

### 7. (Optional) MongoDB Visualization

If you'd like to visualize your MongoDB data, you can use **MongoDB Compass**:

1. Download MongoDB Compass from [here](https://www.mongodb.com/products/compass).
2. Open MongoDB Compass and connect to `mongodb://localhost:27017`.
3. Browse the `budget-manager` database to view your collections.

## API Endpoints

- **GET /api/transactions**: Fetch all transactions.
- **POST /api/transactions**: Add a new transaction.
- **GET /api/budgets**: Fetch all budgets.
- **POST /api/budgets**: Create a new budget.

## Stopping MongoDB Container

To stop the MongoDB container:

```bash
docker stop mongo-db
```

To start it again:

```bash
docker start mongo-db
```

## Troubleshooting

- **MongoDB connection error**: Ensure Docker is running and the MongoDB container is active.
- **Port conflict**: If another process is using port `27017`, update the port in the `.env` file and re-run the MongoDB container.

>>>>>>> 61f0d0e (Initial commit-BudgetManager)
