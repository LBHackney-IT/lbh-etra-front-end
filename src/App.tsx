import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import Header from '../src/Components/Header'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <div className="page-wrapper">
          <AppRouter />
        </div>
      </div>
    </div>
  );
}

export default App;