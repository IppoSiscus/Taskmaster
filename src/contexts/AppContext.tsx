import React, { createContext, useState, useMemo } from 'react';
import { Project } from './ProjectContext';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isRightPanelOpen: boolean;
  toggleRightPanel: () => void;
  isQuickAddModalOpen: boolean;
  toggleQuickAddModal: () => void;
  isProjectModalOpen: boolean;
  openProjectModal: (project?: Project) => void;
  closeProjectModal: () => void;
  editingProject: Project | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);
  const [isQuickAddModalOpen, setQuickAddModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);


  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleRightPanel = () => setRightPanelOpen((prev) => !prev);
  const toggleQuickAddModal = () => setQuickAddModalOpen((prev) => !prev);

  const openProjectModal = (project?: Project) => {
    setEditingProject(project || null);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setEditingProject(null);
    setProjectModalOpen(false);
  };

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      isRightPanelOpen,
      toggleRightPanel,
      isQuickAddModalOpen,
      toggleQuickAddModal,
      isProjectModalOpen,
      openProjectModal,
      closeProjectModal,
      editingProject,
    }),
    [isSidebarOpen, isRightPanelOpen, isQuickAddModalOpen, isProjectModalOpen, editingProject]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
