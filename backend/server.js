const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

// connected to mongodb in db.js with MONGO URI established in .env file
connectDB();

const app = express();

// parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// specify to use the url /api/goals for all routing
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// error handling in errorMiddleware
app.use(errorHandler);

// listen to the port that have been established
app.listen(port, () => console.log(`Server started on port ${port}`));
