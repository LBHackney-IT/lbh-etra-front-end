import React from 'react';
import './App.css';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="page-wrapper">
          <AppRouter />
      </div>
    </div>
  );
}

export default App;