import React from 'react';
import { Button } from "../components/index";

function Room() {
    return (

        <div className="flex-1 overflow-y-auto pt-16 pb-24">
            <div className=" flex flex-col h-screen p-6 overflow-x-hidden">
                <small className='w-full text-center text-secondary-500 mb-4'>
                    End-to-end encryption ensures your messages are secure.
                </small>
                <small className='w-full text-center text-secondary-500 mb-4'>
                    Room Name
                </small>
                <div className="space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-md max-w-sm">
                            Hello from the left side!
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-md max-w-sm">
                            Hi there! This is a message from the right side.
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-md max-w-sm">
                            How are you today?
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-md max-w-sm">
                            I'm good, thanks! How about you?
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-secondary-500 p-3 rounded-md max-w-sm">
                            New User Join The Chat
                        </div>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 flex justify-center">
                <div className="flex space-x-2 w-2/4 min-w-64">
                    <input
                        className="flex-1 h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Type a message"
                    />
                    <button
                        className="w-1/5 h-10 bg-blue-500 text-white rounded-md flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Room;
