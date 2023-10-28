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

    return (
        <section className='min-h-[80vh]'>
            <header className="flex justify-between mt-16">
                <p>
                    <span className="text-4xl font-bold uppercase">Tematicas</span>
                    <br />
                    <span className="text-lg text-gray-500 uppercase">{rol}</span>
                </p>
                <button className='bg-[#00324D] text-white font-bold py-2 px-3 rounded-lg uppercase mr-10 shadow-shadow-button'> Añadir Temática</button>
            </header>
            <body className="grid grid-cols-3 gap-8 mr-10 mt-24">
                <CardTopic />
                <CardTopic />
                <CardTopic />
            </body>
        </section>
    )
}

export default Topics;

