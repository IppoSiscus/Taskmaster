import React, { useContext, useState } from 'react';
import TaskDetails from './TaskDetails';
import { AppContext } from '../contexts/AppContext';
import { TaskContext } from '../contexts/TaskContext';
import { X, MoreVertical, Copy, Trash2 } from 'lucide-react';

const RightPanel: React.FC = () => {
    const appContext = useContext(AppContext);
    const taskContext = useContext(TaskContext);
    const [isMenuOpen, setMenuOpen] = useState(false);

    if (!appContext || !taskContext) return null;

    const { selectedTask, closeRightPanel } = appContext;
    const { duplicateTask, deleteTask } = taskContext;

    const handleDuplicate = () => {
        if (selectedTask) duplicateTask(selectedTask.id);
        setMenuOpen(false);
    };

    const handleDelete = () => {
        if (selectedTask) deleteTask(selectedTask.id);
        closeRightPanel();
        setMenuOpen(false);
    };

    return (
        <aside className="w-[350px] bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold">Task Details</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button onClick={() => setMenuOpen(prev => !prev)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            <MoreVertical size={20} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg z-10">
                                <button onClick={handleDuplicate} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                                    <Copy size={16} /> Duplicate Task
                                </button>
                                <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                                    <Trash2 size={16} /> Delete Task
                                </button>
                            </div>
                        )}
                    </div>
                    <button onClick={closeRightPanel} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <TaskDetails />
            </div>
        </aside>
    );
};

export default RightPanel;
