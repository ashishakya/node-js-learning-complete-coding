// External Module
const express = require("express");
const todoItemRouter = express.Router();

// Local Module
const todoItemController = require("../controllers/todoItemController");

todoItemRouter.post("/", todoItemController.createTodoItem);
todoItemRouter.get("/", todoItemController.fetchAllTodoItems);
todoItemRouter.delete("/:id", todoItemController.deleteTodoItems);
todoItemRouter.post("/:id/mark-as-completed", todoItemController.markAsCompleted);

module.exports = todoItemRouter;
