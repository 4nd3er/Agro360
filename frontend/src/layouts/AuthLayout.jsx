import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';

const AuthLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar /> 
                <div className="flex flex-row flex-1">
                    <div className="w-1/6">
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