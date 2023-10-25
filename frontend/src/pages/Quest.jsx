import React from 'react';
import { Link } from 'react-router-dom';

const Quest = () => {
    return (
        <div className='flex flex-col justify-center place-items-center min-h-[80vh]'>
            <p>Inicio Creacion Formulario</p>
            <Link
                className='border p-2 mt-10'
                to='crear'
            >
                Boton Creacion Formulario
            </Link>
        </div>
    )
}

export default Quest