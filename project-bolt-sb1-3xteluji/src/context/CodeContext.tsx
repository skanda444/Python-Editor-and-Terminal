import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CodeContextType {
  code: string;
  setCode: (code: string) => void;
  output: string;
  setOutput: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

const defaultContext: CodeContextType = {
  code: '# Write your Python code here\nprint("Hello, World!")',
  setCode: () => {},
  output: '',
  setOutput: () => {},
  isRunning: false,
  setIsRunning: () => {},
  theme: 'vs-dark',
  setTheme: () => {},
  fontSize: 14,
  setFontSize: () => {},
};

const CodeContext = createContext<CodeContextType>(defaultContext);

export const useCodeContext = () => useContext(CodeContext);

interface CodeProviderProps {
  children: ReactNode;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({ children }) => {
  const [code, setCode] = useState(defaultContext.code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);

  const value = {
    code,
    setCode,
    output,
    setOutput,
    isRunning,
    setIsRunning,
    theme,
    setTheme,
    fontSize,
    setFontSize,
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};