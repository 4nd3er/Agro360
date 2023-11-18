import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import axios from 'axios'



const Register = () => {
  //Variable que contiene los datos del formulario
  const [ names, setNames] = useState('')
  const [ lastnames, setLastnames] = useState('')
  const [ documentType, setDocumentType] = useState('')
  const [ document, setDocument] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ alert, setAlert] = useState({})

  // variable para el envio de datos por el boton 
  const handleSubmit = async e =>{
    e.preventDefault()

    //Validacion todos los campos deben ser obligatorios
    if ([names, lastnames, documentType, document, email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
     //Validacion de contraseña mayor a 8 caracteres
    if (password.length <8) {
      setAlert({
        msg: 'la contraseña es muy corta, minimo 8 caracteres',
        error: true
      })
      return
    }
    setAlert({})

    //Registro de usuario 
    try {
      //TODO: Mover hacia un cliente Axios
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, //Conexion a la API por medio del metodo Axios
      {names, lastnames, documentType, document, email, password})
      //Alerta de registro exitoso
      setAlert({
        msg: data.msg,
        error: false
      })
      setNames('')
      setLastnames('')
      setDocumentType('')
      setDocument('')
      setEmail('')
      setPassword('')
      //Alerta de usuario ya registrado
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alert

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

            {msg && <Alert alert={alert}/>}
            <form 
            
              className='my-10 bg-white shadow rounded-lg px-10 py-5 w-1/2'
              //boton listo para envio de datos
              onSubmit={handleSubmit}> 
                <div className='my-5'>
                    <label className=' text-gray-600 block text-sm font-bold'
                    htmlFor='names'
                    >Nombres</label>
                    <input 
                    id='names'
                    type="text" 
                    placeholder='Nombres'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={names}
                    onChange={e => setNames (e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-sm font-bold'
                    htmlFor='lastnames'
                    >Apellidos</label>
                    <input 
                    id='lastnames'
                    type="text" 
                    placeholder='Apellidos'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={lastnames}
                    onChange={e => setLastnames (e.target.value)}
                    />
                </div>
                <div className='my-5'>
                  <label className=' text-gray-600 block text-sm font-bold' 
                    htmlFor='select'
                    >Tipo de Documento:</label>
                  <select 
                    id='documentType' 
                    type="text"
                    name='documentType' 
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={documentType}
                    onChange={e => setDocumentType (e.target.value)}>
                    <option value=''>Seleccione</option>
                    <option value='opcion2'>CC</option>
                    <option value='opcion2'>CE</option>
                    <option value='opcion3'>TI</option>
                    
                  </select>
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-sm font-bold'
                    htmlFor='document'
                    >Documento</label>
                    <input 
                    id='document'
                    type="number" 
                    placeholder='Numero de documento'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={document}
                    onChange={e => setDocument (e.target.value)}
                    />
                </div>
                <div className='my-5'>
                     <label className=' text-gray-600 block text-sm font-bold'
                     htmlFor='email'
                     >Correo Electronico</label>
                     <input
                     id='email'
                     type="email"
                     placeholder='Email de Registro'
                     className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                     value={email}
                     onChange={e => setEmail (e.target.value)}
                    />
                   </div>

                <div className='my-5'>
                     <label className=' text-gray-600 block text-sm font-bold'
                     htmlFor='password'
                     >Contraseña</label>
                     <input 
                     id="password" 
                     type="password" 
                     placeholder="Contraseña" 
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
                     value={password}
                     onChange={e => setPassword (e.target.value)}
                     />
                    </div>
                
                
                <input 
                type="submit" 
                value="Crear Cuenta"
                className='bg-green-600 w-full py-1 text-white  font-bold rounded-xl
                hover: cursor-pointer hover:bg-green-700 transition-color'
                />
                    <Link
                        className='block my-5 text-slate-500  text-xs'
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
