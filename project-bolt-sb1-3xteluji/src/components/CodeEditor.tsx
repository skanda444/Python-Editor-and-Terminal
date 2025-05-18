import React from 'react';
import Editor from '@monaco-editor/react';
import { useCodeContext } from '../context/CodeContext';

const CodeEditor: React.FC = () => {
  const { code, setCode, theme, fontSize } = useCodeContext();

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        theme={theme}
        onChange={handleChange}
        options={{
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          fontSize: fontSize,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: 'on',
          folding: true,
          tabSize: 4,
          bracketPairColorization: { enabled: true },
          readOnly: false,
          contextmenu: true,
          quickSuggestions: true,
          renderControlCharacters: false,
          renderWhitespace: "none",
          wordWrap: "on",
          fixedOverflowWidgets: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          },
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: 'line',
          roundedSelection: false,
          cursorStyle: 'line',
          cursorWidth: 2,
          cursorBlinking: 'solid',
          mouseWheelZoom: false,
          suggest: {
            showWords: true,
            snippetsPreventQuickSuggestions: false
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;