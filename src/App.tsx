import React from 'react';
import './App.css';
import { Meeting } from './Components/Meeting'

const App: React.FC = () => {
  return (
    <div className="App">
      <Meeting traName="Test Group"></Meeting>
    </div>
  );
}

export default App;