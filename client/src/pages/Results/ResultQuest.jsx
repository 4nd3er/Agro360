import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Components';
import { ExcelSvg } from '../../assets/Assets';
import { useParams } from 'react-router-dom';
import '../../css/question.css';
import { useResponses, useForms, useRoles } from '../../context/Context.js'
import CardResult from '../../components/CardResult.jsx';

const ResultQuest = () => {
    const { idform } = useParams();

    const [form, setForm] = useState({})
    const [results, setResults] = useState([])
    const [responsesLength, setResponsesLength] = useState(0)

    const { getForm, getFormReport, FormInstructorsResults } = useForms();
    const { getTopic } = useRoles()
    const { getResponsesForm } = useResponses();

    const [loading, setLoading] = useState(true);
    const [loadingReport, setLoadingReport] = useState(false);

    //* GET DATA
    useEffect(() => {
        const getData = async () => {
            const formData = await getForm(idform);
            const topic = await getTopic(formData.topic);
            formData.topic = topic.name;
            const { results, responsesLength } = await FormInstructorsResults(idform);
            setForm(formData)
            setResults(results)
            setResponsesLength(responsesLength)
            setLoading(false)
        }
        getData();
    }, [idform])

    //Generate report
    const generateReport = async () => {
        setLoadingReport(true)
        await getFormReport(idform)
        setLoadingReport(false)
    }

    if (loading) return <Spinner />;

    return (
        <article className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/2 mx-auto gap-10'>
            <header className='relative p-8 flex flex-col gap-2 shadow-lg rounded-md border-2'>
                <aside className={`${form.status ? 'bg-color-sena' : 'bg-red-500'} absolute top-0 left-0 py-1 px-4 rounded-md text-white shadow-lg`}>
                    {form.status ? "Activo" : "Inactivo"}
                </aside>
                <section className='flex flex-row items-center justify-between mt-5'>
                    <h1 className='text-4xl text-color-sena'>{form.name}</h1>
                    <aside className='w-1/3 flex flex-col items-end'>
                        <button className={`w-2/3 bg-white text-color-sena border-2 border-lime-400  ${!loadingReport ? 'hover:bg-color-sena hover:border-transparent hover:text-white' : 'cursor-progress'}  p-2 rounded-md shadow-md flex flex-row gap-4 items-center justify-center`}
                            onClick={generateReport} >
                            {loadingReport && (<Spinner className={'!m-0'} />) || (
                                <>
                                    <img src={ExcelSvg} title="Generar reporte de Excel" className="w-10" />
                                    <span className='text-lg'>Generar Reporte</span>
                                </>
                            )}
                        </button>
                    </aside>
                </section>
                <h3 className='text-xl text-color-sena mb-4'>Tematica: <span className='text-black text-lg'>{form.topic}</span></h3>
                <h2 className='font-bold italic text-color-sena'>{responsesLength} respuestas</h2>
                <h2>{form.description}</h2>
            </header>

            <div className='p-5 py-6 flex gap-5 shadow-lg justify-center rounded-md border-2 place-items-center'>
                <div className='text-h text-center flex gap-2'>
                    <button
                        className="text-[#39A900] shadow-xl rounded-lg scale-110 mr-3 text-base p-2 transition-all">
                        General
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                {results.map(({instructor, responses}) => {
                    return <CardResult key={instructor._id} instructor={instructor} responses={responses} />
                })}
            </div>
        </article>
    );
}

export default ResultQuest