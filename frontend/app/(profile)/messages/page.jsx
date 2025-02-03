import React from 'react';
import MessagesPage from './Message';

const Page = () => {
  const conversations = [
    {
      _id: 1,
      senderName: 'John Doe',
      senderAvatar: '/messages/default.png',
      lastMessage: 'Hi, I’m interested in your job posting!',
      timeAgo: '2 hours ago',
    },
    {
      _id: 2,
      senderName: 'Jane Smith',
      senderAvatar: '/messages/default.png',
      lastMessage: 'Can we discuss the salary?',
      timeAgo: '1 day ago',
    },
    {
      _id: 3,
      senderName: 'Recruiter X',
      lastMessage: 'Your application has been approved!',
      timeAgo: '3 days ago',
    },
  ];

  return <MessagesPage conversations={conversations} />;
};

export default Page;