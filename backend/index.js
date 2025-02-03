const express = require("express");
const {app, server} = require("./socketIO/server");

// install and use dotenv package to access environment variables
require("dotenv").config();

// connect to the database
require('./connections/connection');
const path = require("path");

// middleware import
const cors = require('cors');
const morgan = require('morgan');

// routes import
const UserRoute = require('./routes/UserRoutes');
const vacancyRoute = require('./routes/vancancyRoutes');

const port = 5000;


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true // 🔥 Allow frontend to send cookies/auth headers
}));

// use middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// use routes
app.use(UserRoute);
app.use('/vacancy', vacancyRoute);
// Uncomment and use the route when needed
// app.use('/employer', EmployerRoute);

// serve static files
app.use('/public/profile', express.static(path.join(__dirname, 'public/profile'), {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_DOMAIN);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
}));

// server static file for job vacancy photos
app.use('/public/vacancy', express.static(path.join(__dirname, 'public/vacancy')));

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// start the server
server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});