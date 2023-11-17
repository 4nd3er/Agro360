import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useParams } from "react-router-dom";
import CardTopic from "../components/CardTopic";

const Topics = () => {
    // Obtain the number of each role from the URL
    const { idrol } = useParams();

    // print the role of topics
    const getText = (numero) => {
        switch (numero) {
            case '1':
                return "Aprendiz";
            case '2':
                return "Instructor";
            case '3':
                return "Directivo";
            default:
                return "Desconocido";
        }
    };

    // Get the text based on the number
    const rol = getText(idrol);

    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <section className='min-h-[80vh]'>
                <header className="flex justify-between mt-16">
                    <p>
                        <span
                            className="text-4xl font-bold uppercase">Temáticas</span>
                        <br />
                        <span className="text-lg text-gray-500 uppercase">{rol}</span>
                    </p>
                    <button
                        onClick={openModal}
                        className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-10 shadow-shadow-button'>
                        Añadir Temática
                    </button>
                </header>
                <body className="grid grid-cols-3 gap-8 mr-10 mt-24">
                    <CardTopic />
                    <CardTopic />
                    <CardTopic />
                </body>
            </section>

            {/* inicia modal  */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        <h1 className='text-center text-2xl'>Nueva Temática</h1>
                                    </Dialog.Title>

                                    {/* cerrar modal */}
                                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="bg-white rounded-lg text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={closeModal}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-2">
                                        <form>
                                            <label
                                                htmlFor="nombre"
                                                className="text-gray-700 font-bold text-base">
                                                Temática:
                                            </label>
                                            <input
                                                id='nombre'
                                                type="text"
                                                placeholder='Nombre de la temática'
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg mb-10"
                                            />
                                            <input
                                                type="submit"
                                                className="bg-sky-600 hover:bg-sky-700 w-full p-2 text-white text-lg font-bold cursor-pointer transition-colors rounded-xl"
                                                value="Crear temática" />
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* fin modal */}
        </>
    )
}

export default Topics;

