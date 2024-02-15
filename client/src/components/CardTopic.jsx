import { useEffect, useState } from 'react'
import { formatDate } from '../helpers/formatDate'
import { useRoles } from "../context/Context.js"
import { useParams, useNavigate } from "react-router-dom";
import { Menu } from '@headlessui/react'


const CardTopic = ({ topic }) => {
    const { name, _id, createdAt } = topic
    const [role, setRole] = useState() // Name role
    const idrol = useParams() // role id
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    const { getRole, handleModalEditTopic } = useRoles()

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

    // Navigate to form
    const handleClick = () => {
        navigate(`encuestas/${_id}`)
    }
    return (
        <div
            className={`${cardColor} rounded-lg p-5 transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg`}>
            <div className='flex justify-between'>
                <p className="text-color-aprendiz-text text-2xl text-center font-black uppercase">{name}</p>
                <Menu as="div">
                    <Menu.Button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${isHovered ? '#1c566e' : '#ffffff'}`} className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>

                    </Menu.Button>
                    <Menu.Items className="absolute right-4 top-16 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => handleModalEditTopic(topic)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Editar
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Menu>
            </div>

            <p className='text-sm text-color-aprendiz-text text-bold'>Fecha creación: {formatDate(createdAt)}</p>

            <button
                onClick={handleClick}
                className="mt-3 bg-white text-black px-4 py-2 cursor-pointer rounded"
            >Ver Encuestas</button>
        </div>
    )
}

export default CardTopic
