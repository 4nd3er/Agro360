import { useEffect } from 'react';
import Logo from '../img/logoAgro360.png';
import { useForm } from 'react-hook-form';
import useResponses from '../hooks/useResponses';

const UserValidation = () => {
    const { register, handleSubmit, formState: {
        isValid
    } } = useForm() // settings useForm

    const { sendCode } = useResponses();

    // When loading the page
    useEffect(() => {
        const obtainEmail = () => {
            // Get email parameter from URL  
            const userEmail = new URLSearchParams(window.location.search).get('email');
            // Decode URL
            const decodedEmail = decodeURIComponent(userEmail);
            // Return decoded email
            return decodedEmail
        }
        const userEmail = obtainEmail()
        sendCode(userEmail)
    }, [])

    // By submitting the form
    const onSubmit = async (data) => {
        // Add email to URL
        const queryParams = new URLSearchParams({
            email: data.email
        });
        // Update the email parameter
        window.location.search = queryParams;
    };

    return (
        <>
            <div className="flex flex-col mx-auto w-full md:w-3/5">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full">
                        <div className="max-w-md mx-auto">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white shadow-xl rounded-xl mx-5 mt-16 border border-gray-300"
                            >
                                <div className="flex justify-center md:justify-center">
                                    <img src={Logo} alt="Logo360" className="rounded-lg w-20 h-30 md:ml-6" />
                                </div>
                                <div className='px-6 py-8'>
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
                                    <input
                                        type="submit"
                                        value="Enviar"
                                        disabled={!isValid}
                                        className={isValid ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full hover: cursor-pointer hover:bg-color-sena-hover transition-color ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserValidation