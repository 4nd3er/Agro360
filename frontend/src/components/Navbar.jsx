import React from 'react';
import Logo from '../img/logoAgro360.png';
import Perfil from '../img/perfil.png';
import '../layouts/css/navbar.css';

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