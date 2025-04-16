import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (userData) => {
  try {
    // Use API.post instead of axios.post
    const response = await API.post("/auth/login", userData);
    
    console.log("API Response:", response.data); // ✅ Debugging the API response
    localStorage.setItem("token", response.data.token); 
    localStorage.setItem("user", JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message); // ✅ Log error details
    throw error.response?.data?.message || "Invalid Credentials!";
  }
};

export const register = (data) => API.post("/auth/register", data);



export default API;
