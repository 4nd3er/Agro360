import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardTopic from "../../components/CardTopic.jsx";
import ModalTopic from "../../components/ModalTopic.jsx";
import { useRoles } from "../../context/Context.js"
import Spinner from "../../components/Spinner.jsx";

const Topics = () => {
    const params = useParams() // Obtain id of rol
    const { handleModalTopic, getRole, getRoleTopics } = useRoles()
    const [role, setRole] = useState()
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)

    // Get Topics
    useEffect(() => {
        const getTopics = async () => {
            const topic = await getRoleTopics(params.id)
            setTopics(topic)
            setLoading(false)
        }
        getTopics();
    }, [])

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
            <section className='min-h-[80vh]'>
                <header className="flex justify-between mt-16">
                    <p>
                        <span
                            className="text-4xl font-bold uppercase">Temáticas</span>
                        <br />
                        <span className="text-lg text-gray-500 uppercase">{role}</span>
                    </p>
                    <button
                        onClick={handleModalTopic}
                        className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-10 shadow-shadow-button'>
                        Añadir Temática
                    </button>
                </header>
                <ModalTopic />
                <main className="grid grid-cols-1 gap-5 md:grid md:grid-cols-3 md:gap-5  mr-10 mt-24">
                    {loading ? <Spinner /> :
                        topics.length > 0 ? topics.map(topic => (
                            <CardTopic
                                key={topic._id}
                                topic={topic}
                            />
                        ))
                        : <h3 className="text-2xl text-gray-600">Aún no hay tématicas creadas para este rol, las temáticas creadas aparecerán aquí</h3>}
                </main>
            </section>
        </>
    )
}

export default Topics;

