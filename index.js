const express=require("express")
const connectDB=require("./config/db")
const dotenv= require("dotenv")
const task= require("./routes/task")
const app= express();
dotenv.config()
connectDB()
const port=process.env.PORT||8080
app.use(express.json())

app.use("/api/v1/task",task)
app.listen(port,()=>{
    console.log(`server run at port ${port}`)
})

