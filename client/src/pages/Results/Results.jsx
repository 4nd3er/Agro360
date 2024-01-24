import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Components';
import Survey from '../../components/Survey';
import { useForms } from '../../context/Context.js';
import { imgEncuesta } from '../../assets/Assets';

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
        <div className='flex flex-col min-h-[80vh] mt-12'>
            <div className='flex flex-row h-2'> {/* Agrega la clase flex-row */}
                {cargando ? <Spinner /> :
                    forms.length ? (
                        forms.map((quest) => (
                            <Survey
                                id={quest._id}
                                key={quest._id}
                                title={quest.name}
                                imageSrc={imgEncuesta}
                                isActive={quest.status}
                            />
                        ))
                    ) : <h3 className="text-2xl text-gray-600">No existen respuestas</h3>}
            </div>
        </div>
    );
};

export default Results