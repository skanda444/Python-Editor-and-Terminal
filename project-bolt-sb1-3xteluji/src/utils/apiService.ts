import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface ExecuteResponse {
  output: string;
}

export const executeCode = async (code: string): Promise<ExecuteResponse> => {
  try {
    const response = await axios.post(`${API_URL}/execute`, { code });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to execute code');
    }
    throw new Error('Failed to connect to the server');
  }
};