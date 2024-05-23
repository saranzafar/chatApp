import React from 'react'

function Button({ type, value, className }) {
    return (
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <button
                type={`${type || "button"}`}
                className={`rounded-md border border-secondary-700 px-3 py-2 text-sm font-semibold text-secondary-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-900 hover:bg-secondary-200 ${className}`}
            >
                {value}
            </button>
        </div>
    )
}

export default Button