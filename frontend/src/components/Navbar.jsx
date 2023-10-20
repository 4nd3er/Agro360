import React from 'react';
import '../navbar.css';
import Logo from '../img/logoAgro360.png';
import Perfil from '../img/perfil.png';

const Navbar = () => {
    return (
        <>
            <header className="navbar">
                <img className="logo" src={Logo} />
                <img className="perfil" src={Perfil} />
            </header>
        </>
    )
}

export default Navbar