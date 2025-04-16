import API from './api';

export const generateQuiz = async (topic, userId) => {
  try {
    const response = await API.post('/quiz/generate-ai-quiz', { topic, userId });
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error) {
    console.error('Error generating quiz:', error);
    if (error.response?.status === 500) {
      throw new Error('OpenAI API error or server error while generating quiz. Please try again.');
    }
    throw error.response?.data || { message: 'Failed to generate quiz. Please try again.' };
  }
};

export const fetchQuestions = async (userId) => {
  try {
    const response = await API.post('/quiz/questions', { userId });
    if (!response.data) {
      throw new Error('No question data received');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching next question:', error);
    throw error.response?.data || { message: 'Failed to fetch next question' };
  }
};

export const submitAnswers = async ({userId, answers}) => {
  try {
    const response = await API.post('/quiz/submitAnswers', { userId, answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error.response?.data || { message: 'Failed to submit answers' };
  }
};



export const getQuizPerformance = async (quizId) => {
  try {
    const response = await API.get(`/performance/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz performance:', error);
    throw error.response?.data || { message: 'Failed to fetch quiz performance' };
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

export const getOverallReview = async () => {
  try {
    const response = await API.get('/review/overall');
    return response.data;
  } catch (error) {
    console.error('Error fetching overall review:', error);
    throw error.response?.data || error;
  }
};

export const getQuizReview = async (quizId) => {
  try {
    const response = await API.get(`/review/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz review:', error);
    throw error.response?.data || error;
  }
};