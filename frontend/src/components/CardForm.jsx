import React from 'react'

const CardForm = ({ form }) => {
    const { name, status } = form;
    return (
        <div
            className="bg-[#82def0]  rounded-lg p-4 cursor-pointer">
            <h2 className="text-black text-xl font-black uppercase truncate">
                {name}
            </h2>
            <p>Estado:<span className='text-white '> {status ? 'Activo' : 'Inactivo'}</span></p>
        </div>
    )
}

export default CardForm