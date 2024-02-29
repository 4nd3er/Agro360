import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layouts/components/Navbar';
import Menu from '../layouts/components/Menu';

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
                    <div className="w-[0%] md:w-[10%] lg:w-[15%] xl:w-[15%]">
                        <Menu />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout