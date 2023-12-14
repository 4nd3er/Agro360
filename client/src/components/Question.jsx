import React from 'react'
import { AddQuestionSvg } from '../assets/Assets';

const Question = () => {
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        setQuestions([questionType, question, options])
    }, [question, options, questionType])


    const addQuestion = () => {
        setQuestions(...questions, questions);
    };

    return (
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
                        <img className='max-w-8' src={AddQuestionSvg} />
                    </Link>
                    <Link>
                        <img className='max-w-10' src={importQuestionSvg} />
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Question
