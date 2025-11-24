const express = require('express');
const router = express.Router();
const Task = require('../models/models.js');

router.get('/',async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json({message:"Error fetching tasks",error:err.message})
    }
});
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const task=await Task.findById(id);
        if (!task) {
            return res.status(404).json({message:"Task not found"}); 
        }
        res.status(200).json(task)
    }catch(err){
        res.status(500).json({message:"Error fetching tasks",error:err.message})
    }
});

router.post("/",async(req,res)=>{
    const task=new Task({
        title:req.body.title,
        isComplete:req.body.isComplete || false
    })
    try{
        const newTask=await task.save()
        res.status(201).json(newTask)

    }catch(err){
        res.status(400).json({message:"Error creating tasks",error:err.message});
    }
})

router.put("/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const updateTask=await Task.findByIdAndUpdate(id,
            {
                title:req.body.title,
                isComplete:req.body.isComplete
            },
            { new: true, runValidators: true }
        )
        if(!updateTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json(updateTask)
    }catch(err){
        res.status(500).json({message:"Error updating tasks",error:err.message})
    }

})

router.delete("/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const deleteTask= await Task.findByIdAndDelete(id)
        if(!deleteTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({message: "deleted successfully"})

    }catch(err){
        res.status(500).json({message:"Error deleting tasks",error:err.message})
    }
})

module.exports = router;
