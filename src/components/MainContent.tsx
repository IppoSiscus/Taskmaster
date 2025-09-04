import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div className="p-4 flex-1 bg-gray-50 dark:bg-gray-950">
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;
