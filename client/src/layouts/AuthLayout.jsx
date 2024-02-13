import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import { useAuth } from '../context/Context'
import { useEffect } from 'react';

const AuthLayout = () => {
    const { checkLogin } = useAuth()

    useEffect(()=>{
        checkLogin();
    }, [])
    
    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-row">
                    <div className="w-[15%]">
                        <Menu />
                    </div>
                    <div className="w-5/6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout