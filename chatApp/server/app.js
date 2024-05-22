import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"


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

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("hellow world");
})

io.on("connection", (socket) => {
    console.log("User Connected with id ", socket.id);
    // socket.emit("msg",`this is msg with id: ${socket.id}`)
    socket.broadcast.emit("msg", `${socket.id} Joined the Chat`)

    socket.on("disconnect", (m) => {
        console.log("User Disconnect: ", m);
    })

    socket.on("message", (m) => {
        // console.log("Server: ", m);
        io.emit("received-message",m)
    })
})


server.listen(port, () => {
    console.log(`Server is listening on Post ${port}`);
    console.log(`http://localhost:${port}`);
})