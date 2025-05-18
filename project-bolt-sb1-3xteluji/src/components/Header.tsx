import React, { useState } from 'react';
import { useCodeContext } from '../context/CodeContext';
import { Settings, Play, Save, FileCode, Code, Moon, Sun } from 'lucide-react';
import { executeCode } from '../utils/apiService';
import SettingsModal from './SettingsModal';
import ExamplesModal from './ExamplesModal';

const Header: React.FC = () => {
  const { code, setOutput, isRunning, setIsRunning, theme, setTheme } = useCodeContext();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);

  const handleRunCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      const result = await executeCode(code);
      setOutput(result.output);
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Code className="h-6 w-6 text-blue-400 mr-2" />
          <h1 className="text-xl font-bold text-white">Python Playground</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExamplesOpen(true)}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors"
          >
            <FileCode className="h-4 w-4 mr-1" />
            <span>Examples</span>
          </button>
          
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center transition-colors ${
              isRunning ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Play className="h-4 w-4 mr-1" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            {theme === 'vs-dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ExamplesModal isOpen={examplesOpen} onClose={() => setExamplesOpen(false)} />
    </header>
  );
};

export default Header;