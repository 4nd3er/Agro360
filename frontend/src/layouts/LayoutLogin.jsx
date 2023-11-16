import React from 'react';
import '../navbar.css';
import Logo from '../img/logoAgro360.png';
import LogoBlanco from '../img/LogoBlanco.png';
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
    return (
        <>
            <header className="navbar flex justify-center">
                <img className="logoSena" src={LogoBlanco} />
            </header>

            <Outlet />
        </>
    )
}

export default LayoutLogin