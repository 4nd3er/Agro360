import React from 'react'
import { Link } from 'react-router-dom'

const CardRol = ({ rol }) => {
    const { name, _id } = rol;

    // Define colors according to role 
    const roleCardColors = {
        Aprendiz: "bg-color-aprendiz",
        Instructor: "bg-color-instructor",
        Directivo: "bg-color-directivo",
    }

    // assign color to each card
    const cardColor = roleCardColors[name];
    return (
        <>
            <Link
                to={`tematicas/${_id}`}
                className={`rounded-lg py-8 cursor-pointer transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg ${cardColor}`}
            >
                <p className=" text-white text-2xl text-center font-black uppercase">{name}</p>
            </Link>
        </>
    )
}

export default CardRol
