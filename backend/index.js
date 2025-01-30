const express = require("express")
// install and use dontenv package to access environment variables
require("dotenv").config()
// connecting to the database
require('./connections/connection')
const path = require("path")
// middleware import
const cors = require('cors')
const morgan = require('morgan')

// routes import
const UserRoute = require('./routes/UserRoutes')
const EmployerRoute = require('./routes/EmployerRoutes')
const vacancyRoute = require('./routes/vancancyRoutes')


const app = express()
const port = 5000

// use middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// use routes
app.use(UserRoute)
app.use('/vacancy', vacancyRoute)
// app.use('/employer', EmployerRoute)


// serve static file
app.use('/public/profile', express.static(path.join(__dirname, 'public/profile'), {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_DOMAIN);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
}));
// server static file for job vacancy photo
app.use('/vacancy', express.static(path.join(__dirname, 'public/vacancy')))


app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})