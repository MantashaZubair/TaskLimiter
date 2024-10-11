const taskModel = require("../model/task")

class taskServices{
    
    createTask=async(body)=>{
       try {  
          const createtask=new taskModel(body)
          const task= await createtask.save()
          return task
       } catch (error) {
        throw error
       }
    }
    
   processQueuedTasks = async(userIp,taskQueue) => {
      if (!taskQueue[userIp] || taskQueue[userIp].length === 0) return;
  
      // Process tasks one by one
      const task = taskQueue[userIp].shift(); // Dequeue task
      console.log(`Processing queued task for user ${userIp}: ${task}`);
     const createTask=await this.createTask({task})
     console.log("middleware",createTask)
      // Here you would do actual task processing (e.g., save to database, etc.)
      // Simulate task processing delay (1 second per task)
      setTimeout(() => this.processQueuedTasks(userIp,taskQueue), 1000); // Process the next task after 1 second
  };

    getTask=async()=>{
      try {
        const gettask= await taskModel.find()
        return gettask
      } catch (error) {
        throw error
      }
    }
}
module.exports=taskServices