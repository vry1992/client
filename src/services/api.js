import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 12000,
});

const normalizeInitResponse = (data) => {
  const unitNames = Object.fromEntries(data.map(({ unit_id: unitId, unit_name: unitName }) => ([ unitId, unitName ])));
  return { unitNames };
}

export async function apiGetInit() {
  const { data } = await api.get('/init');
  return normalizeInitResponse(data);
}

export async function apiPostUnit(body) {
  const { data } = await api.post('/unit', body);
  return normalizeInitResponse(data);
}

export async function apiPostShip(body) {
  await api.post('/ship', body);
}