import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', status: 'In Progress' });

  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => {
        console.error("Error loading task: ", error);
        navigate('/');
      });
  }, [id, navigate]);

  const handleSave = () => {
    axios.put(`http://localhost:3000/tasks/${id}`, task)
      .then(() => navigate('/'))
      .catch(error => console.error("Error saving task: ", error));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://localhost:3000/tasks/${id}`)
        .then(() => navigate('/'))
        .catch(error => console.error("Error deleting task: ", error));
    }
  };

  const toggleStatus = () => {
    setTask(prevTask => ({
      ...prevTask,
      status: prevTask.status === 'In Progress' ? 'Done' : 'In Progress',
    }));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={toggleStatus}>
          {task.status}
        </button>
        <button type="button" onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditTask;
