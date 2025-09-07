import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const TasksSummaryWidget: React.FC = () => {
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;

    const { tasks } = taskContext;

    const summary = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dueToday = tasks.filter(t => t.dueDate && t.dueDate.getTime() >= today.getTime() && t.dueDate.getTime() < tomorrow.getTime()).length;
        const overdue = tasks.filter(t => t.dueDate && t.dueDate < today && !t.isCompleted).length;

        return { dueToday, overdue };
    }, [tasks]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Tasks Overview</h3>
            <div className="flex justify-around">
                <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{summary.dueToday}</p>
                    <p className="text-sm text-gray-500">Due Today</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-red-500">{summary.overdue}</p>
                    <p className="text-sm text-gray-500">Overdue</p>
                </div>
            </div>
        </div>
    );
};

export default TasksSummaryWidget;
