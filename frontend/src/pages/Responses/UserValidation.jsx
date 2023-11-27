import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import Logo from '../../img/logoAgro360.png';
import { useResponses } from '../../context/Context.js';
import Cookies from 'js-cookie'
import '../../App.css'

const UserValidation = () => {
    const { register, handleSubmit, getValues, reset, formState: { isValid } } = useForm()
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { isValid: isValid2 } } = useForm()

    const params = useParams()
    const { getCodeResponse, verificateCodeResponse } = useResponses();
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [errors2, setErrors2] = useState([])
    const [verifyCode, setVerifyCode] = useState(false)
    const [send, setSend] = useState(false)

    // By submitting the form
    const onSubmit = async () => {
        try {
            if (isValid) {
                const { email } = getValues(); // Obtain email 
                const idForm = params.idform // Obtain id of form
                await getCodeResponse(idForm, email);
                setErrors([])
                reset() // Clean form
            }
        } catch (error) {
            setErrors(error.response.data.message)
        }
    };

    const onSubmitCode = handleSubmit2(async (data) => {
        try {
            if (isValid2) {
                const idForm = params.idform;
                reset2()
                await verificateCodeResponse(idForm, data);
                navigate(`/forms/r/${idForm}`)
            }
        } catch (error) {
            setErrors2(error.response.data.message)
        }
    });

    useEffect(() => {
        if (errors.length === 0 && send) {
            setVerifyCode(true)
        }
    }, [errors])

    return (
        <>
            <div className="flex flex-col mx-auto w-full md:w-3/5 overflow-x-hidden">
                <div className="flex flex-row md:flex-row">
                    <div className={`${verifyCode ? 'max-w-md mx-auto hidden-card' : 'max-w-md mx-auto duration-1000'}`}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white shadow-xl rounded-xl mx-5 mt-16 border border-gray-300"
                        >
                            <div className="flex justify-center md:justify-center">
                                <img src={Logo} alt="Logo360" className="rounded-lg w-20 h-30 md:ml-6" />
                            </div>
                            <div className='px-6 py-8'>
                                {errors.map((error, i) => (
                                    <div key={i} className="bg-red-500 p-4 text-white my-5 rounded-md flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>

                                        <span>{error}</span>
                                    </div>
                                ))}
                                <label className="text-gray-700 font-bold text-lg">Correo Electrónico:</label>
                                <input
                                    id='email'
                                    type="email"
                                    {...register("email", {
                                        required: true
                                    })}
                                    className="w-full border rounded-lg bg-gray-50 p-3 mt-4"
                                    placeholder="Digita tú correo electrónico"
                                />
                                <p className="mt-4 mb-6 text-gray-600 text-center text-sm font-bold">
                                    Digita tu correo electrónico para que te enviemos un código de verificación y puedas responder la encuesta
                                </p>
                                <p onClick={() => setVerifyCode(true)}
                                    className='my-3 text-green-500 text-xs hover:text-green-700 cursor-pointer text-end'>
                                    Tengo un codigo -&gt;
                                </p>
                                <input
                                    type="submit"
                                    value="Enviar"
                                    onClick={() => setSend(true)}
                                    disabled={!isValid}
                                    className={isValid ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full hover: cursor-pointer hover:bg-color-sena-hover transition-colors duration-300 ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer'}
                                />
                            </div>
                        </form>
                    </div>
                    {/* Verify code */}
                    <div className={`${verifyCode ? 'max-w-md mx-auto fixed show-card' : 'max-w-md mx-auto fixed hidden-card-right'}`}>
                        <form
                            onSubmit={handleSubmit2(onSubmitCode)}
                            className="bg-white shadow-xl rounded-xl mx-5 mt-16 border border-gray-300"
                        >
                            <div className="flex justify-center md:justify-center">
                                <img src={Logo} alt="Logo360" className="rounded-lg w-20 h-30 md:ml-6" />
                            </div>
                            <div className='px-6 py-8'>
                                {errors2.map((error, i) => (
                                    <div key={i} className="bg-red-500 p-4 text-white my-5 rounded-md flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>

                                        <span>{error}</span>
                                    </div>
                                ))}
                                <label className="text-gray-700 font-bold text-lg">Digita tu codigo:</label>
                                <input
                                    id='code'
                                    type="text"
                                    {...register2("code", {
                                        required: true
                                    })}
                                    className="w-full border rounded-lg bg-gray-50 p-3 mt-4"
                                    placeholder="Digita tú codigo"
                                />
                                <p className="mt-4 mb-6 text-gray-600 text-center text-sm font-bold">
                                    Digita el codigo que llego a tu correo
                                </p>
                                <input
                                    type="submit"
                                    value="Enviar"
                                    disabled={!isValid2}
                                    className={isValid2 ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full hover: cursor-pointer hover:bg-color-sena-hover transition-colors duration-300 ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserValidation