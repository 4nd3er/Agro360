import React, { useState, useEffect } from 'react';
import { useForms } from '../../../context/Context';
import { Spinner } from '../../../components/Components';
import CardForm from '../../../components/CardForm';
import { imgEncuesta } from '../../../assets/Assets';

const Results = () => {
    const { FormsResponses } = useForms();
    const [forms, setForms] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const getForms = async () => {
            try {
                const res = await FormsResponses();
                setForms(res);
                setCargando(false);
            } catch (error) {
                console.log(error);
            }
        }
        getForms();
    }, [])

    return (
        <div className='min-h-[80vh] mt-12 px-5 lg:px-0'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-7'> {/* Utilizamos grid para hacerlo responsive */}
                {cargando ? <Spinner /> :
                    forms.length ? (
                        forms.map((form) => (
                            <CardForm
                                form={form}
                                imageSrc={imgEncuesta}
                            />
                        ))
                    ) : <h3 className="text-2xl text-color-gray">No existen respuestas</h3>}
            </div>
        </div>
    );
};

export default Results
