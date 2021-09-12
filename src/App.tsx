import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Result } from './components/Result';

function App() {
  const numbers = ['31', '32', '39', '42', '43', '51', '31'];
  return (
    <div className="app">
      <Sidebar />
      <Result numbers={numbers} />
    </div>
  );
}

export default App;
