import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import Header from '../src/Components/Header'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <div className="page-wrapper">
          <AppRouter />
      </div>
    </div>
  );
}

export default App;