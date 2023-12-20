import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResponses, useRoles } from '../../context/Context.js'
import { userImg } from '../../assets/Assets.jsx'
import { Option } from '../../components/Components.jsx'
import { FRONTEND_URL } from '../../config.js';
import Spinner from '../../components/Spinner.jsx';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cookies from 'js-cookie';

const Response = () => {
    const { idform } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [form, setForm] = useState([]);
    const [topic, setTopic] = useState([])
    const [instructors, setInstructors] = useState([])
    const [questions, setQuestions] = useState([])

    const [actualInstructor, setActualInstructor] = useState()
    const [actualIndex, setActualIndex] = useState(0)
    const [actualQuestion, setActualQuestion] = useState([])

    const [validationStates, setValidationStates] = useState([]);
    const [allOptionsValid, setAllOptionsValid] = useState(false);
    const [validQuestions, setValidQuestions] = useState([])

    const { getFormtoResponse, createResponse, checkUser } = useResponses();
    const { getTopic } = useRoles();

    const [loading, setLoading] = useState(true)

    //* COMP USER
    useEffect(() => {
        setUser(checkUser())
        setLoading(false)
    }, [actualIndex])

    //* GET DATA
    //Get Form & Instructors
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const res = await getFormtoResponse(idform);
            if (res) {
                const getInstructorsImages = async () => {
                    const array = res.instructors.map(async (instructor) => {
                        const img = `${FRONTEND_URL}/src/img/instructores/${instructor.document}.png`
                        instructor.image = img
                        if (!await findImage(img)) instructor.image = false
                        return instructor
                    })
                    const instructors = await Promise.all(array)
                    setInstructors(instructors)
                }
                getInstructorsImages();
                setActualInstructor(res.instructors[0])
                setForm(res.form);

                // Get Questions
                const questions = res.form.questions.map(question => question)
                setQuestions(questions)
                setActualQuestion(questions[actualIndex])

                // Get Topic
                const topic = await getTopic(res.form.topic)
                setTopic(topic)

                setLoading(false)
            }
        }
        getData();
    }, [])

    //* FUNCTIONS
    //Comprobar existencia de la imagen
    const findImage = async (ruta) => {
        try {
            const response = await fetch(ruta, { method: 'HEAD' });
            return response.status !== 404;
        } catch (error) {
            console.error('Error al verificar la existencia de la imagen:', error);
            return false;
        }
    };

    //Salir del formulario
    const Exit = () => {
        Swal.fire({
            title: 'Salir del formulario',
            text: "¿Estas Seguro que deseas salir? Perderas tus respuestas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#39a900',
            cancelButtonColor: '#d33',
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                Cookies.remove('user')
                navigate(`/forms/v/${idform}`)
            }
        })
    }

    //Al hacer click en un instructor
    const changeInstructor = (instructor) => {
        setActualInstructor(instructor)
    }

    //Al cambiar de index, cambiar de pregunta
    useEffect(() => {
        setActualQuestion(questions[actualIndex]);
        setActualInstructor(instructors[0]);
    }, [actualIndex]);

    //Comprobar si los campos son validos
    const setValid = (isValid, instructor) => {
        setValidationStates((prevStates) => {
            const newStates = [...prevStates];
            const find = newStates.find((state) => state.instructor === instructor._id && state.question === questions[actualIndex].question)
            if (find) find.state = isValid
            else newStates.push({ instructor: instructor._id, question: questions[actualIndex].question, state: isValid })
            return newStates;
        });
    };

    //Comprobar si todas las preguntas son validas
    useEffect(() => {
        const allValid = validationStates.every((state) => state.state);
        setAllOptionsValid(allValid);
    }, [validationStates])

    //Guardar en un estado si todas las preguntas del questions actual son validas
    useEffect(() => {
        if (questions.length > 0) {
            const findQuestionValid = validQuestions.find((question) => question.question === questions[actualIndex].question)
            if (allOptionsValid) {
                if (findQuestionValid) findQuestionValid.state = true
                else (setValidQuestions([...validQuestions, { question: questions[actualIndex].question, state: true }]))
            } else {
                if (findQuestionValid) findQuestionValid.state = false
                else (setValidQuestions([...validQuestions, { question: questions[actualIndex].question, state: false }]))
            }
        }
    }, [allOptionsValid])

    //Al dar click en siguiente
    const Next = () => {
        if (!allOptionsValid) {
            return Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Debes responder las preguntas a cada instructor.',
            })
        };
        const state = validQuestions.some(question =>
            question.question === questions[actualIndex + 1].question && question.state === true
        );
        setValidationStates(() => {
            // Crear un nuevo array solo con la pregunta actual
            const newStates = instructors.map((instructor) => ({
                instructor: instructor._id,
                question: questions[actualIndex + 1].question,
                state: state,
            }));
            return newStates;
        });
        setActualIndex(actualIndex + 1);
    }

    //Al dar click en atras
    const Back = () => {
        setActualIndex(actualIndex - 1)
        setValidationStates(validationStates.map((obj) => ({ ...obj, state: true })))
    }

    //Guardar el formulario
    const saveForm = () => {
        if (!allOptionsValid) {
            return Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Debes responder las preguntas a cada instructor',
            })
        }
        const response = {
            answers: []
        }
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
                    localStorage.clear();
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
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
    };

    //Si no existe la cookie o no se ha comprobado el codigo
    if (!user && !loading) {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
        }).fire({
            icon: 'warning',
            title: 'Tu tiempo para responder al formulario ha finalizado, seras redirigido...',
        })
        localStorage.clear();
        setTimeout(() => {
            navigate(`/forms/v/${idform}`)
        }, 6000)
    }

    if (loading) return <Spinner />

    return (
        <div className='w-full flex flex-col p-10'>
            <div className='flex flex-col gap-5 p-8 text-center border rounded-md shadow-lg'>
                <div className='flex flex-row justify-between'>
                    <button onClick={Exit} className='btn text-color-sena bg-white border-color-sena w-fit h-fit hover:bg-color-sena hover:text-white'>
                        <svg className='w-4 h-4 xs:w-7 xs:h-7 sm:w-11 sm:h-11' viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="matrix(-1 0 0 1 18 3)">
                                <path d="m10.595 10.5 2.905-3-2.905-3" />
                                <path d="m13.5 7.5h-9" />
                                <path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c.0005616 1.1043502.8956499 1.9996898 2 2.0005615l8 .0022461" />
                            </g>
                        </svg>
                    </button>
                    <h1 className='text-2xl sm:text-4xl font-bold text-color-sena mx-auto'>{form.name}</h1>
                </div>
                <h1 className='text-xl sm:text-2xl'>{form.description}</h1>
                <h1 className='text-lg sm:text-xl text-green-600'>Tematica: <span className='font-bold text-lg sm:text-xl'>{topic ? topic.name : null}</span></h1>
            </div>
            <div className='p-4 mt-4 border rounded-md shadow-lg'>
                <Slider {...settings}>
                    {instructors ? instructors.map((instructor, index) => {
                        const id = instructor._id
                        const names = `${instructor.names} ${instructor.lastnames}`
                        return (
                            <div key={id} className={`image-container mx-3 !flex flex-col justify-center items-center ${instructor !== actualInstructor ? 'blur' : ''}`} onClick={() => changeInstructor(instructor)} >
                                <img src={instructor.image ? instructor.image : userImg} alt={names} className='rounded-s-lg h-20 xs:h-28 sm:h-36 md:h-48 lg:h-64 xl:h-72 w-full sm:w-4/5 border-solid border-2 border-transparent' />
                                <p className="image-name text-xs w-16 xs:w-24 sm:text-md sm:w-28 md:text-lg md:w-40 lg:w-60 xl:text-2xl xl:w-full text-center mt-4 overflow-hidden text-ellipsis whitespace-nowrap">{names}</p>
                            </div>
                        )
                    }) : null}
                </Slider>
            </div>
            {instructors.map((instructor, index) => {
                return (
                    <div key={instructor._id} className={`${actualInstructor && actualInstructor._id !== instructor._id || !actualInstructor ? 'hidden' : ''} p-8 flex flex-col md:items-center gap-8 mt-4 border rounded-md shadow-lg`}>
                        <p className='text-center text-lg md:text-xl lg:text-2xl'>{actualQuestion.question}</p>
                        <Option key={instructor._id} dataQuestion={actualQuestion} dataInstructor={instructor} setValid={(isValid) => setValid(isValid, instructor)} />
                    </div>
                )
            })}
            <div className={`${actualIndex > 0 ? 'justify-between' : 'justify-end'} flex flex-row w-full mt-5 `}>
                {actualIndex > 0 && (
                    <button className={`bg-green-400 hover:bg-green-600 btn p-4 rounded-md text-white`}
                        onClick={Back}>
                        Atras
                    </button>
                )}
                {actualInstructor && actualIndex + 1 < questions.length && (
                    <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} btn bottom-10 p-4 rounded-md text-white`}
                        disable={!allOptionsValid ? "true" : "false"}
                        onClick={Next}>
                        Siguiente
                    </button>
                ) || actualInstructor && actualIndex + 1 > questions.length - 1 && (
                    <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} btn p-4 rounded-md text-white`}
                        onClick={saveForm}>
                        Guardar
                    </button>
                )}
            </div>
        </div>
    );
};

export default Response;
