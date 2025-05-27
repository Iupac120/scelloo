require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const { swaggerUi, swaggerSpec } = require('./swagger')
const cors = require("cors")
const cron = require("node-cron")
const axios = require("axios")

const whiteList = [process.env.CLIENT_URL,"localhost"]
const corsOptions = {
    origin:function(origin,cb){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            cb(null,true)
        }else{
            new Error("Not allowed by CORS")
        }
    },
    methods:"HEAD,GET,PUT,PATCH,DELETE,POST",
    Credentials:true,
    allowHeaders:"Content-Type, Authorization"
}
//middlewares
app.use(cors(corsOptions))
app.use(morgan("tiny"))
//require("./models")

const authRoutes = require('./routes/userRoute')
const taskRoutes = require('./routes/taskRoute')
const errorHandler = require('./middlewares/errorMiddleware')

app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1', taskRoutes)

//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//schedule runtime
cron.schedule('*/30 * * * *', async ()=> {
  try {
    const response = await axios.get(process.env.CLIENT_URL)
    console.log("update successful", response.status)
  } catch (error) {
    console.error("failed to update tasks", error.message)
  }
})
// Error Handler
app.use(errorHandler)

module.exports = app