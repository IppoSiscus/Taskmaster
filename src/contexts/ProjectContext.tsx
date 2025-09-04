import React, { createContext, useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
export interface User {
  id: string;
  name: string;
  avatar: string; // Initials or URL
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  parentId: string | null;
  phases: Phase[];
  memberIds: string[];
  createdBy: string;
  createdAt: Date;
}

type NewProjectData = Omit<Project, 'id' | 'parentId' | 'phases' | 'memberIds' | 'createdBy' | 'createdAt'>;

interface ProjectContextType {
  users: User[];
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (projectData: NewProjectData) => void;
  updateProject: (projectId: string, projectData: Partial<NewProjectData>) => void;
}

// --- MOCK DATA ---
const mockUsers: User[] = [
  { id: '1', name: 'Mario Rossi', avatar: 'MR' },
  { id: '2', name: 'Laura Bianchi', avatar: 'LB' },
  { id: '3', name: 'Giuseppe Verde', avatar: 'GV' },
];

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Redesign App',
    description: 'A full redesign of the main application.',
    color: '#3b82f6', // blue-500
    parentId: null,
    phases: [
      { id: 'phase-1-1', name: 'Planning', order: 0, color: '#a855f7' },
      { id: 'phase-1-2', name: 'Design', order: 1, color: '#ec4899' },
      { id: 'phase-1-3', name: 'Development', order: 2, color: '#22c55e' },
      { id: 'phase-1-4', name: 'Done', order: 3, color: '#84cc16' },
    ],
    memberIds: ['1', '2'],
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: 'proj-2',
    name: 'Marketing Website',
    description: 'Launch a new marketing website.',
    color: '#14b8a6', // teal-500
    parentId: null,
    phases: [
      { id: 'phase-2-1', name: 'Copywriting', order: 0, color: '#a855f7' },
      { id: 'phase-2-2', name: 'Implementation', order: 1, color: '#22c55e' },
      { id: 'phase-2-3', name: 'Launched', order: 2, color: '#84cc16' },
    ],
    memberIds: ['1', '3'],
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: 'proj-3',
    name: 'Q4 Report',
    description: 'Final report for the fourth quarter.',
    color: '#f97316', // orange-500
    parentId: 'proj-2', // Nested under Marketing Website
    phases: [
        { id: 'phase-3-1', name: 'Data Gathering', order: 0, color: '#a855f7' },
        { id: 'phase-3-2', name: 'Review', order: 1, color: '#ec4899' },
        { id: 'phase-3-3', name: 'Finalized', order: 2, color: '#84cc16' },
    ],
    memberIds: ['2', '3'],
    createdBy: '2',
    createdAt: new Date(),
  },
];

// --- CONTEXT & PROVIDER ---
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(mockUsers);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const getProject = (id: string) => projects.find(p => p.id === id);

  const addProject = (projectData: NewProjectData) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      parentId: null, // For now, new projects are top-level
      phases: [ // Default phases
        { id: 'phase-new-1', name: 'To Do', order: 0, color: '#a855f7' },
        { id: 'phase-new-2', name: 'In Progress', order: 1, color: '#22c55e' },
        { id: 'phase-new-3', name: 'Done', order: 2, color: '#84cc16' },
      ],
      memberIds: [users[0].id], // Default to first user
      createdBy: users[0].id,
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (projectId: string, projectData: Partial<NewProjectData>) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, ...projectData } : p
      )
    );
  };

  const value = useMemo(() => ({
    users,
    projects,
    getProject,
    addProject,
    updateProject,
  }), [users, projects]);

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
