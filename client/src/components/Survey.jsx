import React, { useState } from 'react';
import '../css/Survey.css';


const Survey = ({ title, imageSrc, isActive, id }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Renderiza el componente Survey
    <div
      className="card relative cursor-pointer hover:scale-110 transition-all hover:translate-y-[-1.25rem]">
      <div className={`activoinactivo flex place-items-center absolute top-[-5px] rounded-full px-2 ${ !isActive ? 'border-red-500 text-red-500' : ''}`}>{isActive ? "Activo" : "Inactivo"}</div> {/* Muestra 'Activo' o 'Inactivo' dependiendo del valor de 'isActive' */}
      <div className='flex flex-col place-items-center p-0 m-0 overflow-hidden'>
        <div className='bg-[#39A900] rounded-b-md px-4 pt-2 pb-2'>
          <img src={imageSrc} className='' style={{ width: "105px", height: "100px" }} />
        </div>
        <div className='w-full mb-4'>
          <h2 className='h2Style text-xs border-t-2 px-4 border-[#39A900]'>
            {title}
            {/* <div className="menuStyle">
          <button onClick={toggleMenu}>...</button> Un botón que muestra puntos  y se activa al hacer clic
          {isMenuOpen && (
            <ul className="menuStyle absolute w-32">
              <li className="menuItemsStyle">Ver</li>
              <li className="menuItemsStyle">Resultados</li>
            </ul>
          )}
        </div> */}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Survey; 
