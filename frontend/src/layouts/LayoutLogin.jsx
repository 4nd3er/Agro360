import React from 'react';
import '../navbar.css';
import Logo from '../img/logoAgro360.png';
import LogoBlanco from '../img/LogoBlanco.png';
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
    return (
        <>
            <header className="navbar">
                <img className="logo" src={Logo} />
                <strong className='text-white'>Navbar solo de prueba, Hacer cambios de ser necesario</strong>
                <img className="logoSena" src={LogoBlanco} />
            </header>

            <Outlet />
        </>
    )
}

export default LayoutLogin