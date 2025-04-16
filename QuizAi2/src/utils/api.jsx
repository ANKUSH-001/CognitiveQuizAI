import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
export const getAllQuestions = (userId) => API.get("/quiz/all-questions");
export const fetchPerformance = (userId) => API.get(`/performance/${userId}`);
export const fetchReview = (quizId) => API.get(`/review/${quizId}`);
export const fetchOverallReview = (userId) => API.get(`/review/overall/${userId}`);
export const submitAnswers = (userId, answers) =>
  API.post("/quiz/submitAnswers", { userId, answers }); 

export default API;
