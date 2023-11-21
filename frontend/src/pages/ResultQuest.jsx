import React from 'react';
import '../question.css';
import { useState, useEffect } from 'react';
import { Options, BarsChart, PiesChart, CardForm } from '../components/Components';
import { AddQuestionSvg, ImportQuestionSvg, DeleteQuestionSvg, ExcelSvg } from '../assets/Assets.jsx';
import { useParams } from 'react-router-dom';
import agro360Axios from '../config/agro360Axios.jsx';

const ResultQuest = () => {
    const { idQuest } = useParams();
    const [data, setData] = useState([]);
    const [dataForm, setDataForm] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [userSelect, setUserSelect] = useState('');

    const [users, setUsers] = useState({});
    const Users = [];

    useEffect(() => {
        try {
            agro360Axios(`/responses/${idQuest}`).then((response) => {
                setData(response.data);
            })
            agro360Axios(`/forms/${idQuest}`).then((response) => {
                setDataForm(response.data);
            })
        } catch (error) {
            console.log(error);
        }
        setCargando(false);

        let answers = [];
        data.map((result) => {
            result['answers'].map((question) => {
                // if (question.question === question.question) {
                //     answers.push(question['answer']);
                // }
                // console.log(question);
            })
            // console.log(answers);
            // result['answers'] = answers;
            // console.log(result['answers']);
        })
    }, []);

    useEffect(() => {
        agro360Axios('/users').then((result) => {
            setUsers(result.data);
        });
    }, [userSelect])

    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        const key = element._id;
        const value = `${element.names} ${element.lastnames}`
        const option = { [key]: value };
        Users.push(option);
    }

    const userName = (idUser) => {
        Users.filter((users) => {
            console.log(users[idUser]);
            return users[idUser];
        })
    }

    const handleUserChange = (value) => {
        setUserSelect(value);
        console.log(userSelect);
    };


    if (cargando) { return 'Cargando...' }
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

                <div className='p-5 py-6 flex gap-5 shadow-lg justify-evenly rounded-md border-2'>
                    <div className='text-h text-center'>
                        <a href='#' className='mr-3'>General</a>
                        <a href='#' className='mr-3'>Individual</a>
                    </div>
                    <div className='text-h text-center'>
                        <select
                            value={userSelect}
                            onChange={(e) => handleUserChange(e.target.value)}
                        >
                            <option value="">Seleccione el usuario</option>
                            {data.map((user) => (
                                <option value={user.user}>{userName(user.user)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {data.filter((answer) => answer.user === userSelect).map((result) => (
                    <div key={result._id} className="flex-row">
                        {result['answers'].map((answer) => (
                            <div key={answer._id} className="response w-full mb-8">
                                <div>
                                    <div className="text-wrapper-10">{answer.question}</div>
                                    <div className="text-wrapper-9">{result.answers.length} respuestas</div>
                                </div>
                                <div className='mt-20 px-10 text-2xl'>
                                    <div className="">{answer.answer}</div>
                                </div>
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