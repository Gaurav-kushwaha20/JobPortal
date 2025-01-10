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




const app = express()
const port = 5000

// use middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// use routes
app.use(UserRoute)

// serve static file
app.use('/profile', express.static(path.join(__dirname, 'public/profile')));







app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})