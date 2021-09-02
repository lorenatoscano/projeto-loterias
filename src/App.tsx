import React from 'react';
import { Select } from './components/Select';

function App() {
  let text = 'mega-sena';

  return (
    <div className="app">
      <Select label={text}></Select>
    </div>
  );
}

export default App;
