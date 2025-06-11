import React, { useState } from 'react';
import { FaTrash, FaCheckCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    if (editedTitle.trim() === '') return;
    onEdit(todo._id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div className={`flex justify-between items-center p-3 my-2 rounded shadow ${todo.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex-1">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="px-2 py-1 border rounded w-full"
            />
            <FaSave className="text-green-500 cursor-pointer" onClick={handleSave} />
            <FaTimes className="text-red-500 cursor-pointer" onClick={() => setIsEditing(false)} />
          </div>
        ) : (
          <span className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-500 cursor-pointer" onClick={() => onToggle(todo)} />
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(true)} />
          <FaTrash className="text-red-500 cursor-pointer" onClick={() => onDelete(todo._id)} />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
