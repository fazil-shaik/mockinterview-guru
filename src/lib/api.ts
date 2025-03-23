
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Define types
export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  logo: string;
  location: string;
  salary: string;
  tags: string[];
  createdAt: string;
}

export interface Question {
  _id: string;
  jobId: string;
  title: string;
  description: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  exampleInput?: string;
  exampleOutput?: string;
  codeTemplate?: Record<string, string>;
}

export interface Submission {
  _id: string;
  questionId: string;
  userId: string;
  code: string;
  language: string;
  status: 'Pending' | 'Submitted' | 'Evaluated';
  result: {
    status: string;
    stdout?: string;
    stderr?: string;
    compile_output?: string;
    execution_time?: string;
  };
  aiReview?: string;
  createdAt: string;
}

// Job API
export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Fallback to mock data for now
    return [];
  }
};

export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }
};

// Interview API
export const getQuestionsByJobId = async (jobId: string): Promise<Question[]> => {
  try {
    const response = await axios.get(`${API_URL}/interviews/job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for job ${jobId}:`, error);
    return [];
  }
};

export const getQuestionById = async (id: string): Promise<Question | null> => {
  try {
    const response = await axios.get(`${API_URL}/interviews/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question ${id}:`, error);
    return null;
  }
};

// Submission API
export const submitCode = async (
  questionId: string, 
  code: string, 
  language: string
): Promise<Submission> => {
  try {
    // Generate a temporary user ID
    const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId);
    }
    
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

export const getSubmissionById = async (id: string): Promise<Submission | null> => {
  try {
    const response = await axios.get(`${API_URL}/submissions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching submission ${id}:`, error);
    return null;
  }
};

export const getSubmissionsByQuestionId = async (questionId: string): Promise<Submission[]> => {
  try {
    const response = await axios.get(`${API_URL}/submissions/question/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching submissions for question ${questionId}:`, error);
    return [];
  }
};
