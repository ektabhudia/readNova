import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/auth", // adjust if backend runs on different port
});

// Attach token automatically (if stored)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
