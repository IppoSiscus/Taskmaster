import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ProjectContext } from '../contexts/ProjectContext';
import { TaskContext, Priority, Task, Recurrence } from '../contexts/TaskContext';

// Sub-component for the checklist
const SubtaskList: React.FC<{ parentTask: Task }> = ({ parentTask }) => {
    const taskContext = useContext(TaskContext);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    if (!taskContext) return null;

    const { tasks, addTask, toggleTaskCompletion } = taskContext;
    const subtasks = tasks.filter(t => t.parentTaskId === parentTask.id);

    const handleAddSubtask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubtaskTitle.trim()) return;

        addTask({
            title: newSubtaskTitle,
            projectId: parentTask.projectId,
            phaseId: parentTask.phaseId,
            parentTaskId: parentTask.id,
        });
        setNewSubtaskTitle('');
    };

    return (
        <div>
            <h3 className="font-semibold mb-2">Checklist</h3>
            <div className="flex flex-col gap-2">
                {subtasks.map(subtask => (
                    <div key={subtask.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={subtask.isCompleted}
                            onChange={() => toggleTaskCompletion(subtask.id)}
                            className="w-4 h-4"
                        />
                        <span className={`flex-1 ${subtask.isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {subtask.title}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleAddSubtask} className="mt-2 flex gap-2">
                <input
                    type="text"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="Add an item..."
                    className="w-full px-2 py-1 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
                <button type="submit" className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-md text-sm">Add</button>
            </form>
        </div>
    );
}

const TaskDetails: React.FC = () => {
  const appContext = useContext(AppContext);
  const projectContext = useContext(ProjectContext);
  const taskContext = useContext(TaskContext);

  if (!appContext || !projectContext || !taskContext) return null;

  const { selectedTask } = appContext;
  const { users } = projectContext;
  const { updateTask } = taskContext;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [priority, setPriority] = useState<Priority>(null);
  const [recurrence, setRecurrence] = useState<Recurrence | null>(null);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setAssigneeId(selectedTask.assigneeId);
      setPriority(selectedTask.priority);
      setRecurrence(selectedTask.recurrence);
    }
  }, [selectedTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    updateTask(selectedTask.id, { title, description, assigneeId, priority, recurrence });
    // Maybe don't close the panel on save, let the user do it
  };

  if (!selectedTask) {
      return (
          <div className="p-4 text-center text-gray-500">
              Select a task to see its details.
          </div>
      )
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-bold bg-transparent w-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 rounded-md p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={3}
        />

        <SubtaskList parentTask={selectedTask} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <select
              value={assigneeId || ''}
              onChange={(e) => setAssigneeId(e.target.value || null)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority || ''}
              onChange={(e) => setPriority(e.target.value as Priority || null)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Recurrence</label>
            <select
              value={recurrence?.type || ''}
              onChange={(e) => {
                const type = e.target.value as Recurrence['type'];
                if (type) {
                  setRecurrence({ type, pattern: {}, nextDueDate: new Date() }); // Stub
                } else {
                  setRecurrence(null);
                }
              }}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </form>
  );
};

export default TaskDetails;
