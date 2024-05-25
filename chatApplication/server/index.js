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

    //community specific handling
    //
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

    // Room-specific handling
    let roomName = ""
    let roomUser = ""
    socket.on("join-room", (room) => {
        roomName = room
        socket.join(room);
    });

    socket.on("userJoinedRoom", ({ name, roomName }) => {
        roomUser = name
        socket.to(roomName).emit("userJoinedRoom", name);
    });

    socket.on("roomMessage", ({ name, roomName, text }) => {
        const message = { name, text };
        socket.to(roomName).emit("receivedRoomMessage", message);
    });

    socket.on("userLeftRoom", ({ name, roomName }) => {
        socket.to(roomName).emit("leave", name);
    });

    socket.on("disconnecting", () => {
        // const rooms = Object.keys(socket.rooms).filter(room => room !== socket.id);
        // rooms.forEach((room) => {
        //     socket.to(room).emit("leave", socket.id);
        // });
            socket.to(roomName).emit("roomUserLeft", roomUser);
    });
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
