import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRoles } from '../../../context/RolesContext';
import { useForms } from '../../../context/FormsContext';
import OptionsQuest from './components/OptionsQuest';
import Swal from 'sweetalert2';
import {
    AddQuestionSvg,
    ImportQuestionSvg,
    DeleteQuestionSvg
} from '../../../assets/Assets';
import { Spinner } from '../../../components/Components';

const EditQuest = () => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [topic, setTopic] = useState(''); //Topics
    const [questionsType, setQuestionsType] = useState([]); //Question Types
    const { getTopics, getTopic } = useRoles();
    const [role, setRole] = useState('');
    const { getForm, updateForm, getQuestionsType } = useForms();
    const [validationQuestionContent, setValidationQuestionContent] = useState(false);
    const [validationQuestionType, setValidationQuestionType] = useState(false);
    const [validationQuestionOption, setValidationQuestionOption] = useState(false);
    const questionTypeValue = {};
    const [quest, setQuest] = useState([]);

    useEffect(() => {
        const questionType = async () => {
            const res = await getQuestionsType();
            setQuestionsType(res)
        }
        questionType();
    }, [])

    useEffect(() => {
        const Form = async () => {
            const res = await getForm(params.id);
            const resTopic = await getTopic(res.topic);
            setQuest([res]);
            setLoading(false);
            setTopic(resTopic.name);
            setRole(resTopic.role);
        }
        Form();
    }, [])


    //* ------------- NAME, DESCRIPTION, DATEEND -------------
    const handleNameChange = (value) => {
        const updatedQuestions = [...quest];
        updatedQuestions[0].name = value;
        setQuest(updatedQuestions);
    }

    const handleDescriptionChange = (value) => {
        const updatedQuestions = [...quest];
        updatedQuestions[0].description = value;
        setQuest(updatedQuestions);
    }

    const handleDateEndChange = (value) => {
        const updatedQuestions = [...quest];
        updatedQuestions[0].end = value;
        setQuest(updatedQuestions);
    }
    //* ------------- NAME, DESCRIPTION, DATEEND -------------


    //* ------------- QUESTION -------------
    const addQuestion = () => {
        const updatedQuestions = [...quest];
        updatedQuestions[0].questions.push({ 'question': "", 'type': "", 'options': [{ 'option': '' }] })
        setQuest(updatedQuestions)
        window.scrollBy({
            top: window.scrollY,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleQuestionChange = (value, questionIndex) => {
        const updatedQuestions = [...quest];
        const currentQuestion = updatedQuestions[0].questions[questionIndex];
        currentQuestion.question = value;
        updatedQuestions[0].questions[questionIndex] = currentQuestion;
        setQuest(updatedQuestions);
    };

    const deleteQuestion = (questionIndex) => {
        const updatedQuestion = [...quest];
        const questionsSaved = updatedQuestion[0].questions.filter((_, index) => index !== questionIndex);
        updatedQuestion[0].questions = questionsSaved;
        setQuest(updatedQuestion);
    };
    //* ------------- QUESTION -------------

    //* ------------- OPTION -------------
    const addOption = (questionIndex) => {
        const updatedQuestions = [...quest];
        const currentQuestion = updatedQuestions[0].questions[questionIndex];
        currentQuestion.options.push({ 'option': '' });
        updatedQuestions[0].questions[questionIndex] = currentQuestion;
        setQuest(updatedQuestions);
        window.scrollBy({
            top: 40,
            left: 0,
            behavior: 'smooth'
        });
    };

    const deleteOption = (id, questionIndex) => {
        const updatedQuestions = [...quest];
        const currentQuestion = updatedQuestions[0].questions[questionIndex];
        updatedQuestions[0].questions[questionIndex].options = currentQuestion.options.filter((_, index) => index !== id);
        setQuest(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...quest];
        console.log(quest);
        const currentQuestion = updatedQuestions[0].questions[questionIndex];
        currentQuestion.options[optionIndex] = { 'option': value };
        updatedQuestions[0].questions[questionIndex] = currentQuestion;
        setQuest(updatedQuestions);
    };
    //* ------------- OPTION -------------

    //* ------------- QUESTIONTYPE -------------
    if (questionsType) {
        questionsType.map((questionType) => {
            questionTypeValue[questionType._id] = questionType.name;
        })
    }

    const handleQuestionTypeChange = (value, questionIndex) => {
        const updatedQuestions = [...quest];
        const currentQuestion = updatedQuestions[0].questions[questionIndex];
        currentQuestion.type = value;
        if (questionTypeValue[value] === 'Escala de Likert') {
            currentQuestion.options = [{ 'option': 'scale' }];
        }
        else if (questionTypeValue[value] == 'Respuesta Abierta') {
            currentQuestion.options = [{ 'option': 'text' }];
        }
        else {
            if (questionTypeValue[value] == 'Respuesta Abierta' || questionTypeValue[value] == 'Escala de Likert') {
                currentQuestion.options = [{ 'option': '' }];
            }
        }
        updatedQuestions[0].questions[questionIndex] = currentQuestion;
        setQuest(updatedQuestions);
    };
    //* ------------- QUESTIONTYPE -------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isContentValid = 0;
        let isTypeValid = 0;
        let isOptionValid = 0;
        quest[0].questions.forEach((question) => {
            if (question.question != '') {
                setValidationQuestionContent(true);
                isContentValid += 1;
            }
            if (question.type != '') {
                setValidationQuestionType(true);
                isTypeValid += 1;
            }
            question.options.forEach((option) => {
                if (option.length != '' || option.length < 2) {
                    setValidationQuestionOption(true);
                    isOptionValid += 1;
                }
            });
        });
        if ((isContentValid && isTypeValid && isOptionValid) == quest[0].questions.length) {
            try {
                await updateForm(params.id, quest[0]);
                await Swal.fire({
                    icon: 'success',
                    title: 'Encuesta actualizada!',
                    text: 'Se ha actualizado la encuesta exitosamente',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    window.location.href = `/inicio/tematicas/${role}/encuestas/${quest[0].topic}`;
                    localStorage.removeItem('title');
                    localStorage.removeItem('descrip');
                    localStorage.removeItem('topic');
                    localStorage.removeItem('date');
                    localStorage.removeItem('questions');
                }, 2100);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la encuesta',
                    text: error.response.data.message,
                    showConfirmButton: true,
                });
            }
        }
    };

    if (loading) { return <Spinner /> }

    return (
        <aside>
            <section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
                <div className='border-[#39A900] text-[#39A900] font-bold border-b-[3px] w-full text-center pb-1'>Preguntas</div>
            </section>
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-full lg:w-3/4 mx-auto gap-10 mb-20 px-3 md:px-10'>
                    <header className='p-2 py-4 text-center border-2 rounded-md flex flex-col gap-5 shadow-lg'>
                        <section>
                            <input
                                className='border-0 border-b-2 focus:rounded-md border-gray-400 text-lg w-full md:w-5/6' type="text" value={quest[0].name}
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </section>
                        <section>
                            <input
                                className='border-0 border-b-2 focus:rounded-md border-gray-400  text-lg w-full md:w-5/6' type="text" value={quest[0].description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />
                        </section>
                        <div className='flex items-center justify-evenly'>
                            <h1 className='text-xl text-[#39A900]'>{topic}</h1>
                            <input
                                className='border-0 border-b-2 focus:rounded-md border-gray-400 text-lg w-full md:w-[34%]' type="datetime-local" value={quest[0].end.split('.')[0]}
                                onChange={(e) => handleDateEndChange(e.target.value)}
                            />
                        </div>
                    </header>
                    {quest[0].questions.map((question, questionIndex) => (
                        <div
                            className='w-full flex flex-col justify-start mx-auto gap-10'
                            key={questionIndex}
                        >
                            <div className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-2'>
                                <div className='flex flex-col md:flex-row lg:flex-row justify-between px-0 md:px-10 lg:px-10 gap-4'>
                                    <input
                                        name={`quest.${questionIndex}.question`}
                                        placeholder='Digite la pregunta'
                                        className='border-b-2 p-2 border-gray-400 w-full md:w-3/6 lg:w-3/6 transition-all'
                                        value={question.question}
                                        onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
                                    />
                                    <select
                                        className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
                                        value={question.type}
                                        onChange={(e) => handleQuestionTypeChange(e.target.value, questionIndex)}
                                    >
                                        <option value="6556ddbbfe823a88d48fafc4">Escala de Likert</option>
                                    </select>
                                    <div className='cursor-pointer my-auto lg:hover:scale-110 transition-all'
                                        onClick={() => deleteQuestion(questionIndex)}
                                    >
                                        <img src={DeleteQuestionSvg} />
                                    </div>
                                </div>
                                <div className='px-10 text-red-500 flex flex-col md:flex-row xl:flex-row justify-around select-none'>
                                    <span
                                        className={`${question.question == '' && validationQuestionContent ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}
                                    >
                                        Este campo es obligatorio
                                    </span>
                                    <span
                                        className={`${question.type == '' && validationQuestionType ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}
                                    >
                                        Seleccione un elemento de la lista
                                    </span>
                                </div>
                                <div className='px-0 md:px-10 lg:px-10'>
                                    {question.options.map((option, index) => (
                                        <OptionsQuest
                                            params={params}
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
                                    {question.type && (questionTypeValue[question.type] !== 'Escala de Likert' && questionTypeValue[question.type] !== 'Escala de Puntuación' && questionTypeValue[question.type] !== 'Respuesta Abierta') && (
                                        <div className='flex justify-between my-5 cursor-pointer place-items-center'>
                                            <span className={`${question.options.length < 3 && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-red-500`}>Las pregunta debe contener al menos tres opciones</span>
                                            <div onClick={() => addOption(questionIndex)} className="border-2 p-2 rounded left-1 top-0 cursor-pointer">Agregar Opción</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <section>
                    <button
                        type='submit'
                        className='fixed bottom-8 right-1 lg:right-6 bg-[#39A900] px-7 py-2 text-white rounded-lg'
                    >
                        Guardar
                    </button>
                </section>
            </form>
            <section className='fixed bottom-20  right-1 lg:right-28 bg-white p-2 rounded-xl border-2 shadow-xl'>
                <div className='flex flex-col gap-5 place-items-center'>
                    <button
                        onClick={addQuestion}
                    >
                        <img className='max-w-8 hover:scale-110 transition-all' src={AddQuestionSvg} />
                    </button>
                    <button>
                        <img className='max-w-10 hover:scale-110 transition-all' src={ImportQuestionSvg} />
                    </button>
                </div>
            </section>
        </aside>
    )
}

export default EditQuest