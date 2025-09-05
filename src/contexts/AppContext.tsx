import React, { createContext, useState, useMemo } from 'react';
import { Project } from './ProjectContext';
import { Task } from './TaskContext';

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
  isTaskDetailModalOpen: boolean;
  openTaskDetailModal: (task: Task) => void;
  closeTaskDetailModal: () => void;
  selectedTask: Task | null;
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
  const [isTaskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


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

  const openTaskDetailModal = (task: Task) => {
    setSelectedTask(task);
    setTaskDetailModalOpen(true);
  };

  const closeTaskDetailModal = () => {
    setSelectedTask(null);
    setTaskDetailModalOpen(false);
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
      isTaskDetailModalOpen,
      openTaskDetailModal,
      closeTaskDetailModal,
      selectedTask,
    }),
    [isSidebarOpen, isRightPanelOpen, isQuickAddModalOpen, isProjectModalOpen, editingProject, isTaskDetailModalOpen, selectedTask]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
