import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logoAgro360.png';

const UserValidation = () => {
    return (
        <>




            <div className="w-3/5 mx-auto  ">
                <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">



                    <form className='my-1 bg-white shadow rounded-lg px-10 py-5 w-1/2'>

                        <div className='my-3 flex items-center justify-center'>
                            <img src={Logo} alt="Logo360" className="rounded-full w-20 h-22" />
                        </div>

                        <div className='my-2'>
                            <label className=' text-gray-600 block text-sm font-bold'
                                htmlFor='email'
                            >Ingresa el código de verificación enviado a tu correo</label>
                            <input
                                id='codigo'
                                type="text"
                                placeholder='Ingrese el Código'
                                className='w-full mt-4 p-3 border rounded-xl bg-gray-50'
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="mt-1 mb-6 text-gray-600 text-center block text-sm font-bold">
                                ¿Aun no te ha llegado el código?
                                <Link
                                    className='ml-2 text-green-500 uppercase text-xs hover:text-green-600'
                                    to=''
                                >
                                    Volver a Enviar
                                </Link>
                            </p>
                        </div>




                        <input
                            type="submit"
                            value="Enviar"
                            className='bg-green-600 w-full py-2 text-white uppercase font-bold rounded-xl
                                hover: cursor-pointer hover:bg-green-700 transition-color'
                        />


                    </form>

                    <nav className='lg:flex lg: justify-between'>


                    </nav>

                </div>

            </div>

        </>
    )
}

export default UserValidation