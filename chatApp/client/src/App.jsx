import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { Button, Container, TextField, Typography } from "@mui/material"

function App() {

  const socket = useMemo(() => io("http://localhost:4000"), [])
  const [message, setMessage] = useState("")

  useEffect(() => {

    socket.on("connect", () => {
      console.log("connected ", socket.id);
    })

    socket.on("msg", (m) => {
      console.log("client: ", m);
    })

    socket.on("received-message", (m) => {
      console.log(m);
    })

    return () => { socket.disconnect() }
  }, [])

  const handelSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", message)
    setMessage("")
  }
  return (
    <Container>
      <Typography>
        Welcome to Spcket.io
      </Typography>
      <form onSubmit={handelSubmit}>
        <TextField
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <Button
          type='submit'
        >Send</Button>
      </form>
    </Container>
  )
}

export default App