import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-panificadora-ubaense.herokuapp.com',
});

export default api;
