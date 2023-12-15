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
import { userImg } from '../../assets/Assets.jsx'

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

    const [validationStates, setValidationStates] = useState([]);
    const [allOptionsValid, setAllOptionsValid] = useState(false);
    const [validQuestions, setValidQuestions] = useState([])

    const { getFormtoResponse, user, loading: loadingComp, createResponse } = useResponses();
    const { getTopic } = useRoles();

    const [loading, setLoading] = useState(true)

    //* GET DATA
    //Get Form & Instructors
    useEffect(() => {
        const getData = async () => {
            const res = await getFormtoResponse(idform);
            if (res) {
                setInstructors(res.instructors)
                setActualInstructor(res.instructors[0])
                setForm(res.form);
            }
        }
        getData();
    }, [])

    //Get Questions
    useEffect(() => {
        if (form.name && form.questions) {
            const questions = form.questions.map(question => question)
            setQuestions(questions)
            setActualQuestion(questions[actualIndex])
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

    //* FUNCTIONS

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
        let state;
        const findValid = validQuestions.find((question) => question.question === questions[actualIndex + 1].question)
        if (findValid && findValid.state === true) state = true
        else (state = false)
        setValidationStates((prevStates) => {
            // Crear un nuevo array solo con la pregunta actual
            const newStates = instructors.map((instructor) => ({
                instructor: instructor._id,
                question: questions[actualIndex + 1].question,
                state: state,
            }));
            return newStates;
        });
        if (allOptionsValid) {
            setActualIndex(actualIndex + 1)
        } else {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Debes responder las preguntas a cada instructor.',
            })
        }
    }

    //Al dar click en atras
    const Back = () => {
        setActualIndex(actualIndex - 1)
        setValidationStates(validationStates.map((obj) => ({ ...obj, state: true })))
    }

    const response = {
        answers: []
    }

    const saveForm = () => {
        if (!allOptionsValid) {
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
        } else {
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
    }

    //* OTHERS
    // Configuración del carrusel utilizando la librería react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
            title: 'No estas autorizado para responder este formulario, seras redirigido...',
        })
        localStorage.clear();
        setTimeout(() => {
            navigate(`/forms/v/${idform}`)
        }, 6000)
    }

    if (loading || loadingComp) return <Spinner />

    return (
        <div className='w-full flex flex-col p-10'>
            <div className='flex flex-col gap-5 p-8 text-center border rounded-md shadow-lg'>
                <h1 className='text-2xl sm:text-4xl font-bold text-color-sena'>{form.name}</h1>
                <h1 className='text-xl sm:text-2xl'>{form.description}</h1>
                <h1 className='text-lg sm:text-xl text-green-600'>Tematica: <span className='font-bold text-lg sm:text-xl'>{topic ? topic.name : null}</span></h1>

            </div>
            <div className='p-4 mt-4 border rounded-md shadow-lg'>
                <Slider {...settings}>
                    {instructors ? instructors.map((instructor, index) => {
                        const id = instructor._id
                        const names = `${instructor.names} ${instructor.lastnames}`
                        return (
                            <div key={id} className={`image-container !flex flex-col justify-center items-center ${instructor !== actualInstructor ? 'blur' : ''}`} onClick={() => changeInstructor(instructor)} >
                                <img src={userImg} alt={names} className='rounded-s-lg h-auto w-full sm:w-2/3 border-solid border-2 border-transparent' />
                                <p className="image-name text-md sm:text-lg md:text-xl sm:w-28 md:w-40 text-center mt-4 overflow-hidden text-ellipsis whitespace-nowrap w-20">{names}</p>
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
                        disable={!allOptionsValid}
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
