import axios from 'axios';

const api = axios.create({
  /* baseURL: 'http://localhost:3333', */
  baseURL: 'https://server.panificadoraubaense.com.br',
});

export default api;
