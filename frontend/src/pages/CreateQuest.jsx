import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AddQuestionSvg, ImportQuestionSvg, DeleteQuestionSvg, ExcelSvg } from '../assets/Assets.jsx';
import { Options, BarsChart, PiesChart } from '../components/Components';
import '../question.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateQuest = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [title, setTitle] = useState('');
    const [descrip, setDescrip] = useState('');
    const [topic, setTopic] = useState('');
    const [state, setState] = useState(true);
    const [questions, setQuestions] = useState([["", "", ['']]]);
    const [optionsAdded, setOptionsAdded] = useState(false);
    const [questionsType, setQuestionsType] = useState([]);
    const [validationQuestionContent, setValidationQuestionContent] = useState(false);
    const [validationQuestionType, setValidationQuestionType] = useState(false);
    const [validationQuestionOption, setValidationQuestionOption] = useState(false);

    const questionTypeValue = {
        '654058b803a2be5f286df7b8': 'text',
        '6540651189e8593b88d3848e': 'radio',
        '6556dd95fe823a88d48fafc3': 'checkbox',
        '6556ddbbfe823a88d48fafc4': 'scaleRikert',
        '6556de54fe823a88d48fafc5': 'scaleRating',
        '6556de7afe823a88d48fafc6': 'scaleSemantic'
    }

    useEffect(() => {
        const titleParam = searchParams.get('titulo');
        const descripParam = searchParams.get('descripcion');
        const topicParam = searchParams.get('opciones');
        if (titleParam) {
            localStorage.setItem('title', titleParam);
        }

        if (descripParam) {
            localStorage.setItem('descrip', descripParam);
        }

        if (topicParam) {
            localStorage.setItem('topic', topicParam);
        }
    }, [searchParams])

    useEffect(() => {
        setTitle(localStorage.getItem('title'));
        setDescrip(localStorage.getItem('descrip'));
        setTopic(localStorage.getItem('topic'));
        axios('http://localhost:4000/api/forms/questions/questiontypes').then((response) => {
            setQuestionsType(response.data);
        });
    }, [])

    const changeQuestions = () => {
        setState(true);
    };

    const changeAnswer = () => {
        setState(false);
    };

    useEffect(() => {
        questions.map((question, index) => {
            const updatedQuestions = [...questions];
            const currentQuestion = updatedQuestions[index];
            if (questionTypeValue[question[1]] === 'scaleRikert' || questionTypeValue[question[1]] === 'scaleRating') {
                currentQuestion[2] = [['', '']];
            }
            if (questionTypeValue[question[1]] === 'text' || questionTypeValue[question[1]] === 'radio' || questionTypeValue[question[1]] === 'checkbox' || questionTypeValue[question[1]] === 'scaleSemantic') {
                currentQuestion[2] = [''];
            }
            console.log(currentQuestion[2]);
            updatedQuestions[index] = currentQuestion;
            setQuestions(updatedQuestions);
        })
    }, [optionsAdded]);

    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[2].push('');
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
        // if (window.scrollY >= window.scrollY / 2) {
        //     window.scrollBy({
        //         top: window.scrollY,
        //         left: 0,
        //         behavior: 'smooth'
        //     });
        // }
    };

    const addQuestion = () => {
        setQuestions([...questions, ["", "", ['']]]);
        window.scrollBy({
            top: window.scrollY,
            left: 0,
            behavior: 'smooth'
        });
    };

    const deleteOption = (id, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        updatedQuestions[questionIndex][2] = currentQuestion[2].filter((_, index) => index !== id);
        setQuestions(updatedQuestions);
    };

    const deleteQuestion = (questionIndex) => {
        const updatedQuestion = [...questions];
        setQuestions(updatedQuestion.filter((_, index) => index !== questionIndex));
    }

    const handleQuestionChange = (value, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[0] = value;
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (value, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[1] = value;
        if (questionTypeValue[value] === 'scaleRikert' || questionTypeValue[value] === 'scaleRating') {
            currentQuestion[2] = [['', '']];
            setOptionsAdded(() => !optionsAdded);
        }
        if (questionTypeValue[value] === 'text') {
            setOptionsAdded(() => !optionsAdded);
        }
        if (questionTypeValue[currentQuestion[1]] === 'text' || questionTypeValue[currentQuestion[1]] === 'radio' || questionTypeValue[currentQuestion[1]] === 'checkbox' || questionTypeValue[currentQuestion[1]] === 'scaleSemantic') {
            const array2 = ['', ''];
            if (currentQuestion[2][0].length == array2.length && currentQuestion[2][0].every(function (v, i) { return v = '' === array2[i] })) {
                currentQuestion[2] = [''];
            }
        }
        console.log(currentQuestion[2]);
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value, indexContent) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        if (questionTypeValue[currentQuestion[1]] === 'scaleRikert' || questionTypeValue[currentQuestion[1]] === 'scaleRating') {
            currentQuestion[2][optionIndex][indexContent] = value;
        } else {
            currentQuestion[2][optionIndex] = value;
        }
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        questions.map((question) => {
            question[0] === '' && setValidationQuestionContent(true);
            question[1] === '' && setValidationQuestionType(true);
            question[2].map((option) => {
                option === '' && setValidationQuestionOption(true);
                option.map((content) => {
                    content === '' && setValidationQuestionOption(true);
                })
            })
        })
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Encuesta Guardada',
        //     text: 'Se ha guardado la encuesta satisfactoriamente!',
        //     timer: 2000,
        //     showConfirmButton: false
        // })
        // setTimeout(() => {
        //     window.location.href = '/crear-formulario';
        //     localStorage.clear();
        // }, 2100); // ? redigire a la pagina de crear formulario
        // * NO ELIMINAR
    };

    const handleBlur = () => {

    };

    return (
        <aside>
            <section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
                <Link onClick={changeQuestions} className={`${state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Preguntas</Link>
                <Link onClick={changeAnswer} className={`${!state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Respuestas</Link>
            </section>
            {state ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10 mb-20'>
                            <div className='p-2 py-4 text-center border-2 rounded-md flex flex-col gap-5 shadow-lg'>
                                <h1 className='text-4xl font-bold'>{title}</h1>
                                <h1 className='text-2xl'>{descrip}</h1>
                                <h1 className='text-xl text-[#39A900]'>{topic}</h1>
                            </div>
                            <div className='w-full flex flex-col justify-start mx-auto gap-10'>
                                {questions.map((question, questionIndex) => (
                                    <div
                                        key={questionIndex + 1}
                                        className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-2'
                                    >
                                        <div className='flex justify-between px-10'>
                                            <input
                                                placeholder='Digite la pregunta'
                                                className='border-b-2 p-2 border-gray-400 w-3/6'
                                                value={question[0]}
                                                onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
                                                onBlur={handleBlur}
                                            />
                                            <select
                                                className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
                                                value={question[1]}
                                                onChange={(e) => handleQuestionTypeChange(e.target.value, questionIndex)}
                                            >
                                                <option value="">Seleccione el tipo de pregunta</option>
                                                {questionsType.map((questionType) => (
                                                    <option value={questionType._id}>{questionType.name}</option>
                                                ))}

                                            </select>
                                            <div className='cursor-pointer my-auto' onClick={() => deleteQuestion(questionIndex)}>
                                                <img src={DeleteQuestionSvg} />
                                            </div>
                                        </div>
                                        <div className='px-10 mb-5 text-red-500 flex justify-around select-none'>
                                            <span className={`${question[0] === '' && validationQuestionContent ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Este campo es Obligatorio</span>
                                            <span className={`${question[1] === '' && validationQuestionType ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Seleccione un elemento de la lista</span>
                                        </div>
                                        <div className='px-10'>
                                            {question[2].map((option, index) => (
                                                <Options
                                                    key={index + 1}
                                                    questionIndex={questionIndex}
                                                    index={index}
                                                    option={option}
                                                    question={question}
                                                    handleOptionChange={handleOptionChange}
                                                    addOption={addOption}
                                                    deleteOption={deleteOption}
                                                    questionTypeValue={questionTypeValue}
                                                    validationQuestionOption={validationQuestionOption}
                                                />
                                            ))}
                                            {question[1] && (questionTypeValue[question[1]] !== 'scaleRikert' && questionTypeValue[question[1]] !== 'scaleRating' && questionTypeValue[question[1]] !== 'text') && (
                                                <div className='flex justify-end mb-5 cursor-pointer'>
                                                    <div onClick={() => addOption(questionIndex)} className="border-2 p-2 rounded left-1 top-0 cursor-pointer">Agregar Opción</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section>
                            <button
                                type='submit'
                                className='fixed bottom-8 right-6 bg-[#39A900] px-3 py-2 text-white rounded-lg'
                            >
                                Guardar
                            </button>
                        </section>
                    </form>
                    <section className='fixed right-28 bottom-20 bg-white p-2 rounded-xl border-2 shadow-xl'>
                        <div className='flex flex-col gap-5 place-items-center'>
                            <button onClick={addQuestion}>
                                <img className='max-w-8' src={AddQuestionSvg} />
                            </button>
                            <button>
                                <img className='max-w-10' src={ImportQuestionSvg} />
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10'>
                        <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <h1 className='text-4xl'>Respuestas de la encuesta</h1>
                                <img src={ExcelSvg} alt="Descripción de la imagen" className="w-10 h-auto" />
                            </div>
                            <h1 className='text-2xl font-bold '>Moises Garcia</h1>

                            <div className='text-h text-center'>
                                <a href='#' className='mr-3'>General</a>
                                <a href='#' className='mr-3'>Individual</a>

                            </div>
                        </div>

                        <div className="response w-full">
                            <div className="text-wrapper-10">Califique a (nombre)/califíquese usted en cuanto a su búsqueda de resultados, en comparación con sus compañeros:</div>
                            <div className="text-wrapper-9">200 respuestas</div>
                            <div className='mt-16'>
                                <BarsChart />
                            </div>

                        </div>

                        <div className="response w-full">
                            <div className="text-wrapper-10">Califique a (nombre)/califíquese usted en cuanto a su búsqueda de resultados, en comparación con sus compañeros:</div>
                            <div className="text-wrapper-9">200 respuestas</div>
                            <div className='my-20 mx-auto w-4/5 h-96'>
                                <PiesChart />
                            </div>

                        </div>


                    </section>

                    <section className='fixed right-28 bottom-20 bg-white p-2 rounded-xl border-2 shadow-xl'>
                        <div className='flex flex-col gap-5 place-items-center'>
                            <Link
                                onClick={addQuestion}
                            >
                                <img className='max-w-8' src={AddQuestionSvg} />
                            </Link>
                            <Link>
                                <img className='max-w-10' src={ImportQuestionSvg} />
                            </Link>
                        </div>
                    </section>
                </>
            )}
        </aside>
    )
}

export default CreateQuest;