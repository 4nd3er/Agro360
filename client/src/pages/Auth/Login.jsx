import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Components'
import { useAuth } from '../../context/Context';
import '../../css/Login.css';

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid }, } = useForm();
    const { signin, errors: loginErrors, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    })

    useEffect(() => {
        if (isAuthenticated) navigate("/inicio");
    }, [isAuthenticated]);

    if (loading) return <Spinner />

    return (
        <>
            <div className="flex  justify-center items-center min-h-[80vh]">
                <div className="w-1/4 h-full flex flex-col justify-center">
                    <h1 className="text-green-800 font-black text-6xl capitalize typing">
                        AGRO
                        <span className="text-green-500 text-8xl">360°</span>
                        <p className='text-green-800 text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
                    </h1>
                </div>
                <div className="w-3/5 h-full ">
                    <div className=" flex flex-col justify-center place-items-center min-h-[80vh]">
                        <strong className='text-green-600 text-6xl capitalize font-sans mt-3'>Bienvenido</strong>
                        {loginErrors.map((error, i) => (
                            <div className="bg-red-500 p-4 text-white text-center rounded-md shadow-md my-2 w-2/4" key={i}>
                                {error}
                            </div>
                        ))}
                        <form className='my-5 bg-white shadow rounded-lg px-10 py-5 w-1/2' onSubmit={onSubmit}>
                            <div className='my-5'>
                                <label className=' text-gray-600 block text-sm font-bold' htmlFor='email'>Correo Electrónico</label>
                                <input
                                    id='email'
                                    {...register('email', { required: true })}
                                    type="email"
                                    placeholder='Digite el Correo Electronico'
                                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                                    value="ladigiococ@gmail.com"
                                />
                                {errors.email && <p className='text-red-600'>El correo electrónico es requerido</p>}
                            </div>
                            <div className='my-5'>
                                <label className=' text-gray-600 block text-sm font-bold' htmlFor='password'>Contraseña</label>
                                <input
                                    id='password'
                                    {...register('password', { required: true })}
                                    type="password"
                                    placeholder='Digite la contraseña'
                                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                                    value="12345678"
                                />
                                {errors.password && (<p className='text-red-600'>La contraseña es requerida</p>)}
                                <Link className='block my-5 text-slate-500 uppercase text-xs' to='forget-password'>¿Olvidaste tu contraseña?</Link>
                            </div>
                            <input
                                type="submit"
                                disabled={!isValid}
                                value="Iniciar Sesion"
                                className={isValid ? 'bg-green-600 w-full py-3 text-white uppercase font-bold rounded-xl hover: cursor-pointer hover:bg-green-700 transition-color' : 'bg-gray-400 w-full py-3 text-white uppercase font-bold rounded-xl hover: cursor-pointer'}
                            />
                            {/*<Link className='block my-5 text-slate-500 uppercase text-xs' to='register'>¿No tiene una cuenta? Regístrese</Link>*/}
                        </form>
                        <nav className='lg:flex lg: justify-between'></nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login