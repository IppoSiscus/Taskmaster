import React from 'react';

const RightPanel: React.FC = () => {
  return (
    <aside className="w-[350px] bg-gray-100 dark:bg-gray-800 p-4 border-l border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold">Task Details</h2>
      <p>Details about the selected task will appear here.</p>
    </aside>
  );
};

export default RightPanel;
