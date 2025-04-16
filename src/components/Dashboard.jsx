import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import axios from 'axios';
import './Dashboard.css'; 
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(' Failed to fetch tasks', err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(' Task deleted!');
      fetchTasks();
    } catch (err) {
      console.error(' Failed to delete task', err);
      alert('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <AddTask fetchTasks={fetchTasks} />
      <h2>Your Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button onClick={() => handleDelete(task._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
