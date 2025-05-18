import React from 'react';
import Split from 'react-split';
import CodeEditor from './CodeEditor';
import OutputTerminal from './OutputTerminal';

const EditorContainer: React.FC = () => {
  return (
    <div className="flex-grow h-[calc(100vh-60px)]">
      <Split
        className="split h-full"
        direction="vertical"
        sizes={[60, 40]}
        minSize={100}
        gutterSize={6}
        gutterAlign="center"
        gutterStyle={() => ({
          backgroundColor: '#374151',
          height: '6px',
          cursor: 'row-resize',
        })}
      >
        <div className="h-full overflow-hidden">
          <CodeEditor />
        </div>
        <div className="h-full overflow-hidden">
          <OutputTerminal />
        </div>
      </Split>
    </div>
  );
};

export default EditorContainer;