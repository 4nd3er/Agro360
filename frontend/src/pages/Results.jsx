import React, { useState, useEffect } from 'react';
import Survey from '../components/Survey';
import agro360Axios from '../config/agro360Axios';
import { Spinner } from '../components/Components';

const Results = () => {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        try {
            agro360Axios('forms/responses').then((response) => {
                setData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
        setCargando(false);
    }, []);
    
    return (
        <div className='flex flex-col min-h-[80vh] '>
            <div className='flex flex-row h-2'> {/* Agrega la clase flex-row */}
                {cargando ? <Spinner /> : (
                    data.map((quest) => (
                        <Survey
                            id={quest._id}
                            key={quest._id}
                            title={quest.name}
                            imageSrc="src/img/encuesta.png"
                            isActive={true}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Results