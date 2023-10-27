import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import addQuestionSvg from '../assets/Add.svg';
import importQuestionSvg from '../assets/Import.svg';
import Options from '../components/Options';

const CreateQuest = () => {

    const [state, setState] = useState(true);
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [optionsAdded, setOptionsAdded] = useState(false);

    useEffect(() => {
        setQuestions([questionType, question, options])
    }, [question, options, questionType])


    const changeQuestions = () => {
        setState(true);
    };

    const changeAnswer = () => {
        setState(false);
    };

    useEffect(() => {
        setOptionsAdded(false);
    }, [questionType])
    
    useEffect(() => {
        setOptions([]);
    }, [questionType !== '3']);
    
    const addOption = () => {
        if (questionType !== '3') {
            setOptions([...options, '']);
        } else {
            if (!optionsAdded) {
                setOptions([...options, '']);
                setOptionsAdded(true);
            }
        }
    };


    const addQuestion = () => {
        setQuestions(...questions, questions);
    };

    const deleteOption = (id) => {
        setOptions(options.filter((option) => option !== id));
        console.log(id);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
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
                        <div className='p-2 py-4 text-center border-2 border-gray-400 rounded-md flex flex-col gap-5 shadow-lg'>
                            <h1 className='text-4xl font-bold'>Titulo de la encuesta</h1>
                            <h1 className='text-2xl'>Descripcion de la encuesta. Lorem ipsum dolor sit amet consectetur adipisicing elit. repellendus quidem labore culpa</h1>
                            <h1 className='text-xl text-[#39A900]'>Tematica de la encuesta</h1>
                        </div>
                        <div className='w-full flex flex-col justify-start mx-auto gap-10'>
                            <div className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-10'>
                                <div className='flex justify-between px-10'>
                                    <input
                                        placeholder='Digite la pregunta'
                                        className='border-b-2 p-2 border-gray-400 w-3/6'
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                    <select
                                        className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
                                        value={questionType}
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <option value="">Seleccione el tipo de pregunta</option>
                                        <option value="1">Seleccion Unica</option>
                                        <option value="2">Seleccion Multiple</option>
                                        <option value="3">Escala de rikert</option>
                                        <option value="4">No se juasjuas</option>
                                    </select>
                                </div>
                                <div>
                                    <div className='px-10'>
                                        {options.map((option, index) => (
                                            <Options
                                                key={index + 1}
                                                index={index}
                                                questionType={questionType}
                                                option={option}
                                                handleOptionChange={handleOptionChange}
                                                addOption={addOption}
                                                deleteOption={deleteOption}
                                            />
                                        ))}
                                        {questionType ? (
                                            <div className='flex justify-end'>
                                                <button onClick={addOption} className="border-2 p-2 rounded left-1 top-0">Agregar Opción</button>
                                            </div>
                                        ) : ''}
                                    </div>
                                </div>
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
            ) : (
                <>
                    <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10'>
                        <div className='p-2 py-4 text-center border-2 border-gray-400 rounded-md flex flex-col gap-5 shadow-lg'>
                            <h1 className='text-4xl font-bold'>Respuestas de la encuesta</h1>
                            <h1 className='text-2xl'>Moises Garcia</h1>
                        </div>
                        <div className='w-full flex flex-col justify-start mx-auto gap-10'>
                            <div className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-10'>
                                <p>Respuestas</p>
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