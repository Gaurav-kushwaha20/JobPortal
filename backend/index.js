const express = require("express")
// install and use dontenv package to access environment variables
require("dotenv").config()
const app = express()
const port = 5000
app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})
// connecting to the database
require('./connections/connection')

// get request for home page
app.get('/', (req, res) => {
    res.send("hello world!")
})