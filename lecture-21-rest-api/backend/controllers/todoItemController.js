const TodoItem = require("../models/todoItem");

exports.createTodoItem=async  (req, res, next)=>{
    const {task, date}  = req.body;
    const todoItem = new TodoItem({task, date})
    await todoItem.save().catch(err=>res.json({err}));
    res.status(200).json({todoItem});
}

exports.fetchAllTodoItems =async (req, res, next)=>{
    const items = await TodoItem.find();
    res.json({items})
}

exports.deleteTodoItems = async (req, res, next)=>{
    const {id} = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.status(204).json({success:true})
}

exports.markAsCompleted = async (req, res, next)=>{
    const {id} =req.params
    const todoItem = await TodoItem.findById(id)
    todoItem.completed = true
    await todoItem.save()

    res.json({todoItem})
}
