const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    task:{
        type:String
    },
    UserId:{
        type:String,
        default:"123",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const taskModel= mongoose.model("task",taskSchema);
module.exports= taskModel;
