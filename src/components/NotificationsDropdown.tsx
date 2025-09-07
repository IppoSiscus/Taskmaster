import React from 'react';

const mockNotifications = [
  { id: 1, text: 'Laura Bianchi commented on "Set up component library".' },
  { id: 2, text: 'You were assigned to "Write homepage copy".' },
  { id: 3, text: '"Design initial mockups" is due tomorrow.' },
];

const NotificationsDropdown: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-md shadow-lg z-20 border dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-bold">Notifications</h3>
      </div>
      <div className="flex flex-col">
        {mockNotifications.map(notification => (
          <div key={notification.id} className="p-4 text-sm border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            {notification.text}
          </div>
        ))}
        {mockNotifications.length === 0 && (
          <p className="p-4 text-sm text-gray-500">No new notifications.</p>
        )}
      </div>
      <div className="p-2 text-center">
          <button className="text-sm text-primary hover:underline">Mark all as read</button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
