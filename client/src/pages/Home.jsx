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

    if (!user) return <Spinner/>
    
    return (
        <div className='min-h-[80vh]'>
            <div className="w-[950px] mx-auto">
                <header className='mt-14 mb-20 flex flex-row items-center justify-center'>
                    <p className="text-center">
                        <span className="font-semibold text-color-sena text-7xl italic">
                            Bienvenido
                            <br />
                        </span>
                        <span className="text-black text-2xl">
                            {user.data.user}
                        </span>
                    </p>
                    <Link to='charge-data' className='relative -right-60'>
                        <button className="btn text-white bg-color-sena hover:bg-color-sena-hover" type="button">Cargar Datos</button>
                    </Link>
                </header>
                <main className="grid grid-cols-3 gap-4">
                    {/* Iterate roles */}
                    {loading ? <Spinner /> :
                        roles.length ?
                            roles.map(rol => (
                                <CardRol
                                    key={rol._id}
                                    rol={rol}
                                />
                            ))
                            : <h3 className="text-2xl text-gray-600">Aún no hay roles</h3>}
                </main>
            </div>
        </div>
    )
}

export default Home
