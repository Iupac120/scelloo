require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const port = process.env.PORT || 5000
const cors = require("cors")

app.use(cors)
app.use(morgan("tiny"))
require("./models")

const start = async () =>{
    try {
        app.listen(port,()=>{
            console.log(`server is listening to port ${port}`)
        })
    } catch (error) {
        console.error("Starting server error", error.msg)
    }
}