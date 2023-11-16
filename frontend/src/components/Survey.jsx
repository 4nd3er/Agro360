import React, { useState } from 'react';
import '../css/Survey.css'; 


const Survey = ({ title, imageSrc, isActive }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Renderiza el componente Survey
    <div className="card"> 
      <div className="activoinactivo">{isActive ? "Activo" : "Inactivo"}</div> {/* Muestra 'Activo' o 'Inactivo' dependiendo del valor de 'isActive' */}
      <img src={imageSrc} style={{ width: "105px", height: "80px" }} />
      <h2 className="h2Style">{title} 
          <div className="menuStyle"> 
          <button onClick={toggleMenu}>...</button> {/* Un botón que muestra puntos  y se activa al hacer clic */}
          {isMenuOpen && (
            <ul className="menuStyle"> 
              <li className="menuItemsStyle">Ver</li> 
            </ul>
          )}
        </div>
      </h2>
    </div>
  );
};

export default Survey; 
