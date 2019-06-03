import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Meeting } from './Meeting'

const App: React.FC = () => {
  return (
    <div className="App">
      <Meeting></Meeting>
    </div>
  );
}

export default App;