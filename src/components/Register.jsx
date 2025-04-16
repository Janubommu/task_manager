import React, { useState } from 'react';
import { registerUser } from '../services/auth';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await registerUser(form);
      setMessage(' Registered successfully! You can now login.');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        onRegister();
      }, 1500);
    } catch (err) {
      setMessage(' ' + (err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type='email' placeholder="Email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password"  onChange={handleChange} required />
      <button type="submit">Register</button>
      {message && <p style={{ color: message.startsWith('') ? 'green' : 'red' }}>{message}</p>}
    </form>
  );
};

export default Register;
