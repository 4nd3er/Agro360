import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layouts/components/Navbar';
import Menu from '../layouts/components/Menu';

const AuthLayout = () => {

    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-row">
                    <div className="w-[0%] md:w-[0%] lg:w-[15%] xl:w-[15%]">
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