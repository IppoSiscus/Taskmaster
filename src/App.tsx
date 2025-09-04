import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import FloatingActionButton from './components/FloatingActionButton';
import { AppContext } from './contexts/AppContext';
import Modal from './components/Modal';
import QuickAddTaskForm from './components/QuickAddTaskForm';
import ProjectModal from './components/ProjectModal';

function App() {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { isRightPanelOpen, isSidebarOpen, toggleSidebar, isQuickAddModalOpen, toggleQuickAddModal } = context;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MainContent />
      </div>
      {isRightPanelOpen && <RightPanel />}
      <FloatingActionButton />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Modal
        isOpen={isQuickAddModalOpen}
        onClose={toggleQuickAddModal}
        title="Quick Add Task"
      >
        <QuickAddTaskForm />
      </Modal>
      <ProjectModal />
    </div>
  );
}

export default App;
