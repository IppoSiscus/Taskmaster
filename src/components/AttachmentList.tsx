import React, { useContext } from 'react';
import { Task } from '../contexts/TaskContext';
import { Paperclip, File, Image as ImageIcon, Download } from 'lucide-react';

interface AttachmentListProps {
  task: Task;
}

const AttachmentList: React.FC<AttachmentListProps> = ({ task }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Drag & drop files here</p>
        <p className="text-xs text-gray-500">or click to upload (simulated)</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Attachments</h3>
        {task.attachments.map(att => (
          <div key={att.id} className="flex items-center gap-3 p-2 rounded-md bg-gray-100 dark:bg-gray-700">
            <div className="flex-shrink-0">
              {att.type === 'image' ? <ImageIcon className="h-6 w-6 text-gray-500" /> : <File className="h-6 w-6 text-gray-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{att.fileName}</p>
              <p className="text-xs text-gray-500">{(att.size / 1024).toFixed(1)} KB</p>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
              <Download size={18} />
            </button>
          </div>
        ))}
        {task.attachments.length === 0 && (
            <p className="text-sm text-gray-500">No attachments yet.</p>
        )}
      </div>
    </div>
  );
};

export default AttachmentList;
