import React from 'react';
import './App.css';
import { Meeting } from './Components/Meeting'

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="page-wrapper">
          <Meeting traName="Test Group"></Meeting>
      </div>
    </div>
  );
}

export default App;