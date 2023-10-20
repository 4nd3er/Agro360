import React from 'react';
import { useState } from 'react';
import '../menu.css';

const Menu = () => {

    const [active, setActive] = useState('');
    const [close, setClose] = useState('');

    const handleClose = () => {
        setClose(setClose => ({
            close: !setClose.close
        }));
    }

    const handleBack = () => {
        window.history.back();
    }

    setTimeout(() => {
        setActive('active');
    }, 100);

    return (
        <>
            <div className={`navigation ${close.close ? 'close' : ''}`}>
                <div
                    className="menuToggle"
                    onClick={handleClose}
                ></div>
                <ul>
                    <li className={`list ${location.pathname === "/" ? active : ''}`} style={{ "--clr": "#39A900" }}>
                        <a href="/">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                                <span className="text">Inicio </span>
                            </span>
                        </a>
                    </li>
                    <li className={`list ${location.pathname === "/crear-formulario" ? active : ''}`} style={{ "--clr": "#00324D" }}>
                        <a href="/crear-formulario">
                            <span className="icon">
                                <ion-icon name="clipboard-outline"></ion-icon>
                                <span className="text">Crear Formulario </span>
                            </span>
                        </a>
                    </li>
                    <li className={`list ${location.pathname === "/resultados" ? active : ''}`} style={{ "--clr": "#CB7766" }}>
                        <a href="/resultados">
                            <span className="icon">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                                <span className="text">Resultados </span>
                            </span>
                        </a>
                    </li>
                </ul>
                <div
                    className="back"
                    onClick={handleBack}
                >
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    <p>Volver</p>
                </div>
            </div>
        </>
    )
}

export default Menu