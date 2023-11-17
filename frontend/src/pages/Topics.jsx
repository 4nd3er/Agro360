import { useParams } from "react-router-dom";
import useRoles from "../hooks/useRoles.jsx"
import CardTopic from "../components/CardTopic.jsx";
import ModalTopic from "../components/ModalTopic.jsx";

const Topics = () => {
    
    const { handleModalTopic } = useRoles()

    return (
        <>
            <section className='min-h-[80vh]'>
                <header className="flex justify-between mt-16">
                    <p>
                        <span
                            className="text-4xl font-bold uppercase">Temáticas</span>
                        <br />
                        <span className="text-lg text-gray-500 uppercase">Aprendiz</span>
                    </p>
                    <button
                        onClick={handleModalTopic}
                        className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-10 shadow-shadow-button'>
                        Añadir Temática
                    </button>
                </header>
                <ModalTopic/> 
                <main className="grid grid-cols-3 gap-8 mr-10 mt-24">
                    <CardTopic />
                    <CardTopic />
                    <CardTopic />
                </main>
            </section>        
        </>
    )
}

export default Topics;

