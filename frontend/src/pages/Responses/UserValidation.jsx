import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Logo from '../../img/logoAgro360.png';
import { useResponses } from '../../context/Context.js';

const UserValidation = () => {
    const { register, handleSubmit, getValues, reset, formState: {
        isValid
    } } = useForm() // settings useForm

    const params = useParams()
    const { sendCodeResponse, errors } = useResponses();
    //const navigate = useNavigate()

    // By submitting the form
    const onSubmit = async () => {
        try {
            if (isValid) {
                const { email } = getValues(); // Obtain email 
                console.log(email)
                const idForm = params.idform // Obtain id of form
                console.log(idForm)
                await sendCodeResponse(idForm, email) // send the id of the form and the user's e-mail address
                //navigate(`/forms/vt/${params.idform}`) // Navegar a la pagina TokenValidation.jsx
                reset() // Clean form
            }
        } catch (error) {
            console.log("Error al enviar petición con el código" + error)
        }
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
                                    {errors.map((error, i) => (
                                        <div className="bg-red-500 p-4 text-white my-5 rounded-md flex items-center">
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