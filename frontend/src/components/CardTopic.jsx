import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'
import { useRoles } from "../context/Context.js"
import { useParams } from "react-router-dom";


const CardTopic = ({ topic }) => {
    const { name, _id, createdAt } = topic
    const [role, setRole] = useState() // Name role
    const idrol = useParams() // role id

    const { getRole } = useRoles()

    // Obtain role name
    useEffect(() => {
        const Role = async () => {
            const res = await getRole(idrol.id)
            setRole(res.name)
        }
        Role();
    }, [])

    // Define colors according to role
    const topicCardColors = {
        Aprendiz: "bg-color-aprendiz",
        Instructor: "bg-color-instructor",
        Directivo: "bg-color-directivo",
    }

    let cardColor;

    // assign color to the card according to role
    switch (role) {
        case "Aprendiz":
            cardColor = topicCardColors.Aprendiz;
            break;
        case "Instructor":
            cardColor = topicCardColors.Instructor;
            break;
        case "Directivo":
            cardColor = topicCardColors.Directivo;
            break;
        default:
            cardColor = "bg-gray-200"
            break;
    }
    return (
        <Link
            to={`encuestas/${_id}`}
            className={`${cardColor} rounded-lg p-5 cursor-pointer transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg`}>
            <p className="text-white text-2xl text-center font-black uppercase">{name}</p>
            <p className='text-sm text-white text-bold'>Fecha creación: {formatDate(createdAt)}</p>
        </Link>
    )
}

export default CardTopic
