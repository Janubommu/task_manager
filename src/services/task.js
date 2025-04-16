import API from '../utils/axiosConfig';

export const createTask = (taskData) => API.post('/tasks', taskData);
export const getTasks = () => API.get('/tasks');
