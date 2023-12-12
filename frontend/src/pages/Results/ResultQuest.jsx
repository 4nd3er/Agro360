import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Components';
import { ExcelSvg } from '../../assets/Assets';
import { useParams } from 'react-router-dom';
import '../../css/question.css';
import { useResponses, useForms, useUsers } from '../../context/Context.js'
import CardResult from '../../components/CardResult.jsx';

const ResultQuest = () => {
    const [dataForm, setDataForm] = useState([]);
    const [responses, setResponses] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [users, setUsers] = useState([]); // 
    const [selectedUser, setSelectedUser] = useState(null);
    const [answersUser, setAnswersUser] = useState([]);
    const [filter, setFilter] = useState(1);
    const [loading, setLoading] = useState(true);
    const { idQuest } = useParams();
    const { getForm, getFormReport } = useForms();
    const { getResponsesForm } = useResponses();
    const { getUser } = useUsers();

    const Clean = () => {
        setSelectedUser(null);
        setAnswersUser([]);
    }

    // Form
    useEffect(() => {
        const getDataForm = async () => {
            const res = await getForm(idQuest);
            setDataForm(res);
        }
        getDataForm();
    }, [])

    //Responses
    useEffect(() => {
        const getResponses = async () => {
            const res = await getResponsesForm(idQuest);
            setResponses(res);
            setLoading(false);
        }
        getResponses()
    }, [])

    //Answers
    useEffect(() => {
        const generalAnswers = []
        responses.forEach((response) => {
            response.answers.forEach((answer) => {
                const { question, instructor, answer: answerUser } = answer

                const findInstructor = generalAnswers.find((generalAnswer) => generalAnswer.instructor == instructor)
                if (!findInstructor) {
                    generalAnswers.push({
                        instructor: instructor,
                        responses: []
                    })
                }

                const findQuestion = generalAnswers.find((generalAnswer) => generalAnswer.instructor == instructor).responses.find((response) => response.question == question)
                if (!findQuestion) {
                    generalAnswers.find((generalAnswer) => generalAnswer.instructor == instructor).responses.push({
                        question: question,
                        answers: [answerUser]
                    })
                } else {
                    findQuestion.answers.push(answerUser)
                }

            })
        })
        setAnswers(generalAnswers)
    }, [responses])

    //Instructors
    useEffect(() => {
        const getInstructors = async () => {
            const instructorsList = await Promise.all(
                answers.map(async (answer) => {
                    const id = answer.instructor
                    const instructor = await getUser(id)
                    return instructor
                }))
            setInstructors(instructorsList)
        }
        getInstructors();
    }, [answers])

    //Users
    useEffect(() => {
        const getUsers = async () => {
            const usersList = await Promise.all(
                responses.map(async (response) => {
                    const id = response.user
                    const user = await getUser(id)
                    return user
                }))
            setUsers(usersList)
        }
        getUsers();
    }, [responses])

    //Answers user
    useEffect(() => {
        if (selectedUser !== null) {
            const answers = responses.filter((response) => response.user == selectedUser._id).map((response) => response.answers)
            setAnswersUser(answers[0])
        }
    }, [selectedUser])

    //Generate report
    const generateReport = () => {
        getFormReport(idQuest)
    }

    if (loading) { return <Spinner /> };

    return (
        <div>
            <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/2 mx-auto gap-10'>
                <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <h1 key={dataForm._id} className='text-4xl'>{dataForm.name}</h1>
                        <img onClick={generateReport} src={ExcelSvg} alt="Descripción de la imagen" className="w-12 py-2 h-auto cursor-pointer" />
                    </div>
                    <h2 key={dataForm._id}>{dataForm.description}</h2>
                </div>

                <div className='p-5 py-6 flex gap-5 shadow-lg justify-evenly rounded-md border-2 place-items-center'>
                    <div className='text-h text-center flex gap-2'>
                        <button
                            className={`${filter == 2 ? 'text-[#39A900] shadow-xl rounded-lg scale-110' : ''} mr-3 text-base p-2 scale-100 transition-all`}
                            onClick={() => setFilter(2)}
                        >
                            Individual
                        </button>
                        <button
                            className={`${filter == 1 ? 'text-[#39A900] shadow-xl rounded-lg scale-110' : ''} mr-3 text-base p-2 scale-100 transition-all`}
                            onClick={() => { Clean(); setFilter(1) }}
                        >
                            General
                        </button>
                    </div>
                    <div className='text-h text-center'>
                        <select
                            className={filter == 2 ? 'p-2 rounded-lg border-2' : 'hidden'}
                            onChange={(e) => {
                                users.filter((user) => { if (user._id == e.target.value) setSelectedUser(user) })
                            }}>
                            <option defaultValue value="">Seleccione el usuario</option>
                            {users.map((user) => {
                                return (
                                    <option key={user._id} value={user._id}>{`${user.names} ${user.lastnames}`}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex-row">
                    {
                        filter === 2 ? answersUser.map((answer) => {
                            return (
                                <div className="response w-full mb-8">
                                    <div>
                                        <div className="text-wrapper-10">{answer.question}</div>
                                        <div className="text-wrapper-9">123 respuestas</div>
                                    </div>
                                    <div className='mt-12 px-10 text-2xl flex flex-col gap-5 justify-center'>
                                        {answer.answer}
                                    </div>
                                </div>
                            )
                        }) :
                            answers.map((answer) => {
                                const instructor = instructors.find(instructor => instructor._id === answer.instructor)
                                const answersCount = answer.responses.map(response => response.answers.length)
                                const totalAnswers = answersCount.reduce((total, suma) => total + suma, 0)
                                const questions = answer.responses.map(response => response.question)

                                return (
                                    <CardResult
                                        answer={answer}
                                        instructor={instructor}
                                        questions={questions}
                                        totalAnswers={totalAnswers} />
                                )
                            })
                    }

                </div>
                {/* Contenedor de las respuestas en dos columnas
                {data.map((resulted) => (
                    idQuest === resulted._id && (
                        <div key={resulted._id} className="flex flex-row gap-10">
                            {resulted.questions.map((question) => (
                                <div key={question._id} className="response w-full flex flex-col">
                                    <h2 className='text-2xl'>{question.question}</h2>
                                </div>
                            ))}
                        </div>
                    )
                ))} */}
            </section>
        </div>
    );
}

export default ResultQuest