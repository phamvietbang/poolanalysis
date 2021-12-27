import axios from "axios";

const API_ROOT = "http://localhost:8000";
// const API_ROOT = "http://165.22.59.25:8081";
const responseBody = res => res.data;

const apiConfig = {};
const client = {
  get: (url, config = apiConfig) => axios.get(`${API_ROOT}${url}`, config).then(responseBody),
  post: (url, body, config = apiConfig) => axios.post(`${API_ROOT}${url}`, body, config).then(responseBody),
  del: (url, config = apiConfig) => axios.delete(`${API_ROOT}${url}`, config).then(responseBody),
  put: (url, body, config = apiConfig) => axios.put(`${API_ROOT}${url}`, body, config).then(responseBody)
};

export default client;
