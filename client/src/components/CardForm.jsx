import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { Menu } from '@headlessui/react'

const CardForm = ({ form }) => {
    const { _id, name, status, description } = form;
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    // Navigate to form
    const handleClick = () => {
        navigate(`/forms/v/${_id}`)
    }

    return (
        <div
            className="bg-[#82def0] w-60 mb-5 rounded-lg p-2 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl"
        >
            {/* <img className="" src="../img/imagen-encuesta.jpg" alt="" /> */}
            <div className="p-2">
                <h2 className="text-color-aprendiz-text text-xl font-black uppercase truncate">
                    {name}
                </h2>
                <p className="text-color-aprendiz-text text-base">{description}</p>
            </div>

            <p className="text-base text-color-aprendiz-text ">Estado:<span className='text-color-aprendiz-text text-sm'> {status ? 'Activo' : 'Inactivo'}</span></p>
            <Menu as="div">
                <Menu.Button 
                onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                className="ml-auto block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${isHovered ? '#1c566e' : '#ffffff'}`} className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Menu.Button>
                <Menu.Items className="absolute right-4 top-16 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={handleClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                    </svg>
                                    Ver formulario
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default CardForm