import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Priority, TaskStatus } from '../contexts/TaskContext';
import { DateRangePicker } from 'react-date-range';

export interface FilterValues {
    searchTerm: string;
    assigneeId: string;
    priority: Priority | '';
    status: TaskStatus | '';
    dateRange: {
        startDate?: Date;
        endDate?: Date;
    };
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange }) => {
  const projectContext = useContext(ProjectContext);
  const [filters, setFilters] = useState<FilterValues>({
      searchTerm: '',
      assigneeId: '',
      priority: '',
      status: '',
      dateRange: { startDate: undefined, endDate: undefined }
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    setFilters(prev => ({ ...prev, dateRange: { startDate: selection.startDate, endDate: selection.endDate }}));
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search tasks..."
        value={filters.searchTerm}
        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      />
      <select
        name="assigneeId"
        value={filters.assigneeId}
        onChange={(e) => setFilters(prev => ({ ...prev, assigneeId: e.target.value }))}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Assignees</option>
        {projectContext?.users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <select
        name="priority"
        value={filters.priority}
        onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as Priority | '' }))}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {/* DateRangePicker might be too large for this simple layout.
          A real implementation would use a popover.
          For now, we'll just show a button as a placeholder. */}
      <button className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">Select Date Range</button>
    </div>
  );
};

export default AdvancedFilters;
