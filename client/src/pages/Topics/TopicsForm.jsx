import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardForm from '../../components/CardForm'
import { useRoles, useForms } from '../../context/Context.js'
import { Spinner } from '../../components/Components'
import { Toaster, toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const TopicsForm = () => {
    const params = useParams();
    const { idtopic } = params;
    const { getTopicForms, getTopic } = useRoles();
    const { deleteForm, createForm, errors } = useForms();
    const [forms, setForms] = useState([]);
    const [topic, setTopic] = useState();
    const [loading, setLoading] = useState(true);
    const [searchForms, setSearchForms] = useState([])
    const [searchInput, setSearchInput] = useState('')

    // Get Topic
    useEffect(() => {
        const Topic = async () => {
            const res = await getTopic(idtopic)
            setTopic(res.name)
        }
        Topic();
    }, [])

    const getForms = async () => {
        const form = await getTopicForms(idtopic)
        setForms(form)
        setLoading(false)
    }

    // Get forms of topic
    useEffect(() => {
        getForms();
    }, [])

    //Search
    const searchTopic = (input) => {
        const search = input.toLowerCase()
        setSearchInput(search)
        setSearchForms(() => { return forms.filter(form => form.name.toLowerCase().includes(search.replace(' ', ''))) })
    }

    // Show Toast
    const showToast = () => toast.success('Link copiado al portapapeles', { duration: 2500 })

    const duplicateForm = async ({ name, description, topic, end, status, creator, questions }) => {
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

    //Delete
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
        <article className='min-h-[80vh]'>
            <Toaster />
            <header className="flex justify-between mt-16">
                <p>
                    <span className="text-4xl font-bold uppercase">Encuestas</span>
                    <br />
                    <span className="text-lg text-gray-700 uppercase">tématica:{' '} {topic}</span>
                </p>
                <section className="relative">
                    <input type="search"
                        className="w-80 h-12 pl-11 pr-4 border border-color-sena rounded-full focus:outline-none focus:ring focus:border-blue-300 shadow-md"
                        placeholder="Buscar..."
                        onChange={(e) => searchTopic(e.target.value)} />
                    <div className="absolute flex items-center top-3 left-3 text-color-sena">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </section>
            </header>
            <h3 className='text-bold text-lg text-gray-600 text-center uppercase mt-10 mb-2'>Recientes</h3>
            <hr />
            {loading && <Spinner /> || (
                <article className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 mr-5 mt-10 mb-8">
                    {searchForms.length && (
                        searchForms.map(form => (
                            <CardForm key={form._id} form={form} showToast={showToast} duplicateForm={duplicateForm} deleteForm={deleteTopicForm} />
                        ))
                    ) || searchForms.length <= 0 && searchInput.length > 0 && (
                        <h3 className="text-2xl text-gray-600">Encuesta no encontrada</h3>
                    ) || forms.length && (
                        forms.map(form => (
                            <CardForm key={form._id} form={form} showToast={showToast} duplicateForm={duplicateForm} deleteForm={deleteTopicForm} />
                        ))
                    ) || (<h3 className="text-2xl text-gray-600">No hay Encuestas para esta tématica</h3>)}
                </article>
            )}
        </article>
    )
}

export default TopicsForm