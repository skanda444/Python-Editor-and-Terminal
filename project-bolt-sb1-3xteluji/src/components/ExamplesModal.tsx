import React from 'react';
import { useCodeContext } from '../context/CodeContext';
import { X } from 'lucide-react';
import { exampleCode } from '../utils/exampleCode';

interface ExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExamplesModal: React.FC<ExamplesModalProps> = ({ isOpen, onClose }) => {
  const { setCode } = useCodeContext();

  if (!isOpen) return null;

  const handleSelectExample = (code: string) => {
    setCode(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg w-[600px] max-w-full max-h-[80vh] animate-fadeIn overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-white">Code Examples</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-2 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(exampleCode).map(([title, code]) => (
              <div 
                key={title}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer transition-colors"
                onClick={() => handleSelectExample(code)}
              >
                <h3 className="font-medium text-white mb-2">{title}</h3>
                <pre className="text-xs text-gray-300 overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-3">
                  {code.substring(0, 150)}
                  {code.length > 150 ? '...' : ''}
                </pre>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end border-t border-gray-700 p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamplesModal;