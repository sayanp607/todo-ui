import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/todoService';
import TodoItem from '../components/TodoItem';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    await createTodo({ title });
    setTitle('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo._id, { completed: !todo.completed });
    fetchTodos();
  };

  const handleEdit = async (id, updatedTitle) => {
    await updateTodo(id, { title: updatedTitle });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-8 text-white">My Todo List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center mb-8 w-full max-w-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border border-gray-300 focus:outline-none w-full sm:w-80 rounded sm:rounded-l sm:rounded-none"
          placeholder="Enter your task"
        />
        <button className="px-6 py-2 bg-green-500 text-white w-full sm:w-auto rounded mt-2 sm:mt-0 sm:rounded-r">
          Add
        </button>
      </form>

      <div className="w-full px-4 max-w-lg">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
