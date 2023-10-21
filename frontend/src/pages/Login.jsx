import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='flex flex-col justify-center place-items-center min-h-[80vh]'>
            <strong className='text-6xl text-red-600 uppercase'>Hacer cambios de ser necesario</strong>
            <Link
                to="/inicio"
                className='mt-10 border p-3 rounded-lg border-[#39A900] text-[#39A900] hover:bg-[#39A900] hover:text-white transition-[.10s_all] hover:rounded-full text-center'
            >
                Redireccion a la pagina
            </Link>
        </div>
    )
}

export default Login