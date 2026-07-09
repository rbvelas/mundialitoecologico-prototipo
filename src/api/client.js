import axios from 'axios';

// Cuando exista la API real de Node.js/Express, solo hay que cambiar esta
// variable de entorno (VITE_API_URL)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({ baseURL });

export default api;
