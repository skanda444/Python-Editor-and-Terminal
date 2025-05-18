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

// Create a temp directory for Python scripts
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

app.post('/api/execute', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }
  
  try {
    // Generate a unique file name
    const scriptId = uuidv4();
    const scriptPath = path.join(tempDir, `${scriptId}.py`);
    
    // Write the Python code to a file
    fs.writeFileSync(scriptPath, code);
    
    // Execute the Python code
    const options = {
      mode: 'text',
      pythonPath: 'python', // Use the default Python path
      pythonOptions: ['-u'], // Unbuffered output
      scriptPath: tempDir,
      args: [],
      timeout: 5000 // 5 second timeout
    };
    
    const results = await PythonShell.run(`${scriptId}.py`, options);
    const output = results.join('\n');
    
    // Clean up the temporary file
    try {
      fs.unlinkSync(scriptPath);
    } catch (err) {
      console.error('Error deleting temporary file:', err);
    }
    
    res.json({ output });
  } catch (error) {
    let errorMessage = 'An error occurred while executing the code';
    
    if (error.message.includes('timed out')) {
      errorMessage = 'Execution timed out after 5 seconds';
    } else if (error.traceback) {
      errorMessage = `Python Error:\n${error.traceback}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ message: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/execute`);
});