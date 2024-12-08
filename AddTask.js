import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      axios.post('http://localhost:3000/tasks', { title, description, status: 'In Progress' })
        .then(() => navigate('/'))
        .catch(error => console.error("Error adding task: ", error));
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div>
      <h1>Add a Task</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTask;
