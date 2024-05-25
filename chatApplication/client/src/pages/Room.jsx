import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io } from "socket.io-client";
import { URL } from '../config';

function Room() {
    const [roomName, setRoomName] = useState("");
    const [roomNameValidate, setRoomNameValidate] = useState(false);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNameSet, setIsNameSet] = useState(false);

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const socket = io(URL, { withCredentials: true });
        socketRef.current = socket;

        socket.on("connect");

        socket.on("receivedRoomMessage", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on("userJoinedRoom", (userName) => {
            setMessages((prevMessages) => [...prevMessages, { system: true, text: `${userName} has joined the chat` }]);
        });

        socket.on("roomUserLeft", (userName) => {
            setMessages((prevMessages) => [...prevMessages, { system: true, text: `${userName} has left the chat` }]);
        });

        return () => {
            if (isNameSet) {
                socket.emit("userLeftRoom", { name, roomName });
            }
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = useCallback((event) => {
        event.preventDefault();
        if (message.trim() && socketRef.current) {
            socketRef.current.emit("roomMessage", { name, roomName, text: message });
            setMessages((prevMessages) => [...prevMessages, { name, text: message }]); // Add the message to local state
            setMessage("");
        }
    }, [message, name, roomName]);

    const handleNameSubmit = () => {
        if (name.trim()) {
            setIsNameSet(true);
            if (socketRef.current) {
                socketRef.current.emit("userJoinedRoom", { name, roomName });
            }
        }
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        setRoomNameValidate(true);
        socketRef.current.emit("join-room", roomName);
    };

    return (
        <div className='bubble-pattren'>
            {roomNameValidate ? (
                <div className="flex-1 overflow-y-auto text-secondary-700">
                    {!isNameSet ? (
                        <div className="flex flex-col items-center justify-center h-full mt-20">
                            <p className='text-secondary-500 mb-7'>You are just 1 step away from chatting. Enter your name for further processing</p>
                            <input
                                className="h-10 rounded-md border border-secondary-500 bg-transparent px-3 py-2 text-sm placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-300 focus:ring-offset-1"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button
                                className="mt-4 h-10 bg-blue-500 text-white rounded-md px-4"
                                onClick={handleNameSubmit}
                            >
                                Join Chat
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col h-screen p-6 overflow-x-hidden">
                            <small className='w-full text-center text-secondary-300 mb-4 work-sans-notification'>
                                End-to-end encryption ensures your messages are secure
                            </small>
                            <small className='w-full text-center text-secondary-400 mb-4 work-sans-notification'>
                                Be Polite in Community Chat
                            </small>
                            <div className="space-y-4 mb-20 varela-regular">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.name === name ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`${msg.name === name ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-3 rounded-md max-w-sm shadow-lg`}>
                                            {msg.system ? msg.text : `${msg.name}: ${msg.text}`}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full py-4 bg-white border-t border-gray-300 flex justify-center">
                                <form className="flex space-x-2 w-2/4 min-w-64" onSubmit={handleSendMessage}>
                                    <input
                                        className="flex-1 h-10 rounded-md border border-secondary-500 bg-transparent px-3 py-2 text-sm placeholder-secondary-600 focus:outline-none focus:ring-1 focus:ring-secondary-300 focus:ring-offset-1"
                                        type="text"
                                        placeholder="Type a message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="w-1/5 h-10 bg-blue-500 text-white rounded-md flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <section className='w-full h-auto bg-primary-50 text-white flex justify-center flex-col items-center gap-5 mt-24'>
                    <div className='flex items-center space-x-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        <h1 className='font-bold text-2xl text-secondary-700'>
                            Create or Join Room
                        </h1>
                    </div>
                    <p className='text-secondary-500'>Create or Join room by entering its name, Keep room name unique, short and easy.</p>
                    <form
                        onSubmit={handleFormSubmission}
                        className='flex justify-center flex-col items-center gap-5 w-full mt-5'
                    >
                        <input
                            type="text"
                            placeholder='Enter Room Name'
                            onChange={(e) => setRoomName(e.target.value)}
                            value={roomName}
                            required
                            className='border border-primary-700 p-2 rounded-lg w-1/3 min-w-64 text-secondary-500'
                        />

                        <button
                            type='submit'
                            className='text-secondary-500 border border-secondary-500 hover:bg-secondary-100 px-8 py-1 rounded-lg'
                        >
                            Send
                        </button>
                    </form>
                </section>
            )}
        </div>
    );
}

export default Room;
