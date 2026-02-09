const express = require("express")
require('dotenv').config()
const connectDB = require('./config/db')
const studentRoute = require('./routes/studentRoute')

const app = express()

app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.status(200).json({message: "Server is up & running"})
})

app.use('/api/student', studentRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port : ${process.env.PORT}`)
})


