import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

// Setup the body parser
app.use(bodyParser.json());
app.use(cors());
// Data store (in memory)
const todoList = [];

app.get("/api/todo", function(req, res) {
  res.status(200);
  res.json(todoList.getList());
});

app.post("/api/todo/:todoItem", function(req, res) {
  try {
    todoList.add(req.params.todoItem);
    res.status(201);
    res.end();
  } catch (err) {
    res.status(400);
    res.end();
  }
});

app.delete("/api/todo/:todoItem", function(req, res) {
  try {
    todoList.delete(req.params.todoItem);
    res.status(204);
    res.end();
  } catch (err) {
    res.status(404);
    res.end();
  }
});

export default app;
