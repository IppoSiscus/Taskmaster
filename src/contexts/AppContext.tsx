import React, { createContext, useState, useMemo } from 'react';
import { Project } from './ProjectContext';
import { Task } from './TaskContext';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isRightPanelOpen: boolean;
  openRightPanel: () => void;
  closeRightPanel: () => void;
  isQuickAddModalOpen: boolean;
  openQuickAddModal: (defaultDate?: Date) => void;
  closeQuickAddModal: () => void;
  quickAddModalDate: Date | null;
  isProjectModalOpen: boolean;
  openProjectModal: (project?: Project) => void;
  closeProjectModal: () => void;
  editingProject: Project | null;
  selectTask: (task: Task) => void;
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
  const [quickAddModalDate, setQuickAddModalDate] = useState<Date | null>(null);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const openRightPanel = () => setRightPanelOpen(true);
  const closeRightPanel = () => {
    setRightPanelOpen(false);
    setSelectedTask(null); // Deselect task when closing panel
  };

  const openQuickAddModal = (defaultDate?: Date) => {
    setQuickAddModalDate(defaultDate || null);
    setQuickAddModalOpen(true);
  };

  const closeQuickAddModal = () => {
    setQuickAddModalOpen(false);
    setQuickAddModalDate(null);
  };

  const openProjectModal = (project?: Project) => {
    setEditingProject(project || null);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setEditingProject(null);
    setProjectModalOpen(false);
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
    openRightPanel();
  };

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      isRightPanelOpen,
      openRightPanel,
      closeRightPanel,
      isQuickAddModalOpen,
      openQuickAddModal,
      closeQuickAddModal,
      quickAddModalDate,
      isProjectModalOpen,
      openProjectModal,
      closeProjectModal,
      editingProject,
      selectTask,
      selectedTask,
    }),
    [isSidebarOpen, isRightPanelOpen, isQuickAddModalOpen, isProjectModalOpen, editingProject, selectedTask, quickAddModalDate]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
