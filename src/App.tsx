import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Result } from './components/Result';

import { LotteriesProvider } from './contexts/LotteriesContext';

function App() {
  return (
    <div className="app">
      <LotteriesProvider>
        <Sidebar />
        <Result />
      </LotteriesProvider>
    </div>
  );
}

export default App;
