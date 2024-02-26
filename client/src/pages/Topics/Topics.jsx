import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardTopic from "../../components/CardTopic.jsx";
import ModalTopic from "../../components/ModalTopic.jsx";
import ModalDeleteTopic from "../../components/ModalDeleteTopic.jsx";
import { useRoles } from "../../context/Context.js"
import Spinner from "../../components/Spinner.jsx";
import Masonry from "@mui/lab/Masonry"
import Swal from "sweetalert2"

const Topics = () => {
    const params = useParams() // Obtain id of rol
    const { handleModalTopic, getRole, getRoleTopics, sweetAlert, setSweetAlert } = useRoles()
    const [role, setRole] = useState()
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)

    // Mostrar alertas al crear editar o eliminar temáticas
    useEffect(() => {
        const { ilsuccesso, errore } = sweetAlert 
        const showAlert = (message, icon) => {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            }).fire({
                icon: icon,
                title: message,
            })
        }
        if (ilsuccesso) {
             showAlert(ilsuccesso, 'success')
             setSweetAlert({ ilsuccesso: '', errore: '' })
        }
        if (errore) {
            showAlert(errore, 'error')
            setSweetAlert({ ilsuccesso: '', errore: '' })
       }
    }, [sweetAlert, setSweetAlert])

    // Get Topics
    useEffect(() => {
        const getTopics = async () => {
            const topic = await getRoleTopics(params.id)
            setTopics(topic)
            setLoading(false)
        }
        getTopics();
    }, [topics])

    // Get Role
    useEffect(() => {
        const Role = async () => {
            const res = await getRole(params.id)
            setRole(res.name)
        };
        Role();
    }, [params.id])

    return (
        <>
            <section className='min-h-[80vh] px-5 md:px-0 lg:px-0 xl:px-0'>
                <header className="flex justify-between mt-5 md:mt-10 lg:mt-16 xl:mt-16">
                    <p>
                        <span className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl mr-8 md:mr-0 lg:mr-0 xl:mr-0 font-bold uppercase">Temáticas</span>
                        <br />
                        <span className="text-lg text-gray-500 uppercase">{role}</span>
                    </p>
                    <button
                        onClick={handleModalTopic}
                        className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-5 md:mr-5 lg:mr-10 xl:mr-10 hover:shadow-shadow-button'>
                        Añadir Temática
                    </button>
                </header>
                <section className="mr-0 md:mr-0 lg:mr-5 xl:mr-5 mt-5 md:mt-10 lg:mt-10 xl:mt-10">
                    <Masonry
                        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                        spacing={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
                    >
                        {loading ? <Spinner className={'!m-0'}/> :
                            topics.length > 0 ? topics.map(topic => (
                                <CardTopic key={topic._id} topic={topic} />
                            ))
                                : <h3 className="text-xl text-gray-600">Aún no hay tématicas creadas para este rol, las temáticas creadas aparecerán aquí</h3>}
                    </Masonry>
                </section>
                {/* Modal crear y editar temática */}
                <ModalTopic
                    setTopics={setTopics}
                    topics={topics}
                />
                {/* Modal eliminar temática */}
                <ModalDeleteTopic />
            </section>
        </>
    )
}

export default Topics;
