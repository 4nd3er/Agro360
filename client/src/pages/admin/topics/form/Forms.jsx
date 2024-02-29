import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import CardForm from './components/CardFormComponent'
import ModalDeleteForm from './components/ModalDeleteFormComponent'
import { useRoles } from '../../../../context/Context'
import { Spinner, CreateQuestModal } from '../../../../components/Components'

const Forms = () => {
    const params = useParams();
    const { idtopic } = params;
    const { getTopicForms, getTopic } = useRoles();
    const [forms, setForms] = useState([]);
    const [reloadForms, setReloadForms] = useState(false)
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchForms, setSearchForms] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterForms, setFilterForms] = useState([])
    const [showForms, setShowForms] = useState(null)
    const [openCreateFormModal, setOpenCreateFormModal] = useState(false)
    const [openDeleteFormModal, setOpenDeleteFormModal] = useState(false)
    const [IdDeleteFormModal, setIdDeleteFormModal] = useState('')

    // Get Topic
    useEffect(() => {
        const Topic = async () => {
            const res = await getTopic(idtopic)
            setTopic(res.name)
        }
        Topic();
    }, [idtopic])

    // Get forms of topic
    useEffect(() => {
        const getForms = async () => {
            const forms = await getTopicForms(idtopic)
            setForms(forms)
            setShowForms(forms)
            setReloadForms(false)
            setLoading(false)
        }
        getForms();
    }, [reloadForms])

    useEffect(() => {
        if (searchForms.length) return setShowForms(searchForms)
        if (searchForms.length <= 0 && searchInput.length > 0) return setShowForms('Encuesta no encontrada')
        if (filterStatus !== "all" && filterForms.length) return setShowForms(filterForms)
        if (filterStatus !== "all" && filterForms.length <= 0) return setShowForms(`No existen encuestas en estado ${filterStatus !== 'all' && filterStatus ? 'Activo' : 'Inactivo'}`)
        if (forms.length) return setShowForms(forms)
        if (!forms.length) return setShowForms('No hay Encuestas para esta tématica')
    }, [forms, searchForms, searchInput, filterStatus, filterForms])

    //*HEADER

    //Search
    const searchTopic = (input) => {
        const search = input.toLowerCase()
        setSearchInput(search)
        setSearchForms(() => {
            if (filterStatus !== "all") return forms.filter(form => form.name.toLowerCase().includes(search.replace(' ', '')) && form.status === filterStatus)
            return forms.filter(form => form.name.toLowerCase().includes(search.replace(' ', '')))
        })
    }

    //Status filter
    const statusFilter = (status) => {
        setSearchForms([])
        setFilterStatus(status)
        const filterForms = forms.filter(form => form.status === status)
        if (status === "all") return setFilterForms([])
        setFilterForms(filterForms)
    }

    //Delete Form Modal
    const handleModalDeleteForm = (idForm) => {
        setOpenDeleteFormModal(true)
        setIdDeleteFormModal(idForm)
    }

    return (
        <article className='min-h-[80vh] px-5 md:px-0 lg:px-8 xl:px-8'>
            <Toaster />
            <header className="flex flex-col gap-8 md:flex-row md:gap-10 justify-between mt-4 md:mt-12 lg:mt-16 xl:mt-16">
                <p className='flex flex-col gap-2 lg:basis-[50%]'>
                    <span className="text-4xl md:text-2xl font-bold uppercase">Encuestas</span>
                    <span className="text-lg md:text-base text-color-gray uppercase">tématica:{' '} {topic}</span>
                </p>
                <section className="relative">
                    <input type="search"
                        className="w-80 md:w-[17rem] lg:w-80 h-12 pl-11 pr-4 border border-color-sena rounded-full focus:outline-none focus:ring focus:border-blue-300 shadow-md"
                        placeholder="Buscar..."
                        onChange={(e) => searchTopic(e.target.value)} />
                    <div className="absolute flex items-center top-3 left-3 text-color-sena">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </section>
            </header>
            <article className='flex justify-between items-end mt-12 mb-6'>
                <section className='basis-[25%] md:basis-[30%] lg:basis-[28%]'>
                    <button className='group bg-color-sena p-2 rounded-lg text-color-white transition-[1s_all_ease-in-out] w-12 sm:hover:w-[70%] flex md:hover:w-full xl:hover:w-[70%] lg:hover:w-[95%] items-center'
                        onClick={() => setOpenCreateFormModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-8 max-width-[3rem]" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                        <span className='md:text-md lg:text-base sm:group-hover:ml-2 whitespace-nowrap transition-all max-w-0 opacity-0 sm:group-hover:opacity-100'>
                            Añadir encuesta
                        </span>
                    </button>
                </section>
                <h3 className='text-bold text-lg text-color-gray text-center uppercase flex-none basis-1/2 md:basis-[0%] lg:basis-[40%]'>Encuestas</h3>
                <Select
                    className='md:basis-[30%] xxs:basis-[45%]'
                    options={[
                        {
                            label: "Todos",
                            value: "all"
                        },
                        {
                            label: "Activo",
                            value: true
                        }, {
                            label: "Inactivo",
                            value: false
                        }
                    ]}
                    placeholder={"Filtrar"}
                    isSearchable={false}
                    classNamePrefix="react-select"
                    onChange={val => statusFilter(val.value)}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            borderColor: state.isFocused ? '#369206' : provided.borderColor
                        }),
                        '&:hover': {
                            borderColor: '#98fe58',
                        }
                    }}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#39a900',
                            primary25: '#dfffc7',
                            primary50: '#dfffc7',
                        }
                    })}
                />
                <CreateQuestModal modalState={{ openCreateFormModal, setOpenCreateFormModal }} topic={{ _id: idtopic, name: topic }} />
            </article>
            <hr />
            {loading && <Spinner /> || (
                <article className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 mr-0  md:mr-5 lg:mr-5 xl:mr-5 mt-10 mb-8">
                    {searchForms.length && (
                        searchForms.map(form => (
                            <CardForm key={form._id} form={form} setLoading={setLoading} />
                        ))
                    ) || searchForms.length <= 0 && searchInput.length > 0 && (
                        <h3 className="text-2xl text-gray-600">Encuesta no encontrada</h3>
                    ) || filterStatus !== "all" && filterForms.length && (
                        filterForms.map(form => (
                            <CardForm key={form._id} form={form} setLoading={setLoading} />
                        ))
                    ) || filterStatus !== "all" && filterForms.length <= 0 && (
                        <h3 className="text-2xl text-gray-600">No existen encuestas en estado {filterStatus !== null && filterStatus ? 'Activo' : 'Inactivo'}</h3>
                    ) || forms.length && (
                        forms.map(form => (
                            <CardForm key={form._id} form={form} setLoading={setLoading} deleteFormModal={handleModalDeleteForm}/>
                        ))
                    ) || (<h3 className="text-2xl text-gray-600">No hay Encuestas para esta tématica</h3>)}
                </article>
            )}
            <ModalDeleteForm openDeleteModal={openDeleteFormModal} setOpenDeleteModal={setOpenDeleteFormModal} IdDeleteForm={IdDeleteFormModal} setReloadForms={setReloadForms} />
        </article>
    )
}

export default Forms
