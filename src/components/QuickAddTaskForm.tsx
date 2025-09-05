import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { AppContext } from '../contexts/AppContext';
import { ProjectContext } from '../contexts/ProjectContext';

const QuickAddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const taskContext = useContext(TaskContext);
  const appContext = useContext(AppContext);
  const projectContext = useContext(ProjectContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !taskContext || !projectContext || !appContext) return;

    // For quick-add, let's add to the first project and its first phase
    const defaultProject = projectContext.projects[0];
    const defaultPhase = defaultProject?.phases[0];

    if (defaultProject && defaultPhase) {
      taskContext.addTask({
        title,
        projectId: defaultProject.id,
        phaseId: defaultPhase.id,
      });
      setTitle('');
      appContext.toggleQuickAddModal(); // Close modal on success
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          autoFocus
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
