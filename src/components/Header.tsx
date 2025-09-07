import React, { useContext, useState } from 'react';
import { Moon, Sun, PanelRight, Menu, Bell } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AppContext } from '../contexts/AppContext';
import NotificationsDropdown from './NotificationsDropdown';

const Header: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const appContext = useContext(AppContext);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (!themeContext || !appContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;
  const { openRightPanel, toggleSidebar } = appContext; // Changed to openRightPanel

  return (
    <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="relative">
            <button onClick={() => setNotificationsOpen(prev => !prev)}>
                <Bell size={20} />
            </button>
            {notificationsOpen && <NotificationsDropdown />}
        </div>
        <button onClick={openRightPanel}>
          <PanelRight size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
