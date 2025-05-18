import React, { useRef, useEffect } from 'react';
import { useCodeContext } from '../context/CodeContext';

const OutputTerminal: React.FC = () => {
  const { output, theme } = useCodeContext();
  const terminalRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const backgroundColor = theme === 'vs-dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'vs-dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`h-full w-full ${backgroundColor} border-t border-gray-700`}>
      <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
        <span className="text-sm font-medium text-gray-300">Output</span>
      </div>
      
      <pre
        ref={terminalRef}
        className={`font-mono text-sm p-4 h-[calc(100%-30px)] overflow-auto ${textColor}`}
      >
        {output || 'Run your code to see output here...'}
      </pre>
    </div>
  );
};

export default OutputTerminal;