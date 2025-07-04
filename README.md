# Mern_Auth

A full-stack MERN (MongoDB, Express.js, React, Node.js) authentication application providing user registration, login, and secure authentication using JSON Web Tokens (JWT). This project serves as a boilerplate for building secure web applications with user authentication features.

## Table of Contents

- Features
- Technologies
- Installation
- Environment Variables
- Running the Application
- Project Structure
- Dependencies
- Contributing
- License

## Features

- User registration with email and password
- User login with JWT-based authentication
- Password hashing using bcrypt
- RESTful APIs for authentication
- MongoDB for secure data storage
- React frontend with responsive UI
- Basic error handling and form validation

## Technologies

- **Frontend**: React, Axios (for API calls)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Environment Management**: dotenv
- **Others**: Concurrently (for running client and server simultaneously)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/darshit15-02/Mern_Auth.git
   cd Mern_Auth
   ```

2. **Install Backend Dependencies**Navigate to the root directory and install server-side dependencies:

   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**Navigate to the `client` directory and install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. **Prerequisites**

   - Node.js and npm installed (download from nodejs.org)
   - MongoDB installed locally or a MongoDB Atlas URI
   - A code editor like VS Code

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

- `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost/mern_auth` or MongoDB Atlas URI)
- `JWT_SECRET`: A secret key for signing JWT tokens
- `PORT`: Port for the backend server (default: 5000)

For the frontend, create a `.env.local` file in the `client` directory if needed for API endpoints:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. **Run Both Client and Server**From the root directory, use `concurrently` to run both the backend and frontend:

   ```bash
   npm run dev
   ```

   - Backend runs on `http://localhost:5000`
   - Frontend runs on `http://localhost:3000`

2. **Run Backend Only**

   ```bash
   npm run server
   ```

3. **Run Frontend Only**

   ```bash
   cd client
   npm start
   ```

## Project Structure

```
Mern_Auth/
├── client/                  # React frontend
│   ├── public/              # Public assets
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (e.g., Login, Register)
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # API logic
│   ├── routes/              # API routes
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # Custom middleware (e.g., auth)
│   └── server.js            # Express server setup
├── .env                     # Environment variables
├── package.json             # Project metadata and scripts
└── README.md                # This file
```

## Dependencies

### Backend Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling
- `jsonwebtoken`: JWT for authentication
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management
- `concurrently`: Run multiple scripts simultaneously
- `nodemon`: Auto-restart server during development

### Frontend Dependencies

- `react`: JavaScript library for UI
- `react-dom`: React DOM rendering
- `react-router-dom`: Client-side routing
- `axios`: HTTP client for API calls

Install all dependencies using `npm install` in the respective directories.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License.