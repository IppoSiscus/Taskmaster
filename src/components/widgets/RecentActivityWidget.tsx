import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import { ProjectContext } from '../../contexts/ProjectContext';

const RecentActivityWidget: React.FC = () => {
    const taskContext = useContext(TaskContext);
    const projectContext = useContext(ProjectContext);

    const recentActivity = useMemo(() => {
        if (!taskContext || !projectContext) return [];

        const allActivity = taskContext.tasks.flatMap(task =>
            task.activityLog.map(log => ({
                ...log,
                taskTitle: task.title,
                author: projectContext.users.find(u => u.id === log.authorId)
            }))
        );

        return allActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);

    }, [taskContext, projectContext]);

    if (!taskContext || !projectContext) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Recent Activity</h3>
            <div className="flex flex-col gap-3">
                {recentActivity.map(log => (
                    <div key={log.id} className="text-sm">
                        <span className="font-bold">{log.author?.name || 'Someone'}</span>
                        <span> {log.action} on task "{log.taskTitle}"</span>
                        <p className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivityWidget;
