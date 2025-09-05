import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppProvider } from './contexts/AppContext'

import Dashboard from './pages/Dashboard'
import MyTasks from './pages/MyTasks'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Tags from './pages/Tags'
import Calendar from './pages/Calendar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'tasks', element: <MyTasks /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectDetail /> },
      { path: 'tags', element: <Tags /> },
      { path: 'calendar', element: <Calendar /> },
    ],
  },
]);

import { ProjectProvider } from './contexts/ProjectContext'
import { TaskProvider } from './contexts/TaskContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <ProjectProvider>
          <TaskProvider>
            <RouterProvider router={router} />
          </TaskProvider>
        </ProjectProvider>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
