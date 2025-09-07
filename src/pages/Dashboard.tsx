import React from 'react';
import TasksSummaryWidget from '../components/widgets/TasksSummaryWidget';
import RecentActivityWidget from '../components/widgets/RecentActivityWidget';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <TasksSummaryWidget />
        </div>
        <div>
            <RecentActivityWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
