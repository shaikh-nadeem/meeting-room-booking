// api/csrfAxios.js
import axios from 'axios';

const csrfAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default csrfAxios;
