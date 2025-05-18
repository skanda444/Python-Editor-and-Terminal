import React from 'react';
import EditorContainer from './components/EditorContainer';
import Header from './components/Header';
import { CodeProvider } from './context/CodeContext';

function App() {
  return (
    <CodeProvider>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow flex flex-col">
          <EditorContainer />
        </main>
      </div>
    </CodeProvider>
  );
}

export default App;