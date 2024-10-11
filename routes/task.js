const express= require("express")
const router= express.Router()
const {getTask,task }= require("../controller/task")
const {perMinutelimiter, perSecondlimiter} = require("../middleware/limitingMiddleware")
 router.post("/",perSecondlimiter ,perMinutelimiter,task)
 router.get("/",getTask)

module.exports=router