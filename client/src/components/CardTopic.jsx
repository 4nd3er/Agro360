import { useEffect, useState } from 'react'
import { formatDate } from '../helpers/formatDate'
import { useRoles } from "../context/Context.js"
import { useParams, useNavigate } from "react-router-dom";
import { Menu } from '@headlessui/react'

const CardTopic = ({ topic }) => {
    const { name, _id, createdAt, updatedAt } = topic
    const [role, setRole] = useState() // Name role
    const idrol = useParams() // role id
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    const { getRole, handleModalEditTopic, handleModalDeleteTopic } = useRoles()

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
    // Open the dropdown
    const handleButtonClick = (e) => {
        e.stopPropagation()
    }
    // Open the modal edit
    const handleEditButtomTopic = (e) => {
        e.stopPropagation()
        handleModalEditTopic(topic)
    }

    // Open the modal delete
    const handleDeleteButtomTopic = (e) => {
        e.stopPropagation()
        handleModalDeleteTopic(topic)
    }

    return (
        <div
            className={`${cardColor} rounded-lg p-4 transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer select-none`}
            onClick={handleClick}
        >
            <h3 className="text-color-aprendiz-text text-xl font-black uppercase">{name}</h3>
            <Menu as="div">
                <Menu.Button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => handleButtonClick(e)}
                    className="bg-color-aprendiz rounded-full hover:bg-color-aprendiz-text transition-colors ease-in duration-500 absolute bottom-0 right-0 mb-2 mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${isHovered ? '#ffffff' : '#1c566e'}`} className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Menu.Button>
                <Menu.Items className="absolute right-5 top-5 w-44 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={(e) => handleEditButtomTopic(e)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Editar
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={(e) => handleDeleteButtomTopic(e)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Eliminar
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
            <p className='text-base text-color-aprendiz-text text-bold mt-3'>Creada el: {formatDate(createdAt)}</p>
            <p className='text-base text-color-aprendiz-text text-bold my-3'>Última actualización: {formatDate(updatedAt)}</p>
        </div>
    )
}

export default CardTopic
