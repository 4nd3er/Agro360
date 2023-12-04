import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../layouts/css/menu.css';

const Menu = () => {
    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(() => (!close));
    }

    const handleBack = () => {
        window.history.back();
    }

    // const pathName = location.pathname
    const pathName = (location.pathname.split('/')[1])

    return (
        <>
            <div className={`navigation ${close ? 'close' : ''}`}>
                <div className={close ? 'menuArrow' : 'menuToggle'} onClick={handleClose}>
                    {close ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-right" width="100%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#39a900" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                    </svg> : null}
                </div>
                <ul>
                    <li className={`list ${pathName === "inicio" || pathName === "tematicas" ? "active" : ''}`} style={{ "--clr": "#39A900" }}>
                        <Link to="/inicio">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                                <span className="text">Inicio</span>
                            </span>
                        </Link>
                    </li>
                    <li className={`list ${pathName === "crear-formulario" ? "active" : ''}`} style={{ "--clr": "#00324D" }}>
                        <Link to="/crear-formulario">
                            <span className="icon">
                                <ion-icon name="clipboard-outline"></ion-icon>
                                <span className="text">Crear Formulario</span>
                            </span>
                        </Link>
                    </li>
                    <li className={`list ${pathName === "resultados" ? "active" : ''}`} style={{ "--clr": "#CB7766" }}>
                        <Link to="/resultados">
                            <span className="icon">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                                <span className="text">Resultados</span>
                            </span>
                        </Link>
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