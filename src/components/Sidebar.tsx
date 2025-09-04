import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Folder, Tag, Calendar } from 'lucide-react';
import { AppContext } from '../contexts/AppContext';

const navItems = [
  { to: '/', text: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { to: '/tasks', text: 'I Miei Task', icon: <CheckSquare size={20} /> },
  { to: '/projects', text: 'Progetti', icon: <Folder size={20} /> },
  { to: '/tags', text: 'Tags', icon: <Tag size={20} /> },
  { to: '/calendar', text: 'Calendario', icon: <Calendar size={20} /> },
];

const Sidebar: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;
  const { isSidebarOpen } = appContext;

  const baseLinkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  const activeLinkClasses = "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50";

  const sidebarClasses = `
    w-[300px] bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-4
    fixed top-0 left-0 h-full z-20
    md:static md:translate-x-0
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      <h1 className="text-2xl font-bold px-3">Taskmaster</h1>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`
            }
          >
            {item.icon}
            {item.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
