import React from 'react';

const QuickAddTaskForm: React.FC = () => {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task title..."
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default QuickAddTaskForm;
