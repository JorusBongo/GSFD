import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error loading tasks: ", error));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <div>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task">
              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
              <Link to={`/edit-task/${task.id}`} className="button">Edit</Link>
            </div>
          ))
        )}
      </div>
      <Link to="/add-task" className="button">Add Task</Link>
    </div>
  );
}

export default Home;
