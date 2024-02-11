import { Link, useNavigate } from "react-router-dom"
import { FormAlert } from '../../components/Components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/Context.js'
import { useState } from "react"

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState()
    const { register, handleSubmit } = useForm();
    const { forgetPassword } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await forgetPassword(data)
            setErrors([])
            setSuccess(res.data)
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (error) {
            setSuccess()
            setErrors([error.response.data.message])
        }
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
                                    {...register("email", { required: true })} />
                            </div>
                            <input type="submit" value="Enviar" className='bg-green-600 w-full py-1 text-white uppercase font-bold rounded-xl hover: cursor-pointer hover:bg-green-700 transition-color' />
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
