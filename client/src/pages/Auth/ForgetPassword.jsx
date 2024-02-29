import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { ErrorsFormAlert } from '../../components/Components'
import { useAuth } from '../../context/Context'
import { cleanAlerts } from '../../context/Alerts'

const ForgetPassword = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isValid } } = useForm();
    const { forgetPassword, errors, setErrors, success, setSuccess } = useAuth();

    useEffect(() => {
        cleanAlerts(setErrors, setSuccess)
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        const res = await forgetPassword(data)
        if (res) setTimeout(() => navigate('/'), 3000)
    })

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center items-center min-h-[80vh] px-5">
                <div className="lg:w-1/4 h-full flex flex-col justify-center">
                    <h1 className="text-color-logo font-black text-6xl capitalize">
                        AGRO
                        <span className="text-color-span-logo text-8xl">360°</span>
                        <p className='text-color-logo text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
                    </h1>
                </div>

                <div className="w-full md:w-1/2 lg:w-3/5 h-full">
                    <div className="flex flex-col justify-center place-items-center min-h-[50vh]">
                        <strong className='text-color-sena text-4xl capitalize font-sans'>Recupera tu cuenta</strong>
                        <form className='border border-gray-300 shadow-xl rounded-lg px-5 py-5 mt-10 w-full lg:w-1/2' onSubmit={onSubmit}>
                            <ErrorsFormAlert errors={errors} success={success} />
                            <div className='my-5'>
                                <label className='text-color-label block text-lg font-bold' htmlFor='email'>Correo Electrónico:</label>
                                <input id='email' type="email" placeholder='Digita tu correo electronico' className='w-full mt-3 p-3 border rounded-xl '
                                    {...register("email", {
                                        required: true,
                                        validate: (value) => {
                                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                            return emailRegex.test(value)
                                        }
                                    })} />
                            </div>
                            <input
                                type="submit"
                                value="Enviar"
                                className={`${isValid ? 'bg-color-sena hover:cursor-pointer hover:bg-color-sena-hover' : 'bg-gray-500'} w-full py-2 text-white uppercase font-bold rounded-xl  transition-color `}
                                disabled={!isValid}
                            />
                            <nav>
                                <Link className='block my-5 text-color-span-logo hover:text-color-logo uppercase text-xs' to='/' style={{ marginLeft: 'auto' }}>
                                    Iniciar sesión
                                </Link>
                            </nav>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
