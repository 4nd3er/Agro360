import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/Context.js';

const Register = () => {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  //Variable que contiene los datos del formulario
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (value) => {
    await signup(value);
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex  justify-center items-center min-h-[80vh]">
        <div className="w-1/4 h-full flex flex-col justify-center">
          <h1 className="text-green-800 font-black text-6xl capitalize ">AGRO
            <span className="text-green-500 text-8xl">360°</span>
            <p className='text-green-800 text-sm flex justify-center '>Evaluacion de desempeño</p>
          </h1>
        </div>

        <div className="w-3/5 h-full ">
          <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
            <strong className=' text-green-600  text-5xl capitalize font-sans'>Crea tu cuenta</strong>
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 p-4 text-white text-center rounded-md shadow-md my-2 w-2/4" key={i}>
                {error}
              </div>
            ))}
            <form
              className='my-10 bg-white shadow rounded-lg px-10 py-5 w-1/2' onSubmit={onSubmit}>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='names'>Nombres</label>
                <input
                  id='names'
                  type="text"
                  placeholder='Nombres'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register('names', { required: true })}
                />
                {errors.names && (
                  <p className="text-red-600">Nombre es requerido</p>
                )}
              </div>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='lastnames'>Apellidos</label>
                <input
                  id='lastnames'
                  type="text"
                  placeholder='Apellidos'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register('lastnames', { required: true })}
                />
                {errors.lastnames && (
                  <p className="text-red-600">Apellido es requerido</p>
                )}
              </div>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='select'>Tipo de Documento:</label>
                <select
                  id='documentType'
                  type="text"
                  name='documentType'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register('documentType', { required: true })}>
                  <option value=''>Seleccione</option>
                  <option value='opcion2'>CC</option>
                  <option value='opcion2'>CE</option>
                  <option value='opcion3'>TI</option>
                </select>
                {errors.documentType && (
                  <p className="text-red-600">Tipo documento es requerido</p>
                )}
              </div>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='document'>Documento</label>
                <input
                  id='document'
                  type="number"
                  placeholder='Numero de documento'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register('document', { required: true })}
                />
                {errors.document && (
                  <p className="text-red-600">Documento es requerido</p>
                )}
              </div>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='email'>Correo Electronico</label>
                <input
                  id='email'
                  type="email"
                  placeholder='Email de Registro'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-red-600">Email es requerido</p>
                )}
              </div>
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='password'>Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <p className="text-red-600">La contraseña es requerida</p>
                )}
              </div>
              <input
                type="submit"
                value="Crear Cuenta"
                className='bg-green-600 w-full py-1 text-white  font-bold rounded-xl
                hover: cursor-pointer hover:bg-green-700 transition-color'
              />
              <Link className='block my-5 text-slate-500  text-xs' to='/'>¿Ya tienes una cuenta? Inicia sesion</Link>
            </form>
            <nav className='lg:flex lg: justify-between'></nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
