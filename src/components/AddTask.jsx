import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask({ title: '', description: '' });
      setMessage('Task added!');
      fetchTasks();
    } catch (err) {
      setMessage('Failed to add task');
    }
  };

  return (
    <div style={{ borderLeft: '6px solid #007bff', padding: '20px', borderRadius: '10px', background: '#fff', backgroundColor : '#f4f4f4'}}>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
        <button type="submit">Add Task</button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.startsWith('') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default AddTask;
