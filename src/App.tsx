import React from 'react';
import Chart from './components/Chart';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📈 React Charting Application 📊</h1>
      </header>
      <main>
        <Chart />
      </main>
    </div>
  );
};

export default App;
