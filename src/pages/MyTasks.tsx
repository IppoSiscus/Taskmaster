import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';

const MyTasks: React.FC = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) return <div>Loading...</div>;

  const { tasks } = taskContext;

  // In a real app, you'd filter by current user ID
  // const myTasks = tasks.filter(t => t.assigneeId === 'current-user-id');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">I Miei Task</h1>
      <div className="max-w-2xl">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
