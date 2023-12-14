import React from 'react';
import './css/navbar.css';
import { LogoSenaBlanco } from '../assets/Assets';
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
    return (
        <>
            <header className="header flex justify-center">
                <img className="logoSena" src={LogoSenaBlanco} />
            </header>

            <Outlet />
        </>
    )
}

export default LayoutLogin