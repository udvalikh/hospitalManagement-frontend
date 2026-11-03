import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API // Make sure you set this in .env file
});

const authService = {
  // Login with username and password
  login: ({ username, password }) => {
    return http.post('/login', { username, password });
  },

  
  // Register a new user with username and password
  register: ({ username, password }) => {
    return http.post('/register', { username, password });
  },

  // Optionally, add logout or other auth methods
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;


