import { Link } from "react-router-dom"
const Register = () => {
  return (
    <>
    <div className="flex  justify-center items-center min-h-[80vh]">
            <div className="w-1/4 h-full flex flex-col justify-center">
            
            <h1 className="text-green-800 font-black text-6xl capitalize ">AGRO
                    <span className="text-green-500 text-8xl">360°</span>
                    <h3 className='text-green-800 text-sm flex justify-center '>Evaluacion de desempeño</h3>
                </h1>
            </div>



            <div className="w-3/5 h-full ">
            <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
            <strong className=' text-green-600  text-5xl capitalize font-sans'>Crea tu cuenta</strong>

            <form className='my-10 bg-white shadow rounded-lg px-10 py-5 w-1/2'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-sm font-bold'
                    htmlFor='names'
                    >Nombres</label>
                    <input 
                    id='names'
                    type="text" 
                    placeholder='Nombres'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-sm font-bold'
                    htmlFor='lastnames'
                    >Apellidos</label>
                    <input 
                    id='lastnames'
                    type="text" 
                    placeholder='Apellidos'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                  <label className='uppercase text-gray-600 block text-sm font-bold' htmlFor='select'>
                    Tipo de Documento:
                  </label>
                  <select id='documentType' name='documentType' className='w-full mt-3 p-3 border rounded-xl bg-gray-50'>
                    <option value='opcion1'>CC</option>
                    <option value='opcion2'>CE</option>
                    <option value='opcion3'>TI</option>
                  </select>
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-sm font-bold'
                    htmlFor='document'
                    >Documento</label>
                    <input 
                    id='document'
                    type="number" 
                    placeholder='Numero de documento'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                     <label className='uppercase text-gray-600 block text-sm font-bold'
                     htmlFor='email'
                     >Correo Electronico</label>
                     <input
                     id='email'
                     type="text"
                     placeholder='Email de Registro'
                     className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    />
                   </div>
                
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-sm font-bold'
                    htmlFor='password'
                    >Contraseña</label>
                     
                    <input 
                    id='password'
                    type="password" 
                    placeholder='Password de Registro'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    />

                </div>
                <input 
                type="submit" 
                value="Iniciar Sesion"
                className='bg-green-600 w-full py-1 text-white uppercase font-bold rounded-xl
                hover: cursor-pointer hover:bg-green-700 transition-color'
                />
                    <Link
                        className='block my-5 text-slate-500 uppercase text-xs'
                        to='/'
                    >¿Ya tienes una cuenta? Inicia sesion</Link>
            </form>

            <nav className='lg:flex lg: justify-between'>
                    
                    
            </nav>

             </div>

        </div>
    </div>
      

   
    </>
  )
}

export default Register
