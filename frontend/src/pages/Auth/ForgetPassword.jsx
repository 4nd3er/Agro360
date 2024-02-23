import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Alert from "../../components/Alert"


const ForgetPassword = () => {
    //Variable que contiene los datos del formulario
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})

    // variable para el envio de datos por el boton
    const handleSubmit = async e => {
        e.preventDefault()
        // validacion de email mayor a 6 caracteres
        if (email === '' || email.length < 6) {
            setAlert({
                msg: 'El email es Obligatorio',
                error: true
            })
            return
        }
        try {
            //TODO: Mover hacia un cliente Axios
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forget-password`,//Conexion a la API por medio del metodo Axios
                { email, })
            setAlert({
                msg: data.msg,
                error: false
            })
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
                        <p className='text-green-800 text-sm flex justify-center '>Evaluación de Desempeño</p>
                    </h1>
                </div>



                <div className="w-3/5 h-full ">
                    <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
                        <strong className=' text-green-600  text-5xl capitalize font-sans'>Recupera tu cuenta</strong>

                        {msg && <Alert alert={alert} />}
                        <form

                            className='my-10 bg-white shadow rounded-lg px-10 py-5 w-1/2'
                            //boton listo para envio de datos
                            onSubmit={handleSubmit}>
                            <div className='my-5'>
                                <label className=' text-gray-600 block text-sm font-bold'
                                    htmlFor='email'
                                >Correo Electrónico</label>
                                <input
                                    id='email'
                                    type="email"
                                    placeholder='Email de Registro'
                                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Enviar"
                                className='bg-green-600 w-full py-1 text-white uppercase font-bold rounded-xl
                        hover: cursor-pointer hover:bg-green-700 transition-color'
                            />


                            <nav className=''>

                                <Link
                                    className='block my-5 text-slate-500 uppercase text-xs'
                                    to='/'
                                    style={{ marginLeft: 'auto' }}
                                >
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
