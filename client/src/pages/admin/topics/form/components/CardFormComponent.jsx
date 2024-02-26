import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { Menu } from '@headlessui/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useForms, useResponses } from '../../../../../context/Context'
import { formatDate } from '../../../../../helpers/formatDate'

const CardForm = ({ form, setLoading, getForms }) => {
    const { _id, name, status, description, createdAt, end } = form;
    const [isHovered, setIsHovered] = useState(false)
    const { createForm, deleteForm } = useForms();
    const { getResponsesForm } = useResponses();
    const url = import.meta.env.VITE_FRONTEND_URL
    const formDate = formatDate(createdAt, 'date');
    const formLimit = formatDate(end, 'date-time');

    //*MENU

    // Show Toast
    const showToast = () => toast.success('Link copiado al portapapeles', { duration: 2500 })

    // Duplicate Form
    const duplicateForm = async ({ name, description, topic, creator, questions }) => {
        let fechaActual = new Date();
        // Añadir un día a la fecha actual
        let end = new Date(fechaActual);
        end.setDate(fechaActual.getDate() + 1);
        const status = true;
        const form = { name: `Copia ${name}`, description, topic, end, status, creator, questions }
        setLoading(true)
        let create = await createForm(form)
        let num = 1
        while (!create && num <= 10) {
            num += 1
            create = await createForm({ name: `Copia (${num}) ${name}`, description, topic, end, status, creator, questions })
        }
        await getForms()
        setLoading(false)
        if (!create) return toast.error('Error al duplicar la encuesta: limite excedido', { duration: 4000 })
        toast.success('Encuesta duplicada satisfactoriamente', { duration: 4000 })
    }

    //Edit Form
    const editForm = async (idForm) => {
        setLoading(true)
        const findResponses = await getResponsesForm(idForm)
        setLoading(false)
        if (findResponses) {
            return Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Error al editar la encuesta: La encuesta tiene respuestas'
            })
        }
        location.href = `/crear-formulario/editar/${idForm}`;
    }

    // Delete Form
    const deleteTopicForm = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Esta seguro que desea eliminar esta encuesta?',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: 'red',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        setLoading(true)
                        await deleteForm(id)
                        await getForms()
                        setLoading(false)
                        Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 4000,
                            timerProgressBar: true,
                        }).fire({
                            icon: 'success',
                            title: 'Encuesta eliminada satisfactoriamente'
                        })
                    } catch (error) {
                        setLoading(false)
                        Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        }).fire({
                            icon: 'error',
                            title: 'Error al eliminar: ' + error.response.data.message
                        })
                    }

                }
            })
    }

    return (
        <section className="bg-[#82def0] rounded-lg p-4 transform transition-all hover:-translate-y-2 duration-300 shadow-md hover:shadow-lg">
            <CopyToClipboard text={`${url}/forms/v/${_id}`} onCopy={showToast}>
                <div className="flex flex-col  gap-2 cursor-pointer" title="Haz click para copiar el link">
                    <h2 className="text-color-aprendiz-text text-xl font-black uppercase truncate">{name}</h2>
                    <p className="text-color-aprendiz-text text-base">{description}</p>
                    <p className='text-color-aprendiz-text text-base'>Fecha de creacion: {formDate}</p>
                    <p className='text-color-aprendiz-text text-base'>Fecha limite a responder: {formLimit}</p>
                    <p className="text-base text-color-aprendiz-text ">Estado:<span className={`text-color-aprendiz-text text-sm ${status ? 'text-color-sena' : 'text-red-500'}`}> {status ? 'Activo' : 'Inactivo'}</span></p>
                </div>
            </CopyToClipboard>

            <Menu as="section">
                <Menu.Button
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    className="absolute bottom-0 right-0 mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${isHovered ? '#1c566e' : '#ffffff'}`} className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Menu.Button>
                <Menu.Items className="absolute right-5 bottom-10 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <div>
                                <CopyToClipboard text={`${url}/forms/v/${_id}`} >
                                    <button
                                        className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                        onClick={showToast}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                        </svg>
                                        Copiar Link
                                    </button>
                                </CopyToClipboard>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div>
                                <button className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={() => duplicateForm(form)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 icon icon-tabler icon-tabler-files" viewBox="0 0 24 24" strokeWidth="1.5" stroke={active ? '#ffffff' : '#1c566e'} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                                        <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
                                        <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
                                    </svg>
                                    Crear copia
                                </button>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div>
                                <button className={`${active ? 'bg-color-aprendiz-text text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={() => editForm(_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={active ? '#ffffff' : '#1c566e'} className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Editar encuesta
                                </button>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div>
                                <button className={`${active ? 'bg-red-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-300 ease-out`}
                                    onClick={() => deleteTopicForm(_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" strokeWidth="1.5" stroke={active ? '#ffffff' : '#ff2825'} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 7l16 0" />
                                        <path d="M10 11l0 6" />
                                        <path d="M14 11l0 6" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </section>
    )
}

export default CardForm