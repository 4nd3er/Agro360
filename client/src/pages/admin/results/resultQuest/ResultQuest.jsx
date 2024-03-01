import React, { useState, useEffect } from 'react';
import { Spinner } from '../../../../components/Components';
import { ExcelSvg } from '../../../../assets/Assets';
import { useParams } from 'react-router-dom';
import { useResponses, useForms, useRoles } from '../../../../context/Context'
import QuestCard from './components/QuestCard';

const ResultQuest = () => {
    const { idform } = useParams();

    const [form, setForm] = useState({})
    const [results, setResults] = useState([])
    const [responsesLength, setResponsesLength] = useState(0)

    const { getForm, getFormReport, FormInstructorsResults } = useForms();
    const { getTopic } = useRoles();

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
        <article className='flex flex-col justify-start mt-5 min-h-[70vh] w-full md:w-full mx-auto gap-10 px-3 md:px-5 lg:px-3'>
            <header className='relative p-4 md:p-6 lg:p-8  flex flex-col gap-2 shadow-lg rounded-md border-2'>
                <aside className={`${form.status ? 'bg-color-sena' : 'bg-color-red'} absolute top-0 left-0 py-1 px-4 rounded-md text-color-white shadow-lg`}>
                    {form.status ? "Activo" : "Inactivo"}
                </aside>
                <section className='flex flex-col md:flex-row items-center justify-between mt-5'>
                    <h1 className='text-4xl text-color-sena'>{form.name}</h1>
                    <aside className='w-full md:w-1/3 flex flex-col items-end mt-5 md:mt-0'>
                        <button className={`w-full md:w-full lg:w-2/3 xl:w-2/3 bg-color-white text-color-sena border-2 border-color-greend  ${!loadingReport ? 'hover:bg-color-sena hover:border-transparent hover:text-white' : 'cursor-progress'}  p-2 rounded-md shadow-md flex flex-row gap-4 items-center justify-center transition-colors duration-300`}
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
                <h3 className='text-xl text-color-sena mb-4'>Tematica: <span className='text-color-black text-lg'>{form.topic}</span></h3>
                <h2 className='font-bold italic text-color-sena'>{responsesLength} respuestas</h2>
                <h2>{form.description}</h2>
            </header>

            <div className='p-5 py-6 flex gap-5 shadow-lg justify-center rounded-md border-2 place-items-center'>
                <div className='text-h text-center flex gap-2'>
                    <button
                        className="text-color-sena shadow-xl rounded-lg scale-110 mr-3 text-base p-2 transition-all">
                        General
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                {results.map(({ instructor, responses }) => {
                    return <QuestCard key={instructor._id} instructor={instructor} responses={responses} />
                })}
            </div>
        </article>
    );
}

export default ResultQuest;
