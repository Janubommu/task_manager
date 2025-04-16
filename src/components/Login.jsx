import React, { useState } from 'react';
import { loginUser } from '../services/auth';

const Login = ({ onLogin, toggleToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className='btn1'>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type='email'/>
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
