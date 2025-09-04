import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const projectContext = useContext(ProjectContext);

  if (!projectContext) {
    return <div>Loading...</div>; // Or some other loading state
  }

  const { getProject } = projectContext;
  const project = projectId ? getProject(projectId) : undefined;

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: project.color }}>{project.name}</h1>
        <p className="text-gray-500 mt-1">{project.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Phases</h2>
        <div className="flex gap-4">
          {project.phases.sort((a, b) => a.order - b.order).map(phase => (
            <div key={phase.id} className="p-4 rounded-lg" style={{ backgroundColor: phase.color }}>
              <h3 className="font-bold text-white">{phase.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
