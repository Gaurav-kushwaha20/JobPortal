const mongoose = require('mongoose')
// console.log(process.env.DATABASE)

// MONGODB ATLAS CONNECTION
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("Database connected successfully.") })
    .catch((err) => { console.log("Some error occured while connecting to database: ", err) })


//MONGDB LOCAL CONNECTION
// mongoose.connect(process.env.LOCAL_DATABASE)
//     .then(() => { console.log("Database connected successfully.") })
//     .catch((err) => { console.log("Some error occured while connecting to database: ", err) }) 