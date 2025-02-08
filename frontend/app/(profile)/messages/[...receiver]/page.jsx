'use client';
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
    withCredentials: true,
    path: "/socket.io/"
});


const Chat = () => {
    const {receiver} = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("")

    // retrieve the sender id fromt he local storage
    const sender = localStorage.getItem("sender")

    // Fetch previous messages when the component mounts
    useEffect(() => {
        socket.emit('openConversation', {sender, receiver: receiver[0]})

        socket.on('loadMessages', (messagesFromDb) => {
            if (messagesFromDb.error) {
                setError(messagesFromDb.error)
            } else if (messagesFromDb.messages) {
                setMessages(messagesFromDb.messages);
            }
        });

        // Receive message is triggered when the sender sends the message to server after it stored the message on server then only it return the same message to the client then it display on the sender screen
        socket.on('receiveMessage', (newMessage) => {
            console.log("Message is received: ", newMessage);
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
                receiver: receiver[0],           // just for testing purpose later we will implement it dynamically
                content: message
            }
            socket.emit('sendMessage', messageData);
            setMessage(''); // Clear input after sending
        }
    };

    return (
        <div className="w-full max-w-7xl h-[88vh] mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Chat with User {receiver[1]}</h1>
            <div className={'h-full flex flex-col justify-between py-10'}>
                {messages &&
                    <div className="space-y-4 mb-4 overflow-y-auto">
                        {messages.map((msg) => (
                            <div key={msg._id || msg.content} className={`${msg.sender === sender ? 'text-end' : ''}`}
                                 style={{padding: '5px', borderBottom: '1px solid #ccc'}}>
                                {msg.content}
                            </div>
                        ))}
                    </div>}

                {(error && messages) && <div>Start chating</div>}

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