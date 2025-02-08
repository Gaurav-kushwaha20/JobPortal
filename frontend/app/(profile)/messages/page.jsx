"use client"
import React, { useEffect, useState } from 'react';
import { getConversation } from "../../api/ChatAPI"
import Link from "next/link";

const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
const imageUrl = "http://localhost:5000/";
const Page = () => {
  const [conversations, setConversations] = useState([])


  useEffect(() => {
    const user = localStorage.getItem("sender")
    getConversation(user,backend)
      .then(response => setConversations(response))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h1>

      {/* Conversation List */}
      <div className="bg-white shadow-md rounded-lg">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            // redirecting to the specific user chat
            <Link href={`/messages/${conversation._id}/${conversation.username}`} key={index}>
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                {/* Sender Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={`${imageUrl.concat(conversation.profile_picture)}` || '/messages/default.png'}
                    alt={`${conversation.senderName}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{conversation.username}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <p className="text-sm text-gray-400">
                  {conversation.timeAgo || 'Just now'}
                </p>
              </div>
            </Link>
          ))
        )
          :
          // If there is no any message related to this user
          (
            <p className="text-center text-gray-500 py-6">No messages yet</p>
          )}
      </div>
    </div>
  );
};

export default Page;