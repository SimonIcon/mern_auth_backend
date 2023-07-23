const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDb = require('./config/dbConnect')
const userRouter = require("./routes/userRoute")


// creating express application
const app = express()
dotenv.config()

// app middlware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// api middleware
app.use('/', userRouter)
// creating server
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(`cannot start the serve because this error ${error}`)
})



