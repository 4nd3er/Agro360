import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Spinner } from '../../components/Components'
import { useAuth } from '../../context/Context';
import '../../css/Login.css';

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid }, } = useForm();
    const { signin, errors: loginErrors, isAuthenticated, checkLogin, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    })

    useEffect(()=>{
        checkLogin();
    },[])

    useEffect(() => {
        if (isAuthenticated) navigate("/inicio");
    }, [isAuthenticated]);

    if (loading) return <Spinner />

    return (
        <>
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="w-full lg:w-1/4 h-full  flex-col justify-center hidden lg:flex">
                    <h1 className="text-color-logo font-black text-6xl capitalize typing">
                        AGRO
                        <span className="text-color-span-logo text-8xl">360°</span>
                        <p className='text-color-logo text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
                    </h1>
                </div>
                <div className="w-full lg:w-3/5 h-full">
                    <div className="flex flex-col justify-center place-items-center min-h-[80vh]">
                        <div className="lg:hidden mb-5">
                            <h1 className="text-color-logo font-black text-6xl capitalize typing">
                                AGRO
                                <span className="text-color-span-logo text-8xl">360°</span>
                                <p className='text-color-logo text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
                            </h1>
                        </div>
                        <strong className='text-color-sena text-6xl capitalize font-sans mt-3'>Bienvenido</strong>
                        {loginErrors.map((error, i) => (
                            <div className="bg-red-500 p-4 text-white text-center rounded-md shadow-md my-2" key={i}>
                                {error}
                            </div>
                        ))}
                        <form className='my-5 bg-white shadow rounded-lg px-10 py-5 lg:w-1/2' onSubmit={onSubmit}>
                            <div className='my-5'>
                                <label className='text-color-label block text-sm font-bold' htmlFor='email'>Correo Electrónico</label>
                                <input
                                    id='email'
                                    {...register('email', { required: true })}
                                    type="email"
                                    placeholder='Digite el Correo Electronico'
                                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                                />
                                {errors.email && <p className='text-color-alert-red'>El correo electrónico es requerido</p>}
                            </div>
                            <div className='my-5'>
                                <label className='text-color-label block text-sm font-bold' htmlFor='password'>Contraseña</label>
                                <input
                                    id='password'
                                    {...register('password', { required: true })}
                                    type="password"
                                    placeholder='Digite la contraseña'
                                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                                />
                                {errors.password && (<p className='text-color-alert-red'>La contraseña es requerida</p>)}
                                <div className='my-4'>
                                    <Link className='text-color-span-logo hover:text-color-logo cursor-pointer text-end' to='forget-password'>¿Olvidaste tu contraseña?</Link>
                                </div>
                                
                            </div>
                            <input
                                type="submit"
                                disabled={!isValid}
                                value="Iniciar Sesion"
                                className={isValid ? 'bg-color-sena w-full py-3 text-color-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-color-sena-hover transition-color' : 'bg-gray-400 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer'}
                            />
                        </form>
                        <nav className='lg:flex lg:justify-between'></nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
