import React, { useContext } from 'react';
import { Plus } from 'lucide-react';
import { AppContext } from '../contexts/AppContext';

const FloatingActionButton: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { toggleQuickAddModal } = appContext;

  return (
    <button
      onClick={toggleQuickAddModal}
      className="fixed bottom-8 right-8 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-30"
    >
      <Plus size={28} />
    </button>
  );
};

export default FloatingActionButton;
