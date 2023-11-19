import React, { useState, useEffect } from 'react';
import Survey from '../components/Survey';
import axios from 'axios';


const Results = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios(`http://localhost:4000/api/forms`).then((response) => {
            setData(response.data);
        });
    }, []);
    return (
        <div className='flex flex-col  min-h-[80vh] '>

            <div className='flex flex-row h-1'> {/* Agrega la clase flex-row */}
                {data.map((quest) => (
                    <Survey
                        id={quest._id}
                        key={quest._id}
                        title={quest.name}
                        imageSrc="src/img/encuesta.png"
                        isActive={true}
                    />
                ))}
            </div>

        </div>
    );
};

export default Results