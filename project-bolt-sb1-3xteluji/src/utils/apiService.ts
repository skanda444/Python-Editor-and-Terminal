import axios from 'axios';

const API_URL = 'https://python-editor-and-terminal.onrender.com';

interface ExecuteResponse {
  output: string;
}

export const executeCode = async (code: string): Promise<ExecuteResponse> => {
  try {
    // CORRECTED LINE: Added '/api' before '/execute'
    const response = await axios.post(`${API_URL}/api/execute`, { code }); 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to execute code');
    }
    throw new Error('Failed to connect to the server');
  }
};
