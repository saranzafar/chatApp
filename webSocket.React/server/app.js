import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"


const port = 4000
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})
const secretKeyJwt = "othimeinmaioenogn"

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("hellow world");
})

app.get("/login", (req, res) => {
    console.log("inside login");
    const token = jwt.sign({ _id: "trhimwimj" }, secretKeyJwt)
    res
        .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .json({
            message: "Login successfully"
        })
})

// middleware 
io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, (err) => {
        if (err) return next(err)

        const token = socket.request.cookies.token
        if (!token) return next(new Error("Authentication Error"))

        const decoded = jwt.verify((token, secretKeyJwt))
        next()
    });
});

io.on("connection", (socket) => {
    console.log("User Connected with id ", socket.id);
    // socket.emit("msg",`this is msg with id: ${socket.id}`)
    socket.broadcast.emit("msg", `${socket.id} Joined the Chat`)

    socket.on("disconnect", (m) => {
        console.log("User Disconnect: ", m);
    })

    socket.on("message", ({ message, room }) => {
        console.log(message, room);
        // io.emit("received-message",m)
        // socket.broadcast.emit("received-message",m)
        socket.to(room).emit("received-message", message)
    })

    socket.on("join-room", (room) => {
        socket.join(room)
    })
})


server.listen(port, () => {
    console.log(`Server is listening on Post ${port}`);
    console.log(`http://localhost:${port}`);
})