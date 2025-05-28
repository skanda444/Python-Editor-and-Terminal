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
// Render will set process.env.PORT automatically. Using 3001 as a local default.
const PORT = process.env.PORT || 3001; 

// Create a temp directory for Python scripts
// This directory will be created relative to your Node.js app's root within Render
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// --- START: CORS Configuration ---
// Get the Netlify frontend URL from the environment variable
// This variable MUST be set on Render for your Node.js service
const netlifyFrontendUrl = process.env.NETLIFY_FRONTEND_URL; 

// Define CORS options to restrict access to your Netlify frontend
const corsOptions = {
  origin: netlifyFrontendUrl, // This will be your deployed Netlify URL (e.g., https://your-site.netlify.app)
  optionsSuccessStatus: 200 // For older browsers (IE11, various SmartTVs)
};

// Apply the CORS middleware with the specific options
app.use(cors(corsOptions));
// --- END: CORS Configuration ---

app.use(express.json()); // To parse JSON request bodies

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
    
    // Handle specific errors from python-shell
    if (error.message && error.message.includes('timed out')) {
      errorMessage = 'Execution timed out after 5 seconds';
    } else if (error.traceback) {
      errorMessage = `Python Error:\n${error.traceback}`;
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = JSON.stringify(error); // Catch-all for unexpected error formats
    }
    
    // Log the full error for debugging on Render
    console.error('Error executing Python code:', error); 

    res.status(500).json({ message: errorMessage });
  }
});

// Basic route for the root URL, useful for checking if the server is running
app.get('/', (req, res) => {
  res.send('Node.js Backend is running!');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // The API endpoint URL should be the Render public URL in production
  console.log(`API endpoint: http://localhost:${PORT}/api/execute (for local testing only)`); 
});
