const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const Message = require("../models/Message");
const Conversation = require("../models/Conversation")


const app = express();
const server = http.createServer(app);


// combine http server and websocket. our server can listen both http request and websocket request
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
    path: "/socket.io/"
});

io.on("connection", (socket) => {
    // console.log("new client connected ", socket.id);

    // load the message
    socket.on("openConversation", async (users) => {
        try {
            const conversation = await Conversation.findOne({members: {$all: [users.sender, users.receiver]}})
                .populate("messages", "content sender")

            if (!conversation) {
                console.log("no messages found");
                socket.emit("loadMessages", { error: "Start a conversation!" });
            } else {
                socket.join(conversation._id.toString());
                socket.emit("loadMessages", conversation);
            }
        } catch (e) {
            socket.emit("loadMessages", "Error while loading the conversation.");
        }


    })


    socket.on("sendMessage", async (messageContent) => {
            try {
                // first check if the conversation between these two user exist or not
                let conversation = await Conversation.findOne({
                    members: {$all: [messageContent.sender, messageContent.receiver]}
                })

                // create new conversation if not exists
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


                // Ensure sender joins the room
                socket.join(conversation._id.toString());

                // Broadcast the message to the clients
                io.to(conversation._id.toString()).emit("receiveMessage", newMessage);
                
                // socket.emit("receiveMessage", messageContent);
            } catch (e) {
                console.log(e);
                // socket.emit("receiveMessage", "error while loading the recent conversation");
            }

        }
    )
    ;

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = {app, io, server};