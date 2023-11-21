import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Create.css'; 

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
    // e.preventDefault();

    // try {
    //   const response = await fetch('/api/encuestas', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formValues),
    //   });

    //   if (response.status === 201) {
    //     closeModal();
    //   } else {
    //     // Manejar el caso de error
    //   }
    // } catch (error) {
    //   // Manejar el caso de error
    // }
    // window.location.href = `crear/titulo=${formValues.titulo}&&descripcion=${formValues.descripcion}&&opciones=${formValues.opciones}`
  };
 
  return (
    <div className='flex-container'>
      <div className='text-center'>
        <div className="image-label text-Bold">
          CREAR ENCUESTA
        </div>
        <img
          src="src/img/Icon.png"
          alt="img"
          className="img-icon cursor-pointer"
          onClick={openModal}
        />
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-form">
            <h2 className="modal-title">CREAR ENCUESTA</h2>
            <form onSubmit={handleSubmit} action={`crear-formulario/crear/?titulo=${formValues.titulo}&&descripcion=${formValues.descripcion}&&opciones=${formValues.opciones}`}>
              <div className="input-container">
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Titulo"
                  value={formValues.titulo}
                  onChange={handleInputChange}
                  required
                  className="input-text"
                />
              </div>

              <div className="input-container">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripcion"
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="input-text"
                />
              </div>

              <div className="input-container">
                <label htmlFor="opciones">Temáticas</label>
                <select
                  id="opciones"
                  name="opciones"
                  value={formValues.opciones}
                  onChange={handleInputChange}
                  required
                  className="input-select"
                >
                  <option value="">Seleccione Temática</option>
                  <option value="Pedagogía">Pedagogía</option>
                  <option value="Actitudinal">Actitudinal</option>
                </select>
              </div>

              <div className="form-buttons">
                <button type="button" onClick={closeModal} className="button-cancel">
                  Cerrar
                </button>
                <button type="submit" className="button-accept">
                  {/* <Link to='crear'>Aceptar</Link> */}
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
