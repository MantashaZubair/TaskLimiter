const taskServices= require("../services/task")
const taskServicesInstance= new taskServices()
const task=async(req,res)=>{
    try {
        const {task}=req.body
        const taskCreate= await taskServicesInstance.createTask({task})
        console.log("taskcreatecontroller",taskCreate)
        res.status(201).json({message:taskCreate})
     }  
     catch (error) {
       console.log(error) 
    }
}
 const getTask=async(req,res)=>{
    try {
       const gettask=await taskServicesInstance.getTask() 
       res.status(200).json({message:gettask})
    } catch (error) {
      console.log(error)  
    }
 }

module.exports= {getTask,task}