import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 12000,
});

export async function apiPostUnit(data) {
  const resp = await api.post('/unit', data);
  console.log(resp);
}