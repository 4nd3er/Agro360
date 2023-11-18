import React from 'react'
import { Link } from 'react-router-dom'

const CardRol = ({ rol }) => {
    const { name, _id } = rol
    return (
        <>
            <Link 
            to={`${_id}/tematicas`}
             className="bg-[#82def0]  rounded-lg py-8 cursor-pointer">
                <p className=" text-white text-2xl text-center font-black uppercase">{name}</p>
            </Link>
        </>
    )
}

export default CardRol
