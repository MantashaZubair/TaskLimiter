const rateLimit=require("express-rate-limit")
const taskServices= require("../services/task")
const taskServicesInstance= new taskServices()
const taskQueue= {}// {userIp:[]}


const handlerFunction=(req,res,next)=>{
 const userId=req.body.userId;
 const task=req.body.task
 if(!taskQueue[userId]){
    taskQueue[userId]=[]
 }
taskQueue[userId].push(task);
console.log(taskQueue)
console.log(`Task queued for user ${userId}: ${task}`)
  // Start processing the queue if not already processing
  if (taskQueue[userId].length === 1) {
    taskServicesInstance.processQueuedTasks(userId,taskQueue); // Start processing the queue for this user
}

res.status(429).json({
    message: 'Rate limit exceeded. Task has been queued and will be processed later.'
  });
}

//-------------------persecondLimit--------------

const perSecondlimiter = rateLimit({
	windowMs: 1000, // How long to remember requests for, in milliseconds(1sec).
	limit: 1, // How many requests to allow.
  skipFailedRequests:true, //When set to true, failed requests won’t be counted.
  handler:handlerFunction  //Function to run after limit is reached (overrides message and statusCode settings, if set).
    // message: 'Too many requests, please try again later.'
})

//---------------perminuteLimit----------------

const perMinutelimiter = rateLimit({
	windowMs: 60*1000, // How long to remember requests for, in milliseconds(1minute)
	limit: 20, // Limit each IP to 20 requests per `window` (here, per 1minute).
   message: 'Too many requests, please try again later.',
   skipFailedRequests:true, //When set to true, failed requests won’t be counted.
   handler:handlerFunction  //Function to run after limit is reached (overrides message and statusCode settings, if set).
})


module.exports={perSecondlimiter,perMinutelimiter}

