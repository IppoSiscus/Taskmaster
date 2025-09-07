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

export interface Comment {
    id: string;
    authorId: User['id'];
    content: string;
    createdAt: Date;
}

export interface Attachment {
    id: string;
    fileName: string;
    url: string;
    type: 'image' | 'file';
    size: number; // in bytes
    uploadedAt: Date;
}

export interface ActivityLogEntry {
    id: string;
    authorId: User['id'];
    action: string;
    timestamp: Date;
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
  comments: Comment[];
  attachments: Attachment[];
  activityLog: ActivityLogEntry[];
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
  addComment: (taskId: string, commentText: string) => void;
  deleteTask: (taskId: string) => void;
  duplicateTask: (taskId: string) => void;
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
    comments: [
        { id: 'comment-1', authorId: '1', content: 'What do you think about using a gradient for the main button?', createdAt: new Date() }
    ],
    attachments: [
        { id: 'att-1', fileName: 'mockup-v1.png', url: '#', type: 'image', size: 1024 * 150, uploadedAt: new Date() }
    ],
    activityLog: [
        { id: 'log-1', authorId: '1', action: 'created this task.', timestamp: new Date() },
        { id: 'log-2', authorId: '2', action: 'changed the due date.', timestamp: new Date() }
    ],
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
    comments: [],
    attachments: [],
    activityLog: [],
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
    comments: [],
    attachments: [],
    activityLog: [],
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
      comments: [],
      attachments: [],
      activityLog: [{ id: 'log-new-1', authorId: '1', action: 'created this task.', timestamp: new Date() }],
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, taskData: UpdateTaskData) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const newLogEntry: ActivityLogEntry = {
            id: `log-${Date.now()}`,
            authorId: '1', // Hardcoded current user
            action: `updated the task.`, // Simplified message
            timestamp: new Date(),
          };
          return {
            ...task,
            ...taskData,
            modifiedAt: new Date(),
            activityLog: [...task.activityLog, newLogEntry],
          };
        }
        return task;
      })
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

  const addComment = (taskId: string, commentText: string) => {
    setTasks(prev => prev.map(task => {
        if (task.id === taskId) {
            const newComment: Comment = {
                id: `comment-${Date.now()}`,
                authorId: '1', // Hardcoded current user
                content: commentText,
                createdAt: new Date(),
            };
            return { ...task, comments: [...task.comments, newComment] };
        }
        return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId && task.parentTaskId !== taskId)); // Also remove subtasks
  };

  const duplicateTask = (taskId: string) => {
    const taskToDuplicate = tasks.find(task => task.id === taskId);
    if (!taskToDuplicate) return;
    const newTask: Task = {
        ...taskToDuplicate,
        id: `task-${Date.now()}`,
        title: `${taskToDuplicate.title} (Copy)`,
        createdAt: new Date(),
        modifiedAt: new Date(),
        order: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
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
    addComment,
    deleteTask,
    duplicateTask,
  }), [tasks, tags]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
