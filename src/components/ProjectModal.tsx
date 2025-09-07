import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ProjectContext } from '../contexts/ProjectContext';
import Modal from './Modal';
import ColorPicker from './ColorPicker';

const ProjectModal: React.FC = () => {
  const appContext = useContext(AppContext);
  const projectContext = useContext(ProjectContext);
  if (!appContext || !projectContext) return null;

  const { isProjectModalOpen, closeProjectModal, editingProject } = appContext;
  const { addProject, updateProject } = projectContext;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6'); // Default to blue

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setDescription(editingProject.description);
      setColor(editingProject.color);
    } else {
      // Reset form when opening for a new project
      setName('');
      setDescription('');
      setColor('#3b82f6');
    }
  }, [editingProject, isProjectModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; // Basic validation

    const projectData = { name, description, color };
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    closeProjectModal();
  };

  return (
    <Modal
      isOpen={isProjectModalOpen}
      onClose={closeProjectModal}
      title={editingProject ? 'Edit Project' : 'Create New Project'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium mb-1">Project Name</label>
          <input
            id="projectName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="projectDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            rows={3}
          />
        </div>
        <ColorPicker selectedColor={color} onChange={setColor} />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700"
        >
          {editingProject ? 'Save Changes' : 'Create Project'}
        </button>
      </form>
    </Modal>
  );
};

export default ProjectModal;
