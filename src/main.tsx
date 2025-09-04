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
      { path: 'tags', element: <Tags /> },
      { path: 'calendar', element: <Calendar /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
