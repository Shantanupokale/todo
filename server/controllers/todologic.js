//implement the logic of routes here
import { connecttoDB } from "../utils/connect.js";
import Todo from "../models/todoModel.js";
import { createError } from "../utils/error.js";


// Get all todos  
export async function getAllTodo(req, res, next) {
  await connecttoDB();
  const Todos = await Todo.find({ userID: req.user.id });
  res.status(200).send(Todos);
}


// Get a single todo
export async function getTodo(req, res, next) {
   try {
    await connecttoDB();
    const todo = await Todo.findById(req.params.id);
    if(!todo) return next(createError(404, "Todo not found"));
    if(todo.userID.toString() !== req.user.id) return next(createError(404, "Unauthorized"));
    res.status(200).send(todo);
   } catch (error) {
    next(createError(404, "Todo not found"));
   }
}


// Add a new todo
export async function addTodo(req, res, next) {
  console.log("Request body:", req.body);

  if (!req.body.title || !req.body.description) {
    return res.status(400).json("All fields are required");
  }

  try {
    // Connect to DB
    await connecttoDB();

    // Create new todo
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      userID: req.user.id,
    });
    // Save todo
    await newTodo.save();
    return res.status(201).json(newTodo);

  } catch (error) {
    console.error("Error saving todo:", error);
    return res.status(500).json({ error: "Failed to save todo" });
  }
}



// Update a todo
export async function updateTodo(req, res, next) {
  const id = req.params.id;
  if (!id || !req.body) return next(createError(400, "Missing fields"));

  try {
    await connecttoDB();

    const todo = await Todo.findById(id);
    if (!todo) return next(createError(404, "Todo not found"));
    if (todo.userID.toString() !== req.user.id) return next(createError(403, "Unauthorized"));

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTodo) return next(createError(404, "Failed to update todo, not found"));
    res.status(200).json(updatedTodo);

  } catch (error) {
    next(createError(500, "Failed to update todo"));
  }
}



// Delete a todo
export async function deleteTodo(req, res, next) {
  try {
    
    await connecttoDB();
    const todo = await Todo.deleteOne({ _id: req.params.id });
    if (todo.deletedCount === 0) return next(createError(404, "Todo not found"));
    res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.error("Error deleting todo:", error);
    next(createError(500, "Failed to delete todo"));
    
  }
}
