import React from 'react'
import { Link } from 'react-router-dom'

function Button({ type, value, className, to = "#", loading = false }) {
    return (
        <div className=''>
            {!loading &&
                <Link
                    to={to}
                >
                    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                        <button
                            type={`${type || "button"}`}
                            className={`rounded-md border border-secondary-700 px-3 py-2 text-sm font-semibold text-secondary-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-900 hover:bg-secondary-200 ${className}`}
                        >
                            {value}
                        </button>
                    </div>
                </Link>
            }
            {loading &&

                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <div
                        type={`${type || "button"}`}
                        className={`rounded-md border border-secondary-700 px-3 py-2 text-sm font-semibold text-secondary-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-900 hover:bg-secondary-200 flex flex-row gap-2 ${className}`}
                    >
                        <svg className="animate-spin h-5 w-5 size-6"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        {value}
                    </div>
                </div>
            }
        </div>


    )
}

export default Button