import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useResponses } from '../../context/Context.js';
import { FormAlert, Spinner } from '../../components/Components.jsx';
import { Logo } from '../../assets/Assets.jsx';
import '../../App.css'
import Swal from 'sweetalert2';

const UserValidation = () => {
    const { register: email, handleSubmit: emailSubmit, getValues: getEmail, reset: resetEmail, formState: { isValid: validEmail } } = useForm()
    const { register: code, handleSubmit: codeSubmit, reset: resetCode, formState: { isValid: validCode } } = useForm()

    const [errorsEmail, setErrorsEmail] = useState([])
    const [errorsCode, setErrorsCode] = useState([])
    const [successCode, setSuccessCode] = useState('')
    const [loading, setLoading] = useState(true)

    const [emailSend, setEmailSend] = useState(false)
    const [showVerifyCard, setShowVerifyCard] = useState(false)

    const navigate = useNavigate()
    const { form } = useParams()
    const { getCodeResponse, verificateCodeResponse, compFormResponse, existsForm } = useResponses();

    useEffect(() => {
        compFormResponse(form)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])

    // By submitting the form
    const onSubmitEmail = emailSubmit(async (data) => {
        try {
            setLoading(true)
            const { email } = getEmail();
            await getCodeResponse(form, email);
            setErrorsEmail([])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            resetEmail()
            setErrorsEmail(error.response.data.message)
        }
    });

    const onSubmitCode = codeSubmit(async (data) => {
        try {
            const res = await verificateCodeResponse(form, data);
            setSuccessCode(res)
            setTimeout(() => {
                navigate(`/forms/r/${form}`)
            }, 2000)
        } catch (error) {
            resetCode()
            setErrorsCode(error.response.data.message)
        }
    });

    useEffect(() => {
        if (errorsEmail.length === 0 && emailSend) {
            setShowVerifyCard(true)
        }
    }, [errorsEmail])

    if (loading) return <Spinner />

    if (!existsForm && !loading) return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center text-color-sena font-bold'>
            <h1>Formulario no encontrado</h1>
        </div>
    )

    return (
        <>
            <div className="flex flex-col mx-auto w-full md:w-3/5 overflow-x-hidden">
                <div className="flex flex-row md:flex-row">
                    <div className={`${showVerifyCard ? 'max-w-md mx-auto hidden-card' : 'max-w-md mx-auto duration-1000'}`}>
                        <form
                            onSubmit={onSubmitEmail}
                            className="bg-white shadow-xl rounded-xl mx-5 mt-16 border border-gray-300"
                        >
                            <div className="flex justify-center md:justify-center">
                                <img src={Logo} alt="Logo360" className="rounded-lg w-20 h-30 md:ml-6" />
                            </div>
                            <div className='px-6 py-8'>
                                <FormAlert errors={errorsEmail} />
                                <label className="text-gray-700 font-bold text-lg">Correo Electrónico:</label>
                                <input
                                    id='email'
                                    type="email"
                                    {...email("email", {
                                        required: true
                                    })}
                                    className="w-full border rounded-lg bg-gray-50 p-3 mt-4"
                                    placeholder="Digita tú correo electrónico"
                                />
                                <p className="mt-4 mb-6 text-gray-600 text-center text-sm font-bold">
                                    Digita tu correo electrónico para que te enviemos un código de verificación y puedas responder la encuesta
                                </p>
                                <p onClick={() => { setShowVerifyCard(true); setErrorsEmail([]) }}
                                    className='my-3 text-green-500 text-xs hover:text-green-700 cursor-pointer text-end'>
                                    Tengo un codigo -&gt;
                                </p>
                                <input
                                    type="submit"
                                    value="Enviar"
                                    onClick={() => setEmailSend(true)}
                                    disabled={!validEmail}
                                    className={validEmail ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full hover: cursor-pointer hover:bg-color-sena-hover transition-colors duration-300 ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer'}
                                />
                            </div>
                        </form>
                    </div>
                    {/* Verify code */}
                    <div className={`${showVerifyCard ? 'max-w-md mx-auto fixed show-card' : 'max-w-md mx-auto fixed hidden-card-right'}`}>
                        <form
                            onSubmit={onSubmitCode}
                            className="bg-white shadow-xl rounded-xl mx-5 mt-16 border border-gray-300"
                        >
                            <div className="flex justify-center md:justify-center">
                                <img src={Logo} alt="Logo360" className="rounded-lg w-20 h-30 md:ml-6" />
                            </div>
                            <div className='px-6 py-8'>
                                <FormAlert errors={errorsCode} success={successCode} />
                                <label className="text-gray-700 font-bold text-lg">Digita tu codigo:</label>
                                <input
                                    id='code'
                                    type="text"
                                    {...code("code", {
                                        required: true,
                                        minLength: 6
                                    })}
                                    className="w-full border rounded-lg bg-gray-50 p-3 mt-4"
                                    placeholder="Digita tú codigo"
                                />
                                <p className="mt-4 mb-6 text-gray-600 text-center text-sm font-bold">
                                    Digita el codigo que llego a tu correo
                                </p>
                                <p onClick={() => { setShowVerifyCard(false); setErrorsCode([]) }}
                                    className='my-3 text-green-500 text-xs hover:text-green-700 cursor-pointer text-start'>
                                    &lt;- Obtener un codigo
                                </p>
                                <input
                                    type="submit"
                                    value="Enviar"
                                    disabled={!validCode}
                                    className={validCode ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full hover: cursor-pointer hover:bg-color-sena-hover transition-colors duration-300 ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer'}
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
