import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useResponses } from '../../context/Context.js';
import Logo from '../../img/logoAgro360.png';

const UserValidation = () => {
    const { register, handleSubmit, getValues, reset, formState: {
        isValid
    } } = useForm() // settings useForm
    const { sendCodeValidation} = useResponses();
    const params = useParams() 
    let response;
    const onSubmit = async () => {
        try {
            if (isValid) { // if form is valid
                const { code } = getValues() // Obtain code
                console.log(code)
                const idForm = params.idform // Obtain idform of URL
                console.log(idForm)
                response = await sendCodeValidation(idForm, code) // send request
                if (response.response.includes("successfully")) { // Verify response
                    console.log('código validado exitosamente')
                    reset() // Clean form
                }else{
                    console.log('No se pudo validar el código')
                }
            }
        } catch (error) {
            console.log("Error al validar el código: \n", error)
        }
    }
    return (
        <>
            <div className="w-3/5 mx-auto">
                <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='my-1 bg-white shadow rounded-lg px-10 py-5 w-1/2'
                    >
                        <div className='my-3 flex items-center justify-center'>
                            <img src={Logo} alt="Logo360" className="rounded-full w-20 h-22" />
                        </div>
                        <div className='my-2'>
                            {/* {errors.map((error, i) => (
                                <div className="bg-red-500 p-4 text-white my-5 rounded-md flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>

                                    <span>{error}</span>
                                </div>
                            ))} */}
                            <label className=' text-gray-600 block text-sm font-bold'
                                htmlFor='email'
                            >Ingresa el código de verificación enviado a tu correo</label>
                            <input
                                id='codigo'
                                type="number"
                                {...register("code", {
                                    required: true,
                                    pattern: /^\d{1,6}$/, // six characters maximum
                                })}
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
                            disabled={!isValid}
                            className={isValid ? 'bg-color-sena w-full py-3 text-white uppercase font-bold rounded-full cursor-pointer hover:bg-color-sena-hover transition-colors duration-300 ease-in-out' : 'bg-gray-300 w-full py-3 text-white uppercase font-bold rounded-full'}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserValidation