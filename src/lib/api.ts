
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Submit code for evaluation
export const submitCode = async (questionId: string, code: string, language: string) => {
  try {
    const userId = 'user123'; // This would typically come from authentication
    const response = await axios.post(`${API_URL}/submissions`, {
      questionId,
      userId,
      code,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw error;
  }
};

// Get code review feedback by submission ID
export const getCodeReviewFeedback = async (submissionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/submissions/${submissionId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting code review feedback:', error);
    throw error;
  }
};

// Get all submissions for a question
export const getSubmissions = async (questionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/submissions/question/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting submissions:', error);
    throw error;
  }
};
