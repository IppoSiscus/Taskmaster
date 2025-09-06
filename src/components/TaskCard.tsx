import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Priority, TaskContext } from '../contexts/TaskContext';
import { AppContext } from '../contexts/AppContext';
import { ProjectContext, User } from '../contexts/ProjectContext';
import { Calendar, CheckSquare, GripVertical, MessageSquare } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const priorityClasses: Record<NonNullable<Priority>, string> = {
  High: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300',
  Medium: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Low: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const projectContext = useContext(ProjectContext);
  const appContext = useContext(AppContext);
  const taskContext = useContext(TaskContext);

  const assignee = projectContext?.users.find(u => u.id === task.assigneeId);
  const subtasks = taskContext?.tasks.filter(t => t.parentTaskId === task.id) || [];
  const completedSubtasks = subtasks.filter(t => t.isCompleted).length;
  const progress = subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0;

  const handleCardClick = () => {
    appContext?.selectTask(task);
  };

  const getDueDateColor = (dueDate: Date | null): string => {
    if (!dueDate) return 'text-gray-500';
    const today = new Date();
    const aDay = 24 * 60 * 60 * 1000;
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) return 'text-red-500'; // Overdue
    if (dueDate.getTime() - today.getTime() < 3 * aDay) return 'text-yellow-500'; // Due soon
    return 'text-gray-500';
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow mb-2 cursor-grab hover:bg-gray-50 dark:hover:bg-gray-700 touch-none"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">{task.title}</span>
        {task.priority && (
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${priorityClasses[task.priority]}`}>
                {task.priority}
            </span>
        )}
      </div>

      {subtasks.length > 0 && (
        <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="flex items-center gap-1"><CheckSquare size={14}/> Sub-tasks</span>
                <span>{completedSubtasks}/{subtasks.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div className="bg-primary h-1 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {assignee && (
            <div
              className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white"
              title={`Assigned to: ${assignee.name}`}
            >
              {assignee.avatar}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MessageSquare size={14} /> 0
          </div>
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-xs ${getDueDateColor(task.dueDate)}`}>
                <Calendar size={14} />
                <span>{task.dueDate.toLocaleDateString()}</span>
            </div>
          )}
        </div>
        <div className="flex -space-x-1">
            {task.tags.map(tag => (
                <span key={tag.id} className="px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                    {tag.name}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
