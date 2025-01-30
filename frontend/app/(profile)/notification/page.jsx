'use client';
import React from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

const NotificationsPage = () => {
  const notifications = [
    {
      icon: <FaBell size={24} className="text-blue-500" />,
      title: 'New Job Posted!',
      message: 'A new job has been posted for Software Engineer.',
      timeAgo: '1 hour ago',
      unread: true,
    },
    {
      icon: <FaCheckCircle size={24} className="text-green-500" />,
      title: 'Application Approved',
      message: 'Your application for Frontend Developer has been approved.',
      timeAgo: '1 day ago',
      unread: false,
    },
    {
      icon: <div className="w-6 h-6 bg-gray-500 rounded-full" />,
      title: 'Account Verified',
      message: 'Your email has been successfully verified.',
      timeAgo: '3 days ago',
      unread: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h1>

      {/* Notification List */}
      <div className="bg-white shadow-md rounded-lg">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 px-4 py-3 border-b border-gray-200 ${
                notification.unread ? 'bg-gray-50' : ''
              } hover:bg-gray-100 cursor-pointer`}
            >
              {/* Notification Icon */}
              <div>{notification.icon}</div>

              {/* Notification Content */}
              <div>
                <p className="text-gray-800 font-medium">{notification.title}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.timeAgo || 'Just now'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No notifications available</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
