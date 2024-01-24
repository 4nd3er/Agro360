import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Components';
import { ExcelSvg } from '../../assets/Assets';
import { useParams } from 'react-router-dom';
import '../../css/question.css';
import { useResponses, useForms, useUsers } from '../../context/Context.js'
import CardResult from '../../components/CardResult.jsx';

const ResultQuest = () => {
    const { idform } = useParams();

    const [form, setForm] = useState({})
    const [instructors, setInstructors] = useState([])
    const [results, setResults] = useState([])
    const [responsesLength, setResponsesLength] = useState(0)

    const { getForm, getFormReport, FormInstructorsResults } = useForms();
    const { getResponsesForm } = useResponses();
    const { getUser } = useUsers();

    const [loading, setLoading] = useState(true);

    //* GET DATA
    useEffect(() => {
        const getData = async () => {
            const formData = await getForm(idform);
            const instructorsResults = await FormInstructorsResults(idform);
            const responses = await getResponsesForm(idform)
            setForm(formData)
            setResults(instructorsResults)
            setResponsesLength(responses.length)

            // Get instructors
            const instructors = []
            for (const { instructor } of instructorsResults) {
                if (!instructors.includes(instructor)) instructors.push(instructor)
            }
            const instructorsData = await Promise.all(instructors.map(async (instructor) => {
                return await getUser(instructor)
            }))
            setInstructors(instructorsData)

            setLoading(false)
        }
        getData();
    }, [idform])

    //Generate report
    const generateReport = () => {
        getFormReport(idform)
    }

    if (loading) return <Spinner />;

    return (
        <div>
            <section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/2 mx-auto gap-10'>
                <div className='relative p-5 py-6 flex flex-col gap-5 shadow-lg rounded-md border-2'>
                    <div className={`${form.status ? 'bg-color-sena' : 'bg-red-500'} absolute top-0 left-0 py-1 px-4 rounded-md text-white`}>
                        {form.status ? "Activo" : "Inactivo"}
                    </div>
                    <div className='flex flex-row items-center justify-between mt-5'>
                        <h1 className='text-4xl'>{form.name}</h1>
                        <img onClick={generateReport} src={ExcelSvg} title="Generar reporte de Excel" className="w-12 py-2 h-auto cursor-pointer" />
                    </div>
                    <h2 className='font-bold italic text-color-sena'>{responsesLength} respuestas</h2>
                    <h2>{form.description}</h2>
                </div>

                <div className='p-5 py-6 flex gap-5 shadow-lg justify-center rounded-md border-2 place-items-center'>
                    <div className='text-h text-center flex gap-2'>
                        <button
                            className="text-[#39A900] shadow-xl rounded-lg scale-110 mr-3 text-base p-2 transition-all">
                            General
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-8 mb-8">
                    {instructors.map((instructor) => {
                        const instructorResult = results.find(({ instructor: instructorId }) => instructorId === instructor._id)
                        return <CardResult instructor={instructor} results={instructorResult} />
                    })}
                </div>
            </section>
        </div>
    );
}

export default ResultQuest