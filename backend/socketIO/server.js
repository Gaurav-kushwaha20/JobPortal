const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const Message = require("../models/Message");
const Conversation = require("../models/Conversation") 
    
    
    
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
    path: "/socket.io/"
});

io.on("connection", (socket) => {
    console.log("new client connected ", socket.id);

    socket.on("sendMessage", async (messageContent) => {
        console.log(messageContent);
        // first check if the conversation between these two user exist or not
        let conversation  = await Conversation.findOne({
            members: {$all:  [messageContent.sender, messageContent.receiver] }
        })

        // // create new conversation if not exists
        if (!conversation) {
            conversation = new Conversation({
                members: [messageContent.sender, messageContent.receiver],
                messages: [],
                lastMessage: null
            });
            await conversation.save();
        }
        

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: messageContent.sender,
            receiver: messageContent.receiver,
            content: messageContent.content,
        })
        await newMessage.save();
        
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;
        await conversation.save();

        // Broadcast the message to the clients
        io.emit("receiveMessage", messageContent);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = {app, io, server};