import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResponses, useRoles } from '../../../context/Context';
import { userImg } from '../../../assets/Assets';
import OptionResponse from './components/OptionResponseComponent';
import Spinner from '../../../components/Spinner';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../App.css';


const Response = () => {
    const { idform } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState([]);
    const [topic, setTopic] = useState([])
    const [instructors, setInstructors] = useState([])
    const [questions, setQuestions] = useState([])

    const [actualIndex, setActualIndex] = useState(0)
    const [actualInstructor, setActualInstructor] = useState(0)
    const [actualQuestion, setActualQuestion] = useState([])

    const [validationStates, setValidationStates] = useState([]);
    const [allOptionsValid, setAllOptionsValid] = useState(false);
    const [validQuestions, setValidQuestions] = useState([])

    const { getFormtoResponse, createResponse, checkUser, compFormResponse } = useResponses();
    const { getTopic } = useRoles();

    const [carrouselSettings, setCarrouselSettings] = useState({})

    const [loading, setLoading] = useState(true)

    //* GET DATA
    useEffect(() => {
        const getData = async () => {
            const validForm = await compFormResponse(idform)
            if (!validForm.status === 200 || !validForm.data.status) {
                localStorage.removeItem('responses')
                localStorage.removeItem('user')
                return navigate(`/forms/v/${idform}`)
            }

            // Get Form and Instructors
            const res = await getFormtoResponse(idform);
            setForm(res.form);
            setInstructors(res.instructors)
            setActualInstructor(res.instructors[0])

            // Get Questions
            const questions = res.form.questions.map(question => question)
            setQuestions(questions)
            setActualQuestion(questions[actualIndex])

            // Get Topic
            const topic = await getTopic(res.form.topic)
            setTopic(topic)

            //Set localStorage
            const findLocal = localStorage.getItem('responses')
            if (!findLocal) {
                const storage = res.instructors.map((instructor) => {
                    return {
                        instructor: instructor.document,
                        answers: res.form.questions.map((question) => {
                            return {
                                question: question.question,
                                value: ''
                            }
                        })
                    }
                })
                localStorage.setItem('responses', JSON.stringify(storage))
            }

            const local = JSON.parse(localStorage.getItem('responses'))

            //Set Initial Validation States
            const initialStates = res.instructors.map((instructor) => {
                const localInstructor = local.find((localInstructor) => localInstructor.instructor === instructor.document)
                const localQuestionValue = localInstructor.answers.find((answer) => answer.question === questions[0].question).value
                return {
                    instructor: instructor._id,
                    question: questions[0].question,
                    state: localQuestionValue.length > 0 ? true : false
                }
            })
            setValidationStates(initialStates)

            //Set Initial Valid Questions
            const initialValidQuestions = res.form.questions.map((question) => {
                const localValidQuestion = local.every((obj) => obj.answers.some((answer) => answer.question === question.question && answer.value.length > 0))
                return {
                    question: question.question,
                    state: localValidQuestion
                }
            })
            setValidQuestions(initialValidQuestions)
            setTimeout(() => {
                setLoading(false)
            }, 4000)
        }
        getData();
    }, [])

    //* ALERTS

    //Alerta de error
    const alertRequired = () => Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    }).fire({
        icon: 'error',
        title: 'Debes responder la pregunta a cada instructor.',
    })

    const alertSendForm = () => Swal.fire({
        title: 'Enviar Formulario',
        text: "¿Estas Seguro? No podras cambiar tus respuestas despues de enviarlas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#39a900',
        cancelButtonColor: '#d33',
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    })

    const alertSuccessForm = () => Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: "El formulario ha sido enviado satisfactoriamente, gracias por tus respuestas!",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true
    })

    const alertExit = () => Swal.fire({
        title: 'Salir del formulario',
        text: "¿Estas Seguro que deseas salir? Perderas tus respuestas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#39a900',
        cancelButtonColor: '#d33',
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    })

    const alertErrorForm = (error) => Swal.fire({
        icon: 'error',
        title: 'Error al enviar el formulario',
        text: "Ha habido un error al enviar el formulario, intenta nuevamente... " + error.response.data.message,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
    })


    //* FUNCTIONS
    //Al dar click en siguiente
    const Next = () => {
        const local = localStorage.getItem('responses')
        if (!local) return location.reload()
        if (!allOptionsValid) {
            return alertRequired()
        }
        //Comprobar si las preguntas siguientes ya estaban validadas y crear un array con ese valor
        const state = validQuestions.some(question => question.question === questions[actualIndex + 1].question && question.state === true);
        setValidationStates(() => {
            // Crear un array con los estados de validacion de las preguntas
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

    //Salir del formulario
    const Exit = () => {
        alertExit().then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('responses')
                localStorage.removeItem('user')
                navigate(`/forms/v/${idform}`)
            }
        })
    }

    //Al hacer click en un instructor
    const changeInstructor = (instructor) => {
        setActualInstructor(instructor)
    }

    //Funcion para guardar el estado de la validacion de la pregunta
    const setValid = (isValid, instructor) => {
        setValidationStates((prevStates) => {
            const newStates = [...prevStates];
            const find = newStates.find((state) => state.instructor === instructor._id && state.question === questions[actualIndex].question)
            if (find) find.state = isValid
            return newStates;
        });
    };

    //Guardar el formulario
    const saveForm = () => {
        if (!allOptionsValid) {
            return alertRequired()
        }
        const response = {
            answers: []
        }
        const local = JSON.parse(localStorage.getItem('responses'))
        if (!local) return location.reload()
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return navigate(`/forms/v/${idform}`)
        for (const instructor of instructors) {
            for (const question of questions) {
                const data = {
                    question: question.question,
                    instructor: instructor._id,
                    answer: local.find((localInstructor) => localInstructor.instructor === instructor.document).answers.find((answer) => answer.question === question.question).value
                }
                response.answers.push(data)
            }
        }
        alertSendForm().then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    await createResponse(idform, response)
                    alertSuccessForm()
                    setTimeout(() => {
                        localStorage.removeItem('responses')
                        localStorage.removeItem('user')
                        navigate(`/forms/v/${idform}`)
                    }, 5000)
                } catch (error) {
                    alertErrorForm(error)
                    setLoading(false)
                }
            }
        })
    }

    //Comprobar si hay una respuesta guardada en el localStorage
    const compValue = (instructor) => {
        const responses = JSON.parse(localStorage.getItem('responses'))
        const getInstructor = responses.find(response => response.instructor === instructor.document)
        const getQuestion = getInstructor.answers.find(answer => answer.question === actualQuestion.question)
        return getQuestion.value.length > 0
    }


    //* EFFECTS
    //Al cambiar de index, cambiar de pregunta
    useEffect(() => {
        //Comprobar usuario
        const compUser = async () => {
            const res = await checkUser(idform)
            if (!res) return window.location.back()
        }
        compUser()
        setActualQuestion(questions[actualIndex]);
        setActualInstructor(instructors[0]);
    }, [actualIndex]);

    //Comprobar si todas las preguntas son validas
    useEffect(() => {
        const allValid = validationStates.every((state) => state.state);
        setAllOptionsValid(allValid);
    }, [validationStates])

    //Guardar en un estado si todas las preguntas del questions actual son validas
    useEffect(() => {
        if (questions.length > 0) {
            const findQuestionValid = validQuestions.find((question) => question.question === questions[actualIndex].question)
            let state = false
            if (allOptionsValid) state = true
            if (findQuestionValid) findQuestionValid.state = state
            else (setValidQuestions([...validQuestions, { question: questions[actualIndex].question, state: state }]))
        }
    }, [allOptionsValid])


    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let slidesToShow;
            let slidesToScroll;

            if (instructors.length == 1){
                slidesToShow = 1;
                slidesToScroll = 1;
            } else if (screenWidth < 640) {
                slidesToShow = 1;
                slidesToScroll = 1;
            } else if (screenWidth < 768) {
                slidesToShow = instructors.length < 2 ? instructors.length : 2;
                slidesToScroll = 1;
            } else if (screenWidth < 1024) {
                slidesToShow = instructors.length < 3 ? instructors.length : 3;
                slidesToScroll = 2;
            } else if (screenWidth > 1024) {
                slidesToShow = instructors.length < 4 ? instructors.length : 4;
                slidesToScroll = 2;
            }

            setCarrouselSettings({
                dots: true,
                arrows: true,
                infinite: true,
                speed: 1000,
                slidesToShow: slidesToShow,
                slidesToScroll: slidesToScroll
            })
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [instructors.length]);

    if (loading) return <Spinner />;

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
                <h1 className='text-lg sm:text-xl text-color-sena'>Tematica: <span className='font-bold text-lg sm:text-xl'>{topic ? topic.name : null}</span></h1>
            </div>

            <div className='p-8 mt-4 border rounded-md shadow-lg relative'>
                <Slider {...carrouselSettings} className='p-6 md:p-4 text-center'>
                    {instructors ? instructors.map((instructor) => {
                        const id = instructor._id
                        const names = `${instructor.names} ${instructor.lastnames}`

                        return (
                            <div key={id} className={`relative image-container px-2 py-4 !flex flex-col justify-center items-center rounded-xl transition-all ${instructor !== actualInstructor ? 'blur' : 'border-2 border-color-sena focus-visible:outline-none'} `} onClick={() => changeInstructor(instructor)}>
                                <div className={`${!compValue(instructor) ? 'hidden' : 'absolute rounded-full bg-color-sena p-1 top-2 left-2'} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </div>
                                <img src={instructor.image ? instructor.image : userImg} alt={names} className='rounded-s-lg h-56 w-full max-w-max border-solid border-2 border-transparent' /> {/*xs:h-28 sm:h-36 md:h-48 lg:h-64 xl:h-72*/}
                                <p className="image-name w-full text-md xs:text-xl md:text-lg lg:text-xl 2xl:text-2xl text-center mt-4 overflow-hidden text-ellipsis whitespace-nowrap">{names}</p>
                            </div>
                        )
                    }) : null}
                </Slider>
            </div>

            <div className='border rounded-md shadow-lg relative'>
                {actualQuestion && actualInstructor && (
                    <div className={`p-8 flex flex-col md:items-center gap-8 mt-4 border rounded-md shadow-lg`}>
                        <div className='flex flex-col gap-2 text-lg'>
                            <p className='text-center text-color-sena'>Pregunta {actualIndex + 1}/{questions.length}</p>
                            <p className='text-center text-lg md:text-xl lg:text-2xl'>{actualQuestion.question}</p>
                        </div>
                        <OptionResponse dataQuestion={actualQuestion} dataInstructor={actualInstructor} setValid={(isValid) => setValid(isValid, actualInstructor)} actualIndex={actualIndex} />
                    </div>
                )}
            </div>
            <div className='relative'>
                {/* Botones de navegación */}
                <div className={`${actualIndex > 0 ? 'justify-between' : 'justify-end'} flex flex-row w-full mt-5 `}>
                    {actualIndex > 0 && (
                        <button className={`bg-green-400 hover:bg-green-600 btn p-4 rounded-md text-white`} onClick={Back}>
                            Atras
                        </button>
                    )}
                    {actualInstructor && actualIndex + 1 < questions.length && (
                        <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} btn bottom-10 p-4 rounded-md text-white`} disable={!allOptionsValid ? "true" : "false"} onClick={Next}>
                            Siguiente
                        </button>
                    ) || actualInstructor && actualIndex + 1 > questions.length - 1 && (
                        <button className={`${allOptionsValid ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-500'} btn p-4 rounded-md text-white`} onClick={saveForm}>
                            Guardar
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Response;
