import axios from 'axios';
const baseUrl = '/api/persons';
// Different base URL when testing locally so that the backend's dist build folder is not used for the frontend. If you uncomment line 4 below, also comment out the proxy setting in vite.config.js (line 9)
// const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default { getAll, create, update, deleteNote };
