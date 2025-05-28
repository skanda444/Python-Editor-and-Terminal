import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; 

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// --- START: CORS Configuration (TEMPORARY HARDCODED FOR DEBUGGING) ---
// IMPORTANT: This is for debugging only. In production, you should use process.env.NETLIFY_FRONTEND_URL
const hardcodedNetlifyFrontendUrl = 'https://python-terminal1.netlify.app'; 

console.log('CORS Origin (HARDCODED FOR DEBUGGING) set to:', hardcodedNetlifyFrontendUrl);

const corsOptions = {
  origin: hardcodedNetlifyFrontendUrl, // Using the hardcoded URL for testing
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// --- END: CORS Configuration ---

app.use(express.json());

app.post('/api/execute', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }
  
  try {
    const scriptId = uuidv4();
    const scriptPath = path.join(tempDir, `${scriptId}.py`);
    
    fs.writeFileSync(scriptPath, code);
    
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: tempDir,
      args: [],
      timeout: 5000
    };
    
    const results = await PythonShell.run(`${scriptId}.py`, options);
    const output = results.join('\n');
    
    try {
      fs.unlinkSync(scriptPath);
    } catch (err) {
      console.error('Error deleting temporary file:', err); 
    }
    
    res.json({ output });
  } catch (error) {
    let errorMessage = 'An error occurred while executing the code';
    
    if (error.message && error.message.includes('timed out')) {
      errorMessage = 'Execution timed out after 5 seconds';
    } else if (error.traceback) {
      errorMessage = `Python Error:\n${error.traceback}`;
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = JSON.stringify(error);
    }
    
    console.error('Error executing Python code:', error); 

    res.status(500).json({ message: errorMessage });
  }
});

app.get('/', (req, res) => {
  res.send('Node.js Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/execute (for local testing only)`); 
});
