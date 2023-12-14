import React from 'react'

function FormAlert({ errors, success, className }) {
    return (
        <>
            {errors && errors.length > 0 ? errors.map((error, i) => (
                <div key={i} className={`${className ? className : ''} bg-red-500 p-4 text-white mb-8 rounded-md flex items-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )) : success && success.response ? (
                <div className={`${className ? className : ''} bg-green-500 p-4 text-white mb-8 rounded-md flex items-center`}>                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-check-lg w-6 h-6 me-4" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022" />
                    </svg>
                    <span>{success.response}</span>
                </div>
            ) : null}
        </>
    )
}

export default FormAlert