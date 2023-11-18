import React from 'react'

const CardRol = ({ rol }) => {
    const { name, _id } = rol
    return (
        <div>
            <div className="bg-[#82def0]  rounded-lg py-8 cursor-pointer">
                <p className=" text-white text-2xl text-center font-black uppercase">{name}</p>
            </div>
        </div>
    )
}

export default CardRol
