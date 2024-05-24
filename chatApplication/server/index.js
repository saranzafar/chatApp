import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { URL } from "./config.js";

const port = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {

    //community
    let userName = null;
    socket.on("userJoined", (name) => {
        userName = name;
        io.emit("userJoined", name);
    });
    socket.on("message", (message) => {
        io.emit("message", message);
    });
    socket.on("disconnect", () => {
        io.emit("leave", userName)
    });

    //room
    let roomUserName = null;

    socket.on("join-room", (room) => {
        socket.join(room)
    })

    socket.on("userJoinedRoom", (name) => {
        console.log(name, " Joined");
        roomUserName = name;
        io.emit("userJoined", name);
    });

    socket.on("roomMessage", ({ message, roomName }) => {
        console.log(message, roomName);
        socket.to(roomName).emit("receivedRoomMessage", message)
    })

});

app.get("/", (req, res) => {
    res.send("Hello world");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
