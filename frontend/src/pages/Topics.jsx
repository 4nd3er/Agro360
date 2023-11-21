import { useParams } from "react-router-dom";
import useRoles from "../hooks/useRoles.jsx"
import CardTopic from "../components/CardTopic.jsx";
import ModalTopic from "../components/ModalTopic.jsx";
import { useEffect, useState } from "react";

const Topics = () => {
    const params = useParams() // Obtain id of rol
    const { handleModalTopic, obtainTopics } = useRoles()
    const { obtainRol } = useRoles() // Obtain rol
    const [topics, setTopics] = useState([]) // para guardar las tematicas de cada rol e iterar
    const [role, setRole] = useState()

    // Obtain topics 
    useEffect(() => {
        const iterateTopics = async () => {
            const themes = await obtainTopics(params.id);
            setTopics(themes);
        }
        iterateTopics();
    }, [obtainTopics, params.id])

    // Obtain rol
    useEffect(() => {
        const Role = async () => {
            const role = await obtainRol(params.id);
            setRole(role.name)
        };
        Role();
    }, [])

    return (
        <>
            <section className='min-h-[80vh]'>
                <header className="flex justify-between mt-16">
                    <p>
                        <span
                            className="text-4xl font-bold uppercase">"Tématicas"</span>
                        <br />
                        <span className="text-lg text-gray-500 uppercase">{role}</span>
                    </p>
                    <button
                        onClick={handleModalTopic}
                        className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-10 shadow-shadow-button'>
                        Añadir Tématicas
                    </button>
                </header>
                <ModalTopic />
                <main className="grid grid-cols-3 gap-8 mr-10 mt-24">
                    {topics.length ?
                        topics.map(topic => (
                            <CardTopic
                                key={topic._id}
                                topic={topic}
                            />
                        ))
                        : <h3 className="text-2xl text-gray-600">Aún no hay tématicas para este rol</h3>}
                </main>
            </section>
        </>
    )
}

export default Topics;

