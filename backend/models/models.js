const mongoose=require('mongoose')

const TaskSchema = mongoose.Schema({
    title:String,
    isComplete:Boolean,
})

const Task=mongoose.model('Task',TaskSchema)

module.exports=Task