import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AddQuestionSvg, ImportQuestionSvg, DeleteQuestionSvg, ExcelSvg } from '../assets/Assets.jsx';
import { Options, BarsChart, PiesChart } from '../components/Components';
import '../question.css';
import Swal from 'sweetalert2';
import agro360Axios from '../config/agro360Axios.jsx';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const CreateQuest = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [title, setTitle] = useState('');
    const [descrip, setDescrip] = useState('');
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([[['question', ""], ['type', ""], ['options', ['']]]]);
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
        if (titleParam && descripParam && topicParam) {
            localStorage.setItem('title', titleParam);
            localStorage.setItem('descrip', descripParam);
            localStorage.setItem('topic', topicParam);
        }
    }, [])

    useEffect(() => {
        setTitle(localStorage.getItem('title'));
        setDescrip(localStorage.getItem('descrip'));
        setTopic(localStorage.getItem('topic'));
        agro360Axios('forms/questions/questiontypes').then((response) => {
            setQuestionsType(response.data);
        });
    }, [])

    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[2][1].push('');
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
        window.scrollBy({
            top: 40,
            left: 0,
            behavior: 'smooth'
        });
    };

    const addQuestion = () => {
        setQuestions([...questions, [['question', ""], ['type', ""], ['options', ['']]]]);
        window.scrollBy({
            top: window.scrollY,
            left: 0,
            behavior: 'smooth'
        });
    };

    const deleteOption = (id, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        updatedQuestions[questionIndex][2][1] = currentQuestion[2][1].filter((_, index) => index !== id);
        setQuestions(updatedQuestions);
    };

    const deleteQuestion = (questionIndex) => {
        const updatedQuestion = [...questions];
        setQuestions(updatedQuestion.filter((_, index) => index !== questionIndex));
    }

    const handleQuestionChange = (value, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[0][1] = value;
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (value, questionIndex) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        currentQuestion[1][1] = value;
        if (questionTypeValue[value] === 'scaleRikert' || questionTypeValue[value] === 'scaleRating') {
            currentQuestion[2][1] = [['', '']];
            setOptionsAdded(() => !optionsAdded);
        }
        if (questionTypeValue[currentQuestion[1][1]] === 'text' || questionTypeValue[currentQuestion[1][1]] === 'radio' || questionTypeValue[currentQuestion[1][1]] === 'checkbox' || questionTypeValue[currentQuestion[1][1]] === 'scaleSemantic') {
            const array2 = ['', ''];
            if (currentQuestion[2][1][0].length == array2.length && currentQuestion[2][1][0].every(function (v, i) { return v = '' === array2[i] })) {
                currentQuestion[2][1] = [''];
            }
        }
        if (questionTypeValue[value] === 'text') {
            currentQuestion[2][1] = [''];
            setOptionsAdded(() => !optionsAdded);
        }
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value, indexContent) => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[questionIndex];
        if (questionTypeValue[currentQuestion[1][1]] === 'scaleRikert' || questionTypeValue[currentQuestion[1][1]] === 'scaleRating') {
            currentQuestion[2][1][optionIndex][indexContent] = value;
        } else {
            currentQuestion[2][1][optionIndex] = value;
        }
        updatedQuestions[questionIndex] = currentQuestion;
        setQuestions(updatedQuestions);
    };


    let optionss = [];
    const arraytoObject = (array) => {
        var newObject = {};
        for (let i = 0; i < array.length; i++) {
            newObject[array[i][0]] = array[i][1];
        }

        for (let i of Object.keys(array[2][1])) {
            const key = `option`;
            const value = array[2][1][i];
            const optionObject = { [key]: value };
            optionss.push(optionObject);
        }
        newObject[array[2][0]] = optionss;
        optionss = [];
        return newObject;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isContentValid = false;
        let isTypeValid = false;
        let isOptionValid = false;
        questions.forEach((question) => {
            if (question[0][1] == '') {
                setValidationQuestionContent(true);
                isContentValid = false;
            } else {
                setValidationQuestionContent(false);
                isContentValid = true;
            }

            if (question[1][1] == '') {
                setValidationQuestionType(true);
                isTypeValid = false;
            } else {
                setValidationQuestionType(false);
                isTypeValid = true;
            }
            question[2][1].forEach((option) => {
                if (option.length < 2 || option[0] == '' || option[1] == '') {
                    setValidationQuestionOption(true);
                    isOptionValid = false;
                } else {
                    setValidationQuestionOption(false);
                    isOptionValid = true;
                }
            });
        });
        if (isContentValid && isTypeValid && isOptionValid) {
            try {
                let questionsObject = []
                questions.map((question) => {
                    questionsObject.push(arraytoObject(question));
                })
                agro360Axios.post('api/forms', {
                    name: title, description: descrip, topic: '654481cd0223fc9db9532bf9', creator: '6558096819d178e8586c6244',
                    questions: questionsObject
                }).then((response) => {
                    switch (response.data.response) {
                        case 'Form created successfully':
                            Swal.fire({
                                icon: 'success',
                                title: 'Encuesta creada!',
                                text: 'Se ha guardado la encuesta exitosamente',
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(() => {
                                window.location.href = '/crear-formulario';
                                localStorage.clear();
                            }, 2100);
                            break;
                    }
                }).catch((error) => {
                    switch (error.response.data.msg) {
                        case 'Form already exists':
                            Swal.fire({
                                icon: 'error',
                                title: 'Encuesta duplicada',
                                text: 'La encuesta que deseas registrar ya existe, intentalo mas tarde',
                                showConfirmButton: true,
                            });
                            break;
                    }
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error,
                    showConfirmButton: true
                });
            }
        }
    };

    const handleBlur = () => {

    };

    return (
        <aside>
            <section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
                <div className='border-[#39A900] text-[#39A900] font-bold border-b-[3px] w-full text-center pb-1'>Preguntas</div>
            </section>
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
                                        value={question[0][1]}
                                        onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
                                        onBlur={handleBlur}
                                    />
                                    <select
                                        className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
                                        value={question[1][1]}
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
                                    <span className={`${question[0][1] === '' && validationQuestionContent ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Este campo es obligatorio</span>
                                    <span className={`${question[1][1] === '' && validationQuestionType ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Seleccione un elemento de la lista</span>
                                </div>
                                <div className='px-10'>
                                    {question[2][1].map((option, index) => (
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
                                    {question[1][1] && (questionTypeValue[question[1][1]] !== 'scaleRikert' && questionTypeValue[question[1][1]] !== 'scaleRating' && questionTypeValue[question[1][1]] !== 'text') && (
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
        </aside>
    )
}

export default CreateQuest;