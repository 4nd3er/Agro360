import CardRol from '../components/CardRol'
import '../App.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='min-h-[80vh]'>
            <div className="w-[950px] mx-auto">
                <header className='mt-10 mb-20'>
                    <p className="text-center">
                        <span className="font-bold text-black text-5xl font-work-sans">
                            BIENVENIDO
                            <br />
                        </span>
                        <span className="font-bold text-[#39a900] text-4xl">
                            FELIX MAGE
                        </span>
                    </p>
                </header>
                <main className="grid grid-cols-3 gap-4">
                    <Link to='/tematicas/1'>
                    <CardRol/>
                    </Link>            
                </main>
            </div>
        </div>
    )
}

export default Home
