import React from 'react';
import { Button } from "../components/index";
import { Footer } from "./index"

function CreateRoom() {
    return (
        <div>
            <div className='w-full h-auto bg-primary-50 text-white flex justify-center flex-col items-center gap-5 mt-16'>
                <div className='flex items-center space-x-2 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-11">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <h1 className='font-bold text-2xl text-secondary-700'>
                        Create Room
                    </h1>
                </div>
                <p className='w-2/3 min-w-72 text-center text-secondary-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus blanditiis veniam optio porro laboriosam consequatur quae id libero dolore architecto hic nulla repellat, earum repellendus, nostrum aut, qui aliquid!
                </p>
                <Button value={"Community Chat"} />
                <Button value={"Personal Chat"} />

                <h2 className='font-bold text-2xl text-secondary-700 mt-10'>Docs</h2>
                <p className='w-1/2 min-w-72 text-center text-secondary-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus blanditiis veniam optio porro laboriosam consequatur quae id libero dolore architecto hic nulla repellat, earum repellendus, nostrum aut, qui aliquid!
                </p>
                <p className='w-1/2 min-w-72 text-center text-secondary-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus blanditiis veniam optio porro laboriosam consequatur quae id libero dolore architecto hic nulla repellat, earum repellendus, nostrum aut, qui aliquid!
                </p>
                <p className='w-1/2 min-w-72 text-center text-secondary-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus blanditiis veniam optio porro laboriosam consequatur quae id libero dolore architecto hic nulla repellat, earum repellendus, nostrum aut, qui aliquid!
                </p>
            </div >
            <Footer />
        </div>

    );
}

export default CreateRoom;
