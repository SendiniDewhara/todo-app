const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

exports.createTodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    const saved = await newTodo.save();
    res.json(saved);
};

exports.updateTodo = async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
};
