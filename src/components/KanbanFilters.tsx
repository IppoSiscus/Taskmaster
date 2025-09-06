import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Priority } from '../contexts/TaskContext';

interface KanbanFiltersProps {
  onFilterChange: (filters: { searchTerm: string; assigneeId: string; priority: Priority | '' }) => void;
}

const KanbanFilters: React.FC<KanbanFiltersProps> = ({ onFilterChange }) => {
  const projectContext = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');

  useEffect(() => {
    onFilterChange({ searchTerm, assigneeId, priority });
  }, [searchTerm, assigneeId, priority, onFilterChange]);

  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      />
      <select
        name="assigneeId"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Assignees</option>
        {projectContext?.users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority | '')}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default KanbanFilters;
