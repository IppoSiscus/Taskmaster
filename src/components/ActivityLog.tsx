import React, { useContext } from 'react';
import { Task } from '../contexts/TaskContext';
import { ProjectContext } from '../contexts/ProjectContext';

interface ActivityLogProps {
  task: Task;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ task }) => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return null;

  const { users } = projectContext;

  return (
    <div className="flex flex-col gap-3">
      {task.activityLog.map(log => {
        const author = users.find(u => u.id === log.authorId);
        return (
          <div key={log.id} className="text-sm">
            <span className="font-bold">{author?.name || 'Someone'}</span>
            <span> {log.action}</span>
            <span className="text-xs text-gray-500 ml-2">{log.timestamp.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityLog;
