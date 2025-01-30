import React from 'react';
import MessagesPage from './Message';

const Page = () => {
  const conversations = [
    {
      senderName: 'John Doe',
      senderAvatar: '/john-avatar.png',
      lastMessage: 'Hi, I’m interested in your job posting!',
      timeAgo: '2 hours ago',
    },
    {
      senderName: 'Jane Smith',
      senderAvatar: '/jane-avatar.png',
      lastMessage: 'Can we discuss the salary?',
      timeAgo: '1 day ago',
    },
    {
      senderName: 'Recruiter X',
      lastMessage: 'Your application has been approved!',
      timeAgo: '3 days ago',
    },
  ];

  return <MessagesPage conversations={conversations} />;
};

export default Page;
