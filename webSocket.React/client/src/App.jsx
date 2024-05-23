import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { Button, Container, Stack, TextField, Typography } from "@mui/material"

function App() {

  const socket = useMemo(() => io("http://localhost:4000", {
    withCredentials: true
  }), [])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [room, setRoom] = useState("")
  const [roomName, setRoomName] = useState("")
  const [socketId, setSocketId] = useState("")

  useEffect(() => {

    socket.on("connect", () => {
      console.log("connected ", socket.id);
      setSocketId(socket.id)
    })

    socket.on("msg", (m) => {
      console.log("client: ", m);
    })

    socket.on("received-message", (m) => {
      console.log(m);
      setMessages(msg => [...msg, m])
    })

    return () => { socket.disconnect() }
  }, [socket])

  const handelSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", { message, room })
    setMessage("")
  }

  const joinRoomHandeler = (e) => {
    e.preventDefault()
    socket.emit("join-room", roomName)
    setRoomName("")
  }

  return (
    <Container>

      <Typography>
        Welcome to Spcket.io
      </Typography>
      <Typography>
        {socketId}
      </Typography>
      <form onSubmit={joinRoomHandeler}>
        <TextField
          onChange={e => setRoomName(e.target.value)}
          value={roomName}
          label="Room Name"
        />
        <Button
          type='submit'
        >Join Room</Button>
      </form>

      <form onSubmit={handelSubmit}>
        <TextField
          onChange={e => setMessage(e.target.value)}
          value={message}
          label="type message"
        />
        <TextField
          onChange={e => setRoom(e.target.value)}
          value={room}
          label="room"
        />
        <Button
          type='submit'
        >Send</Button>
      </form>

      <Stack>
        {messages?.map((m, i) => (
          <Typography key={i}>
            {m}
          </Typography>
        ))}
      </Stack>

    </Container>
  )
}

export default App