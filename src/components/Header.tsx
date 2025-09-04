import React, { useContext } from 'react';
import { Moon, Sun, PanelRight, Menu } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const appContext = useContext(AppContext);

  if (!themeContext || !appContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;
  const { toggleRightPanel, toggleSidebar } = appContext;

  return (
    <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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
        <button onClick={toggleRightPanel}>
          <PanelRight size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
