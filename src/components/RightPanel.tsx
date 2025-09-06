import React, { useContext } from 'react';
import TaskDetails from './TaskDetails';
import { AppContext } from '../contexts/AppContext';
import { X } from 'lucide-react';

const RightPanel: React.FC = () => {
    const appContext = useContext(AppContext);
    if (!appContext) return null;

    const { closeRightPanel } = appContext; // Need to add this function

    return (
        <aside className="w-[350px] bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold">Task Details</h2>
                <button onClick={closeRightPanel} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                    <X size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <TaskDetails />
            </div>
        </aside>
    );
};

export default RightPanel;
