import React, { useEffect, useState, useCallback, useRef } from 'react';
import { io } from "socket.io-client";
import { URL } from "../config.js";

function Community() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNameSet, setIsNameSet] = useState(false);

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const socket = io(URL, { withCredentials: true });
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Connected: ", socket.id);
        });

        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on("userJoined", (userName) => {
            setMessages((prevMessages) => [...prevMessages, { system: true, text: `${userName} has joined the chat` }]);
        });

        socket.on("leave", (userName) => {
            setMessages((prevMessages) => [...prevMessages, { system: true, text: `${userName}: Left` }]);
        });

        return () => {
            if (isNameSet) {
                socket.emit("userLeft", name);
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
            socketRef.current.emit("message", { name, text: message });
            setMessage("");
        }
    }, [message, name]);

    const handleNameSubmit = () => {
        if (name.trim()) {
            setIsNameSet(true);
            if (socketRef.current) {
                socketRef.current.emit("userJoined", name);
            }
        }
    };

    return (
        <div className="bubble-pattren flex-1 overflow-y-auto text-secondary-700">
            {!isNameSet ? (
                <div className="flex flex-col items-center justify-center h-full mt-20">
                    <input
                        className="h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
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
                    <small className='w-full text-center text-yellow-400 mb-4'>
                        End-to-end encryption ensures your messages are secure
                    </small>
                    <small className='w-full text-center text-secondary-500 mb-4 work-sans-notification'>
                        Be Polite in Community Chat
                    </small>
                    <div className="space-y-4 mb-20">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.name === name ? 'justify-end' : 'justify-start'}`}>
                                <div className={`shadow-lg ${msg.name === name ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-3 rounded-md max-w-sm`}>
                                    {msg.system ? msg.text : `${msg.name}: ${msg.text}`}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full py-4 bg-white border-t border-gray-300 flex justify-center">
                        <form className="flex space-x-2 w-2/4 min-w-64 " onSubmit={handleSendMessage}>
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
    );
}

export default Community;
