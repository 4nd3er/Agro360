import { Link, useNavigate } from "react-router-dom"
import { FormAlert } from '../../components/Components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/Context.js'
import { useEffect, useState } from "react"
import { cleanAlerts } from '../../context/Alerts.jsx'

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
            <div className="flex  justify-center items-center min-h-[80vh]">
                <div className="w-1/4 h-full flex flex-col justify-center">
                    <h1 className="text-green-800 font-black text-6xl capitalize">
                        AGRO
                        <span className="text-green-500 text-8xl">360°</span>
                        <p className='text-green-800 text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
                    </h1>
                </div>

                <div className="w-3/5 h-full ">
                    <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
                        <strong className=' text-green-600  text-4xl capitalize font-sans'>Recupera tu cuenta</strong>
                        <form className='bg-white shadow rounded-lg px-10 py-5 w-1/2' onSubmit={onSubmit}>
                            <FormAlert errors={errors} success={success} />
                            <div className='my-5'>
                                <label className=' text-gray-600 block text-sm font-bold' htmlFor='email'>Correo Electrónico</label>
                                <input id='email' type="email" placeholder='Digita tu correo electronico' className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
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
                                className={`${isValid ? 'bg-green-600 hover:cursor-pointer hover:bg-green-700' : 'bg-gray-500'} w-full py-1 text-white uppercase font-bold rounded-xl  transition-color `}
                                disabled={!isValid}
                            />
                            <nav>
                                <Link className='block my-5 text-slate-500 uppercase text-xs' to='/' style={{ marginLeft: 'auto' }}>
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
