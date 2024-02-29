import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/Context';
import { ErrorsFormAlert } from '../../../components/Components';

const RegisterAdmin = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { isValid }, } = useForm();
  const { signup, errors, success } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signup(data)
    if (res) {
      setTimeout(() => {
        navigate('/inicio')
        location.reload()
      }, 3000)
    }
  })

  return (
    <>
      <article className="min-h-[80vh] flex items-center justify-center">
        <section className="w-3/5 h-full flex flex-col justify-center items-center border-2 rounded-2xl border-gray-200 py-6 shadow-xl">
          <header>
            <h1 className="text-color-sena font-black text-3xl mb-8">Nuevo administrador</h1>
          </header>
          <ErrorsFormAlert errors={errors} success={success} />
          <form className='flex flex-col gap-6 w-3/4' onSubmit={onSubmit}>
            {/*--------*/}
            <section className="flex flex-row gap-2 justify-between">
              <div className="w-full">
                <label className=' text-color-gray block text-sm font-bold' htmlFor='names'>Nombres</label>
                <input id='names' type="text" placeholder='Nombres' className='w-full mt-3 p-2 border rounded-xl bg-register-label focus-visible: outline-8 outline-color-sena'
                  {...register('names', {
                    required: true,
                    minLength: 3
                  })}
                />
              </div>
              <div className="w-full">
                <label className=' text-color-gray block text-sm font-bold' htmlFor='lastnames'>Apellidos</label>
                <input id='lastnames' type="text" placeholder='Apellidos' className='w-full mt-3 p-2 border rounded-xl bg-register-label focus-visible: outline-8 outline-color-sena'
                  {...register('lastnames', {
                    required: true,
                    minLength: 5
                  })}
                />
              </div>
            </section>
            {/*--------*/}
            <section className="flex flex-row gap-2">
              <div className="w-full">
                <label className=' text-color-gray block text-sm font-bold' htmlFor='email'>Correo Electronico</label>
                <input id='email' type="email" placeholder='Email de Registro' className='w-full mt-3 p-2 border rounded-xl bg-register-label focus-visible: outline-8 outline-color-sena'
                  {...register('email', {
                    required: true,
                    validate: (value) => {
                      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      return emailRegex.test(value)
                    }
                  })}
                />
              </div>
              <div className="w-full">
                <label className=' text-color-gray block text-sm font-bold' htmlFor='password'>Contraseña</label>
                <input id="password" type="password" placeholder="Contraseña" className="w-full mt-3 p-2 border rounded-xl bg-register-label focus-visible: outline-8 outline-color-sena"
                  {...register('password', {
                    required: true,
                    minLength: 8
                  })}
                />
              </div>
            </section>
            {/*--------*/}
            <section className="w-full flex items-center justify-center mt-4">
              <button
                type="submit"
                className={`${isValid ? 'bg-color-sena hover:cursor-pointer hover:bg-color-sena-hover' : 'bg-color-gray cursor-default'} w-1/2 py-1 text-white rounded-xl  transition-color`}
                disabled={!isValid}>
                Registrar
              </button>
            </section>
          </form>
        </section>
      </article>
    </>
  )
}

export default RegisterAdmin
