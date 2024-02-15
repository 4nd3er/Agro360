import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import { useEffect } from 'react';

const AuthLayout = () => {

    useEffect(() => {
        var metaViewport = document.querySelector('meta[name="viewport"]');
        metaViewport.setAttribute('content', 'width=1024, initial-scale=1.0');
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