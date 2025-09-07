import React, { useContext, useState } from 'react';
import { Task, TaskContext } from '../contexts/TaskContext';
import { ProjectContext } from '../contexts/ProjectContext';

interface CommentListProps {
  task: Task;
}

const CommentList: React.FC<CommentListProps> = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const projectContext = useContext(ProjectContext);
  const [newComment, setNewComment] = useState('');

  if (!taskContext || !projectContext) return null;

  const { addComment } = taskContext;
  const { users } = projectContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(task.id, newComment);
    setNewComment('');
  };

  return (
    <div className="flex flex-col gap-4">
      {task.comments.map(comment => {
        const author = users.find(u => u.id === comment.authorId);
        return (
          <div key={comment.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {author?.avatar || '??'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{author?.name || 'Unknown User'}</span>
                <span className="text-xs text-gray-500">{comment.createdAt.toLocaleString()}</span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        );
      })}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={2}
        />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md text-sm">Send</button>
      </form>
    </div>
  );
};

export default CommentList;
