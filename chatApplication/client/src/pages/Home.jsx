import React from 'react';
import { Button } from "../components/index";
import { Footer } from "./index";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <div className='w-full h-auto bg-primary-50 text-white flex justify-center flex-col items-center gap-5 mt-16'>
                <div className='flex items-center space-x-2 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-11">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <h1 className='font-bold text-5xl text-secondary-700 work-sans-heading'>
                        Talkie
                    </h1>
                </div>
                <p className='w-2/3 min-w-72 text-center text-secondary-500'>
                    Connect with everyone or create private rooms for personalized conversations.
                </p>
                <Button value={"Community Chat"} to='community' />
                <Button value={"Personal Chat"} to='Room' />

                <div className='flex justify-start flex-col w-3/5 min-w-72'>
                    <h2 className='font-bold text-2xl text-secondary-700 mt-10 text-center work-sans-heading'>Docs</h2>
                    <h3 className='font-bold text-xl text-secondary-700 mt-3 work-sans-heading'>1. Overview</h3>
                    <p className='text-secondary-500 pl-4'>
                        Talkie is a dynamic chat application designed with React and Express, offering users two versatile options for communication: Community Chat and Personal Chat Rooms. This documentation provides a comprehensive guide to using Talkie effectively.
                    </p>

                    <h3 className='font-bold text-xl text-secondary-700 mt-6 work-sans-heading'>2. Features</h3>

                    <h4 className='font-bold text-lg text-secondary-700 mt-4 work-sans-heading pl-4'>2.1. Community Chat</h4>
                    <p className='text-secondary-500 pl-4'>Description: Engage in open conversations with all online users within the community.</p>
                    <h5 className='font-bold text-md text-secondary-700 mt-2 work-sans-heading pl-8'>How to Use:</h5>
                    <ol className='list-decimal list-inside text-secondary-500 pl-8'>
                        <li>Click on the <q>Community</q> button on the home page.</li>
                        <li>Enter your name in the prompt that appears.</li>
                        <li>Start chatting with everyone in the community.</li>
                    </ol>

                    <h4 className='font-bold text-lg text-secondary-700 mt-4 work-sans-heading pl-4'>2.2. Personal Chat Rooms</h4>
                    <p className='text-secondary-500 pl-4'>Description: Create or join a private room for more focused conversations.</p>
                    <h5 className='font-bold text-md text-secondary-700 mt-2 work-sans-heading pl-8'>How to Use:</h5>
                    <ol className='list-decimal list-inside text-secondary-500 pl-8'>
                        <li>Click on the <q>Room</q> button on the home page.</li>
                        <li>Enter the name of the room you wish to create or join.</li>
                        <li>Enter your name in the subsequent prompt.</li>
                        <li>Begin chatting with others who join the same room.</li>
                    </ol>

                    <h3 className='font-bold text-xl text-secondary-700 mt-6 work-sans-heading'>Technical Information</h3>
                    <ul className='list-disc list-inside text-secondary-600 pl-4'>
                        <li><strong>Technology Stack:</strong></li>
                        <ul className='list-disc list-inside ml-5'>
                            <li>Frontend: React</li>
                            <li>Backend: Express</li>
                            <li className='font-mono italic font-semibold'>Database: Not used; real-time communication handled by the backend server.</li>
                        </ul>
                    </ul>

                    <h3 className='font-bold text-xl text-secondary-700 mt-6 work-sans-heading'>Troubleshooting</h3>
                    <ul className='list-disc list-inside text-secondary-500 pl-4'>
                        <li><strong>Common Issues:</strong></li>
                        <ul className='list-disc list-inside ml-5'>
                            <li>Cannot Join Room: Ensure the room name is correctly spelled.</li>
                            <li>Message Not Sending: Check your internet connection and try refreshing the page.</li>
                        </ul>
                    </ul>

                    <h3 className='font-bold text-xl text-secondary-700 mt-6 work-sans-heading'>Contact and Support</h3>
                    <p className='text-secondary-500 pl-4'>
                        For any further assistance, please email me
                        <a href="mailto: saranzafar736@gmail.com" className='font-semibold'> saranzafar736@gmail.com</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
