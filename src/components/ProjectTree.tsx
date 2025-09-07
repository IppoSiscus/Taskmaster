import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Project, ProjectContext } from '../contexts/ProjectContext';
import { Folder, File, ChevronRight } from 'lucide-react';

interface ProjectTreeProps {
  parentId: string | null;
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ parentId }) => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return null;

  const { projects } = projectContext;
  const childProjects = projects.filter(p => p.parentId === parentId);

  if (childProjects.length === 0) {
    return null;
  }

  return (
    <ul className="pl-4">
      {childProjects.map(project => (
        <ProjectTreeItem key={project.id} project={project} allProjects={projects} />
      ))}
    </ul>
  );
};

interface ProjectTreeItemProps {
  project: Project;
  allProjects: Project[];
}

const ProjectTreeItem: React.FC<ProjectTreeItemProps> = ({ project, allProjects }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = allProjects.some(p => p.parentId === project.id);

  const baseLinkClasses = "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeLinkClasses = "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50";

  return (
    <li>
      <div className="flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="p-0.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          {hasChildren && <ChevronRight size={14} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
          {!hasChildren && <span className="w-[18px]"></span>}
        </button>
        <NavLink
          to={`/projects/${project.id}`}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''} w-full`}
        >
          <span style={{ color: project.color }}>
            {hasChildren ? <Folder size={16} /> : <File size={16} />}
          </span>
          <span>{project.name}</span>
        </NavLink>
      </div>
      {isOpen && hasChildren && <ProjectTree parentId={project.id} />}
    </li>
  );
};

export default ProjectTree;
