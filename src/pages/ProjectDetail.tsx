import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import { TaskContext } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const projectContext = useContext(ProjectContext);
  const taskContext = useContext(TaskContext);

  if (!projectContext || !taskContext) {
    return <div>Loading...</div>;
  }

  const { getProject } = projectContext;
  const { getTasksByProjectId } = taskContext;

  const project = projectId ? getProject(projectId) : undefined;
  const tasks = projectId ? getTasksByProjectId(projectId) : [];

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-gray-500 mt-1">{project.description}</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto">
        {project.phases.sort((a, b) => a.order - b.order).map(phase => (
          <div key={phase.id} className="w-72 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-shrink-0">
            <h3 className="font-bold mb-3 px-1">{phase.name}</h3>
            <div>
              {tasks
                .filter(task => task.phaseId === phase.id)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
