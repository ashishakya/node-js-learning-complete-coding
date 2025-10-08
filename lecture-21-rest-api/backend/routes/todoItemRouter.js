// External Module
const express = require("express");
const todoItemRouter = express.Router();

// Local Module
const todoItemController = require("../controllers/todoItemController");

todoItemRouter.get("/", todoItemController.createTodoItem);

module.exports = todoItemRouter;
