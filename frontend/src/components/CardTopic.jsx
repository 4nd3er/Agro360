import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'

const CardTopic = ({ topic }) => {
    const { name, _id, createdAt } = topic
    return (
        <Link
            to={`encuestas/${_id}`}
            className="bg-[#82def0]  rounded-lg p-5 border-2 border-[#4EA3F1] cursor-pointer hover:bg-[#61b3c4]">
            <p className=" text-white text-2xl text-center font-black uppercase">{name}</p>
            <p className='text-sm text-white text-bold'>Fecha creación: {formatDate(createdAt)}</p>
        </Link>
    )
}

export default CardTopic
