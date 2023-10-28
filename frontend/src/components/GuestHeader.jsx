import React from 'react'
import Logo from '../img/logoAgro360.png';
import LogoBlanco from '../img/LogoBlanco.png';

function GuestHeader() {
    return (
        <>
            <header className="navbar">
                <img className="logo" src={Logo} />
                <strong className='text-white'>Navbar solo de prueba, Hacer cambios de ser necesario</strong>
                <img className="logoSena" src={LogoBlanco} />
            </header>
        </>
    )
}

export default GuestHeader