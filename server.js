const express = require ("express")
const cors = require("cors")
const morgan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv")
const connectDB = require("./config/db");


dotenv.config();
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
// mongodb connection
connectDB();

const app = express()
// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);
const PORT = process.env.PORT || 8080;

// app.get("/",(req,res) => {
//     res.status(200).send({
//         message:"Node Server",
//     })
// })

// const PORT = process.env.PORT || 8080;
// listen
app.listen(PORT,()=>{
    console.log(`console running on ${process.env.DEV_MODE} port ${PORT}`)
})


