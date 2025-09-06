import React, { createContext, useState, useMemo } from 'react';
import { Project, User, Phase } from './ProjectContext';

// --- TYPE DEFINITIONS ---
export type Priority = 'High' | 'Medium' | 'Low' | null;
export type TaskStatus = 'Todo' | 'In Progress' | 'In Review' | 'Done';

export interface Recurrence {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  pattern: any; // This can be complex, so using 'any' for now
  nextDueDate: Date;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: Project['id'];
  phaseId: Phase['id'];
  assigneeId: User['id'] | null;
  createdBy: User['id'];
  dueDate: Date | null;
  priority: Priority;
  status: TaskStatus;
  tags: Tag[];
  recurrence: Recurrence | null;
  parentTaskId: string | null;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt: Date;
  modifiedAt: Date;
  order: number;
}

type NewTaskData = {
    title: string;
    projectId: Project['id'];
    phaseId: Phase['id'];
    parentTaskId?: string | null;
}

export type UpdateTaskData = Partial<Omit<Task, 'id' | 'createdAt' | 'modifiedAt' | 'createdBy'>>;

interface TaskContextType {
  tasks: Task[];
  tags: Tag[];
  getTasksByProjectId: (projectId: string) => Task[];
  addTask: (taskData: NewTaskData) => void;
  updateTask: (taskId: string, taskData: UpdateTaskData) => void;
  toggleTaskCompletion: (taskId: string) => void;
  moveTask: (taskId: string, newPhaseId: string, newOrder: number) => void;
  reorderTasks: (reorderedTasks: Task[], phaseId: string) => void;
}

// --- MOCK DATA ---
const mockTags: Tag[] = [
  { id: 'tag-1', name: 'UI' },
  { id: 'tag-2', name: 'Bug' },
  { id: 'tag-3', name: 'Feature' },
];

const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design initial mockups',
    description: 'Create wireframes and mockups in Figma.',
    projectId: 'proj-1',
    phaseId: 'phase-1-1',
    assigneeId: '2',
    createdBy: '1',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    priority: 'High',
    status: 'In Progress',
    tags: [mockTags[0], mockTags[2]],
    recurrence: null,
    parentTaskId: null,
    isCompleted: false,
    completedAt: null,
    createdAt: new Date(),
    modifiedAt: new Date(),
    order: 0,
  },
  {
    id: 'task-2',
    title: 'Set up component library',
    description: 'Install Storybook and create base components.',
    projectId: 'proj-1',
    phaseId: 'phase-1-3',
    assigneeId: '1',
    createdBy: '1',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    priority: 'High',
    status: 'Todo',
    tags: [mockTags[0]],
    recurrence: null,
    parentTaskId: null,
    isCompleted: false,
    completedAt: null,
    createdAt: new Date(),
    modifiedAt: new Date(),
    order: 0,
  },
  {
    id: 'task-3',
    title: 'Write homepage copy',
    description: 'Draft the copy for the new marketing website homepage.',
    projectId: 'proj-2',
    phaseId: 'phase-2-1',
    assigneeId: '3',
    createdBy: '1',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: 'Medium',
    status: 'Todo',
    tags: [],
    recurrence: null,
    parentTaskId: null,
    isCompleted: false,
    completedAt: null,
    createdAt: new Date(),
    modifiedAt: new Date(),
    order: 0,
  },
];


// --- CONTEXT & PROVIDER ---
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [tags, setTags] = useState<Tag[]>(mockTags);

  const getTasksByProjectId = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const addTask = (taskData: NewTaskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      description: '',
      projectId: taskData.projectId,
      phaseId: taskData.phaseId,
      assigneeId: null, // No assignee by default
      createdBy: '1', // Hardcoded current user
      dueDate: null,
      priority: null,
      status: 'Todo',
      tags: [],
      recurrence: null,
      parentTaskId: taskData.parentTaskId || null,
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
      order: Date.now(), // Use timestamp for simple initial order
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, taskData: UpdateTaskData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, ...taskData, modifiedAt: new Date() }
          : task
      )
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const isCompleted = !task.isCompleted;
          return {
            ...task,
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
          };
        }
        return task;
      })
    );
  };

  const moveTask = (taskId: string, newPhaseId: string, newOrder: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, phaseId: newPhaseId, order: newOrder }
          : task
      )
    );
  };

  const reorderTasks = (reorderedTasks: Task[], phaseId: string) => {
    const reorderedWithOrder = reorderedTasks.map((task, index) => ({ ...task, order: index }));
    setTasks(prev => {
        const otherTasks = prev.filter(task => task.phaseId !== phaseId);
        return [...otherTasks, ...reorderedWithOrder];
    });
  };

  const value = useMemo(() => ({
    tasks,
    tags,
    getTasksByProjectId,
    addTask,
    updateTask,
    toggleTaskCompletion,
    moveTask,
    reorderTasks,
  }), [tasks, tags]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
