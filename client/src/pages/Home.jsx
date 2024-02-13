import { useEffect, useState } from 'react'
import CardRol from '../components/CardRol'
import { useAuth, useRoles } from '../context/Context.js'
import { Spinner } from '../components/Components'
import '../App.css'
import { Link } from 'react-router-dom'

const Home = () => {
    const { getRoles, loading } = useRoles();
    const { user } = useAuth();
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const Roles = async () => {
            const res = await getRoles();
            setRoles(res)
        }
        Roles();
    }, [])

    if (loading) return <Spinner />

    return (
        <div className='min-h-[80vh] py-16 px-8'>
            <header className='mb-20 flex flex-row items-center justify-center w-full relative'>
                <p className="text-center">
                    <span className="font-semibold text-color-sena text-7xl italic">
                        Bienvenido
                        <br />
                    </span>
                    <span className="text-black text-2xl">
                        {user.user}
                    </span>
                </p>
                <section className='flex flex-col justify-center items-end gap-4 absolute right-0 w-24'>
                    <Link to='charge-data'>
                        <button className="btn w-full flex flex-row justify-center items-center gap-2 text-white bg-color-sena hover:bg-color-sena-hover" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 9l5 -5l5 5" />
                                <path d="M12 4l0 12" />
                            </svg>
                            Cargar Datos
                        </button>
                    </Link>
                    <Link to='register-admin'>
                        <button className="btn w-full flex flex-row justify-center items-center gap-2 text-white bg-color-sena hover:bg-color-sena-hover" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-shield" width="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
                                <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            </svg>
                            Nuevo Administrador
                        </button>
                    </Link>
                </section>
            </header>
            <main className="grid grid-cols-3 gap-4">
                {/* Iterate roles */}
                {roles.length ?
                    roles.map(rol => (
                        <CardRol
                            key={rol._id}
                            rol={rol}
                        />
                    ))
                    : <h3 className="text-2xl text-gray-600">Aún no hay roles</h3>}
            </main>
        </div>
    )
}

export default Home
