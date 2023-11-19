import React from 'react';
import '../question.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Options, BarsChart, PiesChart } from '../components/Components';
import { AddQuestionSvg, ImportQuestionSvg, DeleteQuestionSvg, ExcelSvg } from '../assets/Assets.jsx';

import { useParams } from 'react-router-dom';

const ResultQuest = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios(`http://localhost:4000/api/forms`).then((response) => {
            setData(response.data);
        });
    }, []);

    const { idQuest } = useParams();

    // Función para obtener el índice de una pregunta en base al ID
    const getQuestionIndexById = (questions, questionId) => {
        return questions.findIndex((question) => question._id === questionId);
    };
    return (
        <div>
            {idQuest}
            <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/2 mx-auto gap-10'>
                <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                    <div className='flex flex-row items-center justify-between'>
                        {data.map((result) => (
                            <h1 key={result.id} className='text-4xl'>{result.name}</h1>
                        ))}
                        <img src={ExcelSvg} alt="Descripción de la imagen" className="w-12 py-2 h-auto" />
                    </div>
                    {data.map((descrip) => (
                        <h2 key={descrip._id}>{descrip.description}</h2>
                    ))}
                </div>

                <div className='p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                    <div className='text-h text-center'>
                        <a href='#' className='mr-3'>General</a>
                        <a href='#' className='mr-3'>Individual</a>
                    </div>
                </div>

                {/* Contenedor de las respuestas en dos columnas */}
                {data.map((result) => (
                    <div key={result._id} className="flex flex-row gap-10">
                        {result.questions.map((question) => (
                            <div key={question._id} className="response w-full flex flex-col">
                                <h2 className='text-2xl'>{question.question}</h2>
                                <BarsChart data={question.options} />
                            </div>
                        ))}
                    </div>
                ))}

            </section>
        </div>



    );
}

export default ResultQuest