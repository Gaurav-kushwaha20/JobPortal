'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
    withCredentials: true,
    path: "/socket.io/"
});




const Chat = () => {
    const { slug } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // retrieve the sender id fromt he local storage
    const sender = localStorage.getItem("sender")

    // Fetch previous messages when the component mounts
    useEffect(() => {
        socket.on('loadMessages', (messagesFromDb) => {
            setMessages(messagesFromDb);
        });

        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('loadMessages');
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            // construct the message data with the senderID and receiverID
            const messageData = {
                
                sender: sender,
                receiver: "675ab5feaf701037b4c00ce8",           // just for testing pupose later we will implement it dynamically
                content: message
            }

            socket.emit('sendMessage', messageData);
            setMessage(''); // Clear input after sending
        }
    };

    return (
        <div className="w-full max-w-7xl h-[88vh] mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Chat with User {slug}</h1>
            <div className={'h-full flex flex-col justify-between py-10'}>
                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg._id || msg.content} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
                            {msg.content}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Type a message"
                    />
                    <button
                        onClick={sendMessage}
                        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;