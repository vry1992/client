import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 12000,
});

export async function apiGetInit() {
  const data = await api.get('/init');
  return data;
}

export async function apiPostUnit(data) {
  await api.post('/unit', data);
}