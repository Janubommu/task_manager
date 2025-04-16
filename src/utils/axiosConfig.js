import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or your deployed backend URL
});

// Add token to headers automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
