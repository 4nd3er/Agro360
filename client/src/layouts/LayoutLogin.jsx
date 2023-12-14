import React from 'react';
import './css/navbar.css';
import LogoBlanco from '@/img/logoblanco.png';
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
    return (
        <>
            <header className="header flex justify-center">
                <img className="logoSena" src={LogoBlanco} />
            </header>

            <Outlet />
        </>
    )
}

export default LayoutLogin