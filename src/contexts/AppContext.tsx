import React, { createContext, useState, useMemo } from 'react';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isRightPanelOpen: boolean;
  toggleRightPanel: () => void;
  isQuickAddModalOpen: boolean;
  toggleQuickAddModal: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);
  const [isQuickAddModalOpen, setQuickAddModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleRightPanel = () => setRightPanelOpen((prev) => !prev);
  const toggleQuickAddModal = () => setQuickAddModalOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      isRightPanelOpen,
      toggleRightPanel,
      isQuickAddModalOpen,
      toggleQuickAddModal,
    }),
    [isSidebarOpen, isRightPanelOpen, isQuickAddModalOpen]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
