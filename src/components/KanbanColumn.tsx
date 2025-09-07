import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Phase } from '../contexts/ProjectContext';
import { Task } from '../contexts/TaskContext';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  phase: Phase;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ phase, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: phase.id,
  });

  const style = {
    backgroundColor: isOver ? '#e0e0e0' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-80 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-shrink-0 flex flex-col">
      <h3 className="font-bold mb-3 px-1 text-lg">{phase.name} <span className="text-sm text-gray-500">{tasks.length}</span></h3>
      <div className="flex-1 overflow-y-auto">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.sort((a, b) => a.order - b.order).map(task => (
            <TaskCard key={task.id} task={task} />
            ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
