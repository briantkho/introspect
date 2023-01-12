import React from 'react';
import { Card } from './components/Card';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="dark:bg-dark-bg bg-white-bg">
      <Sidebar />
      <div className="ml-36">
        <Card />
      </div>
    </div>
  );
};

export default App;
