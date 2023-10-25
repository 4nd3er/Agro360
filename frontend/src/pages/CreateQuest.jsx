import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imgPrueba from '../img/prueba/pregunta.png';
import addQuestion from '../assets/Add.svg';
import importQuestion from '../assets/Import.svg';

const CreateQuest = () => {

    const [state, setState] = useState(true);

    const changeQuestions = () => {
        setState(true);
    }

    const changeAnswer = () => {
        setState(false);
    }

    return (
        <aside>
            <section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
                <Link onClick={changeQuestions} className={`${state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Preguntas</Link>
                <Link onClick={changeAnswer} className={`${!state ? 'border-[#39A900] text-[#39A900] font-bold' : 'border-gray-400'} border-b-[3px] px-48 pb-1`}>Respuestas</Link>
            </section>
            <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10'>
                <div className='p-2 py-4 text-center border-2 border-gray-300 rounded-md flex flex-col gap-5'>
                    <h1 className='text-4xl font-bold'>Titulo de la encuesta</h1>
                    <h1 className='text-2xl'>Descripcion de la encuesta. Lorem ipsum dolor sit amet consectetur adipisicing elit. repellendus quidem labore culpa</h1>
                    <h1 className='text-xl text-[#39A900]'>Tematica de la encuesta</h1>
                </div>
                <div className='w-full flex flex-col justify-start mx-auto gap-10'>
                    <img src={imgPrueba} />
                    <img src={imgPrueba} />
                    <img src={imgPrueba} />
                </div>
            </section>
            <section className='fixed right-28 bottom-20 bg-white p-2 rounded-xl border-2 shadow-xl'>
                <div className='flex flex-col gap-5 place-items-center'>
                    <Link>
                        <img className='w-8' src={addQuestion} />
                    </Link>
                    <Link>
                        <img className='w-10' src={importQuestion} />
                    </Link>
                </div>
            </section>
        </aside>
    )
}

export default CreateQuest