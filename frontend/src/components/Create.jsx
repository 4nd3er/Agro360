import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const [formValues, setFormValues] = useState({
    titulo: '',
    descripcion: '',
    opciones: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/encuestas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.status === 201) {
        closeModal();
       
      } else {
        
      }
    } catch (error) {
      
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-[30vh] relative'>
      <div className='text-center'>
        <div
          className="image-label text-Bold"
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "Verdana, sans-serif",
            position: "relative",
            top: "30px",
            left: "-345px",
          }}
        >
          CREAR ENCUESTA
        </div>

        <img
          src="src/img/Icon.png"
          alt="img"
          className="absolute left-5px h-32 w-22 m-4"
          onClick={openModal}
          style={{ position: "relative", top: "20px", left: "-330px" }}
        />
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-70 z-50" onClick={handleModalClick}>
          <div className="bg-white p-20 max-w-5xl rounded-lg shadow-md">
            <h2 className="text-4xl text-green-600 mb-5 font-bold">CREAR ENCUESTA</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <label
                  htmlFor="titulo"
                  style={{
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Titulo
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Titulo"
                  value={formValues.titulo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-green-500 rounded-md focus:ring focus:ring-green-400 focus:border-green-800 text-gray-500 mb-4"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <label
                  htmlFor="descripcion"
                  style={{
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Descripción:
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripcion"
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="w-full p-2 border border-green-500 rounded-md focus:ring focus:ring-green-400 focus:border-green-800 text-gray-500 mb-4"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}  >
                <label
                  htmlFor="opciones"
                  style={{
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "black",


                  }}
                >
                  Tematicas
                </label>
                <select
                  id="opciones"
                  name="opciones"
                  value={formValues.opciones}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-green-500 rounded-md focus:ring focus:ring-green-400 focus:border-green-800 text-gray-500 mb-4 "
                >
                  <option value="">Seleccione Tematica</option>
                  <option value="opcion1">Pedagogica</option>
                  <option value="opcion2">Actitudinal</option>
                </select>
              </div>


              <div className="flex justify-between space-x-4">
                <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 font-bold">
                  Cerrar
                </button>
                
      <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-500 font-bold">
        
        <Link to='crear'>Aceptar</Link>
      </button>

    
    
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create; 