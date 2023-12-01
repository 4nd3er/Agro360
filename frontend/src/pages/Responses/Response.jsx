import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useForms, useResponses, useRoles } from '../../context/Context.js'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner.jsx';
import { Option } from '../../components/Components.jsx'
import Swal from 'sweetalert2';

const Response = () => {
    const { idform } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState([]);
    const [topic, setTopic] = useState([])
    const [instructors, setInstructors] = useState([])
    const [questions, setQuestions] = useState([])

    const [actualInstructor, setActualInstructor] = useState()
    const [actualIndex, setActualIndex] = useState(0)
    const [actualQuestion, setActualQuestion] = useState([])
    const [next, setNext] = useState(false)

    const [validationStates, setValidationStates] = useState([]);
    const [allOptionsValid, setAllOptionsValid] = useState(false);

    const { getFormtoResponse, user, loading: loadingComp, createResponse } = useResponses();
    const { getTopic } = useRoles();

    const [loading, setLoading] = useState(true)

    //* GET DATA
    //Get Form & Instructors
    useEffect(() => {
        const getData = async () => {
            const res = await getFormtoResponse(idform);
            setInstructors(res.instructors)
            setActualInstructor(res.instructors[0])
            setForm(res.form);
        }
        getData();
    }, [])

    //Si se cargan los datos
    useEffect(() => {
        if (form.name && form.questions) {
            setLoading(false)
        }
    }, [form])

    //Get Topic
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
            setActualQuestion(questions[actualIndex])
        }
    }, [form])

    //* FUNCTIONS

    //Al hacer click en un instructor
    const changeInstructor = (instructor) => {
        setActualInstructor(instructor)
    }

    //Comprobar si los campos no estan vacios
    const setValid = (isValid, index) => {
        setValidationStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = isValid;
            return newStates;
        });
    };

    useEffect(() => {
        const allValid = validationStates.every((state) => state);
        setAllOptionsValid(allValid);
    }, [validationStates])

    //Al cambiar de index, cambiar de pregunta
    useEffect(() => {
        setActualQuestion(questions[actualIndex])
    }, [actualIndex])

    //Al dar click en siguiente
    useEffect(() => {
        if (next && allOptionsValid) {
            setActualIndex(actualIndex + 1)
        } else if (next && !allOptionsValid) {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Debes responder a cada instructor',
            })
        }
        setNext(false)
    }, [next])

    //Al dar click en atras
    const Back = () => {
        setActualIndex(actualIndex - 1)
    }

    const response = {
        answers: []
    }

    const saveForm = () => {
        for (const instructor of instructors) {
            for (const question of questions) {
                const data = {
                    question: question.question,
                    instructor: instructor._id,
                    answer: localStorage.getItem(`instructor: ${instructor.document}, question: ${question.question}`)
                }
                response.answers.push(data)
            }
        }
        Swal.fire({
            title: 'Enviar Formulario',
            text: "¿Estas Seguro? No podras cambiar tus respuestas despues de enviarlas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#39a900',
            cancelButtonColor: '#d33',
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then(async (result) => {            
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    await createResponse(idform, response)
                    Swal.fire({
                        icon: 'success',
                        title: 'Formulario enviado',
                        text: "El formulario ha sido enviado satisfactoriamente, gracias por tus respuestas!",
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true
                    })
                    setTimeout(() => {
                        navigate(`/forms/v/${idform}`)
                    }, 5000)
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al enviar el formulario',
                        text: "Ha habido un error al enviar el formulario, intenta nuevamente... " + error.response.data.message,
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true
                    })
                    setLoading(false)
                }
            }
        })
    }

    //* OTHERS
    // Configuración del carrusel utilizando la librería react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
    };

    //Si no existe la cookie o no se ha comprobado el codigo
    if (!user && !loadingComp) {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
        }).fire({
            icon: 'warning',
            title: 'No estas autorizado para responder este formulario, sera redirigido...',
        })
        setTimeout(() => {
            navigate(`/forms/v/${idform}`)
        }, 6000)
    }

    if (loading || loadingComp) return <Spinner />

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
                        const names = `${instructor.names} ${instructor.lastnames}`
                        return (
                            <div key={index} className={`image-container ${instructor !== actualInstructor ? 'blur' : ''}`} onClick={() => changeInstructor(instructor)} >
                                <img src="http://localhost:5173/src/img/Logo.png" alt={names}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        border: '1px solid transparent',
                                    }} />
                                <p className="image-name">{names}</p>
                            </div>
                        )
                    })}
                </Slider>
            </div>
            {/* {actualInstructor && actualQuestion && (
                <div className='p-4 text-center mt-4 border rounded-md shadow-lg'>
                    <p>{actualQuestion.question}</p>
                    <Option key={actualInstructor._id} dataQuestion={actualQuestion} dataInstructor={actualInstructor} setValid={setValid} />
                </div>
            )} */}
            {instructors.map((instructor, index) => {
                return (
                    <div key={instructor._id} className={`${actualInstructor && actualInstructor._id !== instructor._id || !actualInstructor ? 'hidden' : ''} p-4 text-center mt-4 border rounded-md shadow-lg`}>
                        <p>{actualQuestion.question}</p>
                        <Option key={instructor._id} dataQuestion={actualQuestion} dataInstructor={instructor} setValid={(isValid) => setValid(isValid, index)} />
                    </div>
                )
            })}
            {actualInstructor && actualIndex + 1 < questions.length && (
                <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} 'btn btn-primary p-4 rounded-full text-white absolute right-14 bottom-5' `}
                    onClick={() => setNext(true)}>
                    Siguiente
                </button>
            )}

            {actualInstructor && actualIndex + 1 > questions.length - 1 && (
                <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} 'btn btn-primary p-4 rounded-full text-white absolute right-14 bottom-5' `}
                    onClick={saveForm}>
                    Guardar
                </button>
            )}

            {actualInstructor && actualIndex > 0 && (
                <button className={`bg-green-400 hover:bg-green-600 btn btn-primary p-4 rounded-full text-white absolute left-14`}
                    onClick={Back}>
                    Atras
                </button>
            )}
        </div>
    );
};

export default Response;