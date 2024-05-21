const express = require("express")
const http = require("http")
const path = require("path")
const { Server } = require('socket.io');

const app = express()
const server = http.createServer(app)
const io = new Server(server)

//socket io
io.on("connection", (socket) => { //socket = client
    console.log("A new user connected with id ", socket.id);
    socket.on("user-message", (message) => {
        // console.log("New message received: ", message);
        io.emit("user-message", message);
        // socket.broadcast.emit("user message 2 ", message);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
    
})

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.sendFile("./public/index.html")
})

server.listen(3000, () => console.log(`Server is running on port 300`))