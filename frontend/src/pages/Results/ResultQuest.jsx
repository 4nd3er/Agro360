import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Components';
import { ExcelSvg } from '../../assets/Assets';
import { useParams } from 'react-router-dom';
import '../../css/question.css';
import { useResponses, useForms, useUsers } from '../../context/Context.js'

const ResultQuest = () => {
    const { idQuest } = useParams();
    const { getReponse } = useResponses();
    const { getForm } = useForms();

    const [data, setData] = useState([]);
    const [dataForm, setDataForm] = useState([]);
    const [userSelect, setUserSelect] = useState('');
    const [question, setQuestion] = useState(true);

    const { users, loading } = useUsers();
    const listUsers = {};

    const questionsIndividual = () => {
        setQuestion(true);
    };

    const questionsGeneral = () => {
        setQuestion(false);
    };

    useEffect(() => {
        const response = async () => {
            const res = await getReponse(idQuest);
            setData(res);
        };
        response();
    }, [])

    useEffect(() => {
        const form = async () => {
            const res = await getForm(idQuest);
            setDataForm(res);
        };
        form();
    }, [])

    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element['rol'] === "655b1f6df9b6aad257662a58") {
            const key = element._id;
            const value = `${element.names} ${element.lastnames}`;
            listUsers[key] = value;
        }
    }

    const handleUserChange = (value) => {
        setUserSelect(value);
    };

    const uniqueInstructors = new Set();
    data.map((result) => {
        result['answers'].map((value) => {
            uniqueInstructors.add(value.instructor);
        });
    });

    if (loading) { return <Spinner /> };
    // Función para obtener el índice de una pregunta en base al ID
    return (
        <div>
            <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/2 mx-auto gap-10'>
                <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <h1 key={dataForm._id} className='text-4xl'>{dataForm.name}</h1>
                        <img src={ExcelSvg} alt="Descripción de la imagen" className="w-12 py-2 h-auto" />
                    </div>
                    <h2 key={dataForm._id}>{dataForm.description}</h2>
                </div>

                <div className='p-5 py-6 flex gap-5 shadow-lg justify-evenly rounded-md border-2 place-items-center'>
                    <div className='text-h text-center flex gap-2'>
                        <button
                            className={`${question ? 'text-[#39A900] shadow-xl rounded-lg scale-110' : ''} mr-3 text-base p-2 scale-100 transition-all`}
                            onClick={questionsIndividual}
                        >
                            Individual
                        </button>
                        <button
                            className={`${!question ? 'text-[#39A900] shadow-xl rounded-lg scale-110' : ''} mr-3 text-base p-2 scale-100 transition-all`}
                            onClick={questionsGeneral}
                        >
                            General
                        </button>
                    </div>
                    <div className='text-h text-center'>
                        <select
                            value={userSelect}
                            onChange={(e) => handleUserChange(e.target.value)}
                            className='p-2 rounded-lg border-2'
                        >
                            <option value="">Seleccione el usuario</option>
                            {
                                [...uniqueInstructors].map((instructor) => (
                                    <option key={instructor} value={instructor}>{listUsers[instructor]}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {data.map((result) => (
                    <div key={result._id} className="flex-row">
                        {result['answers'].filter((answer) => answer.instructor === userSelect).map((answer) => (
                            <div key={answer._id} className="response w-full mb-8">
                                <div>
                                    <div className="text-wrapper-10">{answer.question}</div>
                                    {/* <div className="text-wrapper-9">{result.answers.length} respuestas</div> */}
                                </div>
                                {
                                    answer._id &&
                                    <div className='mt-20 px-10 text-2xl'>
                                        {answer.answer}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                ))}
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