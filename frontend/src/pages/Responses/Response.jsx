import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useForms, useResponses, useRoles } from '../../context/Context.js'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner.jsx';

const Response = () => {
    // Estado para la imagen seleccionada en el carrusel
    const [selectedImage, setSelectedImage] = useState(null);

    // Estado para la calificación del instructor
    const [rating, setRating] = useState(null);

    // Configuración del carrusel utilizando la librería react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
    };

    // Datos de las imágenes y nombres de instructores
    const images = [
        { src: 'http://localhost:5173/src/img/instructores/AnaLucia.jpg', name: 'Ana Lucía' },
        { src: 'http://localhost:5173/src/img/instructores/DiegoMarin.jpg', name: 'Diego Marín' },
        { src: 'http://localhost:5173/src/img/instructores/Daniel.jpg', name: 'Daniel' },
        { src: 'http://localhost:5173/src/img/instructores/MartaLucia.jpg', name: 'Marta Lucia' },
        { src: 'http://localhost:5173/src/img/instructores/mauricioahumada.jpg', name: 'Mauricio Ahumada' },
        { src: 'http://localhost:5173/src/img/instructores/MoisesVargas.jpg', name: 'Moises Vargas' },
        { src: 'http://localhost:5173/src/img/instructores/nose.jpg', name: 'Llanet Liliana' },
        { src: 'http://localhost:5173/src/img/instructores/EdwinDavid.jpg', name: 'Edwin David' },
        { src: 'http://localhost:5173/src/img/instructores/CristianFelipe.jpg', name: 'Cristian Felipe' },
        { src: 'http://localhost:5173/src/img/instructores/KarenElizabeth.jpg', name: 'Karen Elizabeth' },
        { src: 'http://localhost:5173/src/img/instructores/ManuelVicente.png', name: 'Manuel Vicente' },

    ];
    // Función para manejar la selección de la calificación
    const handleRatingSelect = (value) => {
        setRating(value);
    };

    // Función para cambiar la imagen y reiniciar la calificación
    const goToNextImage = () => {
        setRating(null);
    };

    //Manejo de API
    const { idform } = useParams();
    const [form, setForm] = useState([]);
    const [topic, setTopic] = useState([])
    const [instructors, setInstructors] = useState([])
    const [questions, setQuestions] = useState([])

    const [actualInstructor, setActualInstructor] = useState()
    const [actualQuestion, setActualQuestion] = useState(0)

    const { getFormtoResponse } = useResponses();
    const { getTopic } = useRoles();

    useEffect(() => {
        const getData = async () => {
            const res = await getFormtoResponse(idform);
            setInstructors(res.instructors)
            setForm(res.form);
        }
        getData();
    }, [getFormtoResponse, idform])
    console.log(form)

    useEffect(() => {
        const topic = async () => {
            const res = await getTopic(form.topic)
            setTopic(res)
        }
        if (form && form.topic) topic();
    }, [form])

    //Questions
    useEffect(() => {
        if (form && form.questions) {
            const questions = form.questions.map(question => question)
            setQuestions(questions)
        }
    }, [form])
    console.log(questions[actualQuestion].question)

    if (!form.name) return <Spinner />
    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='p-4 text-center border rounded-md shadow-lg'>
                <h1 className='text-4xl font-bold'>{form.name}</h1>
                <h1 className='text-2xl'>{form.description}</h1>
                <h1 className='text-xl text-green-600'>Tematica: {topic ? topic.name : null}</h1>
            </div>

            <div className='p-4 text-center mt-4 border rounded-md shadow-lg'>
                <Slider {...settings}>
                    {instructors.map((instructor, index) => {
                        const id = instructor._id
                        const img = instructor.names.split(" ").join("")
                        const names = `${instructor.names} ${instructor.lastnames}`

                        return (
                            <div
                                key={index}
                                className={`image-container ${id !== actualInstructor ? 'blur' : ''}`}
                                onClick={() => {
                                    setActualInstructor(id);
                                }} >

                                <img
                                    src="http://localhost:5173/src/img/Logo.png"
                                    alt={names}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        border: '1px solid transparent',
                                    }}
                                />
                                <p className="image-name">{names}</p>
                            </div>
                        )
                    })}
                </Slider>
            </div>

            {actualInstructor && form.questions && questions && (
                <div className='p-4 text-center mt-4 border rounded-md shadow-lg'>
                    <p>{questions[actualQuestion].question}</p>
                    {/* <div className='flex items-center justify-center'>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div
                                key={value}
                                onClick={() => handleRatingSelect(value)}
                                className={`cursor-pointer p-4 m-2 transition duration-300 border rounded-full ${rating === value ? 'bg-green-500' : 'hover:bg-green-400'
                                    }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div> */}
                    {actualInstructor && (<button className='btn btn-primary p-4 rounded-full hover:bg-green-400'
                        onClick={() => { if (actualQuestion + 1 > questions.length - 1) { setActualQuestion(0) } else { setActualQuestion(actualQuestion + 1) } }}>Siguiente</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Response;