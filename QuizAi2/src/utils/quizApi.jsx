import API from './api';

export const generateQuiz = async (topic, userId) => {
  try {
    const response = await API.post('/quiz/generate-ai-quiz', { topic, userId });
    return response.data;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error.response?.data || error;
  }
};

export const getNextQuestion = async (userId) => {
  try {
    const response = await API.post('/quiz/next-question', { userId });
    return response.data;
  } catch (error) {
    console.error('Error fetching next question:', error);
    throw error.response?.data || error;
  }
};

export const submitQuizAnswers = async (userId, answers) => {
  try {
    const response = await API.post('/quiz/submitAnswers', { userId, answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error.response?.data || error;
  }
};

export const getAllQuestions = async () => {
  try {
    const response = await API.get('/quiz/all-questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching all questions:', error);
    throw error.response?.data || error;
  }
};

export const getQuizPerformance = async (quizId) => {
  try {
    const response = await API.get(`/performance/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz performance:', error);
    throw error.response?.data || error;
  }
};

export const getAIReview = async (quizId) => {
  try {
    const response = await API.post(`/review/ai-review/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AI review:', error);
    throw error.response?.data || error;
  }
};