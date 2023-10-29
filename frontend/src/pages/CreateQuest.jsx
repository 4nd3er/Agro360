import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import addQuestionSvg from '../assets/Add.svg';
import importQuestionSvg from '../assets/Import.svg';
import DeleteQuestionSvg from '../assets/delete.svg';
import Options from '../components/Options';
import Sobresalir from '../assets/sobresalir 1.svg';
import BarsChart from '../components/BarsChart'
import PiesChart from '../components/PiesChart';
import '../question.css';

const CreateQuest = () => {

    const [state, setState] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [optionsAdded, setOptionsAdded] = useState(false);

    const changeQuestions = () => {
        setState(true);
    };

    const changeAnswer = () => {
        setState(false);
    };

    // useEffect(() => {
    //     const updatedQuestions = [...questions];
    //     const currentQuestion = updatedQuestions[questionIndex];
    //     currentQuestion[1] = questionType;
    //     setOptionsAdded(false);
    // }, [questionType])

    useEffect(() => {
        questions.map((question, index) => {
            if (question[1] === 'scala') {
                const updatedQuestions = [...questions];
                const currentQuestion = updatedQuestions[index];
                currentQuestion[2] = [''];
                updatedQuestions[index] = currentQuestion;
                setQuestions(updatedQuestions);
            }
        })
    }, [optionsAdded]);

    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        if (currentQuestion[1] !== 'scala' || (!optionsAdded && questions.length - 1 === questionIndex)) {
            currentQuestion[2].push('');
            updatedQuestions[questionIndex] = currentQuestion;
            setQuestions(updatedQuestions);
            setOptionsAdded(true);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, ["", "", ['']]]);
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

    const handleOptionChange = (optionIndex, value, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[2][optionIndex] = value;
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

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
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
        setOptionsAdded(() => (!optionsAdded));
    };


    return (
        <aside>
            <section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
                <Link onClick={changeQuestions} className={`${state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Preguntas</Link>
                <Link onClick={changeAnswer} className={`${!state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Respuestas</Link>
            </section>
            {state ? (
                <>
                    <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10'>
                        <div className='p-2 py-4 text-center border-2 rounded-md flex flex-col gap-5 shadow-lg'>
                            <h1 className='text-4xl font-bold'>Titulo de la encuesta</h1>
                            <h1 className='text-2xl'>Descripcion de la encuesta. Lorem ipsum dolor sit amet consectetur adipisicing elit. repellendus quidem labore culpa</h1>
                            <h1 className='text-xl text-[#39A900]'>Tematica de la encuesta</h1>
                        </div>
                        <div className='w-full flex flex-col justify-start mx-auto gap-10'>
                            {questions.map((question, indexx) => (
                                <div
                                    key={indexx + 1}
                                    className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-10'
                                >
                                    <div className='flex justify-between px-10'>
                                        <input
                                            placeholder='Digite la pregunta'
                                            className='border-b-2 p-2 border-gray-400 w-3/6'
                                            value={question[0]}
                                            onChange={(e) => handleQuestionChange(e.target.value, indexx)}
                                        />
                                        <select
                                            className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
                                            value={question[1]}
                                            onChange={(e) => handleQuestionTypeChange(e.target.value, indexx)}
                                        >
                                            <option value="">Seleccione el tipo de pregunta</option>
                                            <option value="radio">Seleccion Unica</option>
                                            <option value="checkbox">Seleccion Multiple</option>
                                            <option value="scala">Escala de rikert</option>
                                            <option value="4">No se juasjuas</option>
                                        </select>
                                        <button onClick={() => deleteQuestion(indexx)}>
                                            <img src={DeleteQuestionSvg} />
                                        </button>
                                    </div>
                                    <div className='px-10'>
                                        {question[2].map((option, index) => (
                                            <Options
                                                key={index + 1}
                                                indexx={indexx}
                                                index={index}
                                                option={option}
                                                question={question}
                                                handleOptionChange={handleOptionChange}
                                                addOption={addOption}
                                                deleteOption={deleteOption}
                                            />
                                        ))}
                                        {question[1] && question[1] !== 'scala' ? (
                                            <div className='flex justify-end mb-5'>
                                                <button onClick={() => addOption(indexx)} className="border-2 p-2 rounded left-1 top-0">Agregar Opción</button>
                                            </div>
                                        ) : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className='fixed right-28 bottom-20 bg-white p-2 rounded-xl border-2 shadow-xl'>
                        <div className='flex flex-col gap-5 place-items-center'>
                            <Link
                                onClick={addQuestion}
                            >
                                <img className='max-w-8' src={addQuestionSvg} />
                            </Link>
                            <Link>
                                <img className='max-w-10' src={importQuestionSvg} />
                            </Link>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10'>
                        <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <h1 className='text-4xl'>Respuestas de la encuesta</h1>
                                <img src={Sobresalir} alt="Descripción de la imagen" className="w-10 h-auto" />
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
                                <img className='max-w-8' src={addQuestionSvg} />
                            </Link>
                            <Link>
                                <img className='max-w-10' src={importQuestionSvg} />
                            </Link>
                        </div>
                    </section>
                </>
            )}
        </aside>
    )
}

export default CreateQuest