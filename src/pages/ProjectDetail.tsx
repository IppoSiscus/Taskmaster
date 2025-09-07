import React, { useContext, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ProjectContext } from '../contexts/ProjectContext';
import { TaskContext, Priority, TaskStatus } from '../contexts/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import AdvancedFilters, { FilterValues } from '../components/AdvancedFilters';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const projectContext = useContext(ProjectContext);
  const taskContext = useContext(TaskContext);

  if (!projectContext || !taskContext) {
    return <div>Loading...</div>;
  }

  const { getProject } = projectContext;
  const { tasks, moveTask, reorderTasks } = taskContext;

  const project = projectId ? getProject(projectId) : undefined;
  const projectTasks = useMemo(() => tasks.filter(t => t.projectId === projectId), [tasks, projectId]);

  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: '',
    assigneeId: '',
    priority: '',
    status: '',
    dateRange: { startDate: undefined, endDate: undefined },
  });

  const filteredTasks = useMemo(() => {
    return projectTasks.filter(task => {
        const searchMatch = filters.searchTerm === '' ||
                            task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            task.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const assigneeMatch = !filters.assigneeId || task.assigneeId === filters.assigneeId;
        const priorityMatch = !filters.priority || task.priority === filters.priority;
        const statusMatch = !filters.status || task.status === filters.status;

        // Date range filtering would be implemented here

        return searchMatch && assigneeMatch && priorityMatch && statusMatch;
    });
  }, [projectTasks, filters]);

  if (!project) {
    return <div>Project not found.</div>;
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeTask = projectTasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Find the container (phase) the `over` item is in.
    // `over.data.current` would be set if `over` is a sortable item (a task).
    // If `over` is a droppable container (a column), its id is the phaseId.
    const overPhaseId = over.data.current?.sortable?.containerId || overId;

    if (activeTask.phaseId !== overPhaseId) {
        // Task moved to a new column
        const tasksInNewPhase = tasks.filter(t => t.phaseId === overPhaseId);
        moveTask(activeId, overPhaseId, tasksInNewPhase.length);
    } else {
        // Task moved within the same column
        const tasksInSamePhase = tasks.filter(t => t.phaseId === overPhaseId);
        const oldIndex = tasksInSamePhase.findIndex(t => t.id === activeId);
        const newIndex = tasksInSamePhase.findIndex(t => t.id === overId);

        if (activeId !== overId && oldIndex !== -1 && newIndex !== -1) {
            const reordered = arrayMove(tasksInSamePhase, oldIndex, newIndex);
            reorderTasks(reordered, overPhaseId);
        }
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <p className="text-gray-500 mt-1">{project.description}</p>
            </div>

            <AdvancedFilters onFilterChange={setFilters} />

            <div className="flex-1 flex gap-4 overflow-x-auto">
                {project.phases.sort((a, b) => a.order - b.order).map(phase => (
                    <KanbanColumn
                        key={phase.id}
                        phase={phase}
                        tasks={filteredTasks.filter(task => task.phaseId === phase.id)}
                    />
                ))}
            </div>
        </div>
    </DndContext>
  );
};

export default ProjectDetail;
