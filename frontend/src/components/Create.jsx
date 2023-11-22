import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Create.css';
import Swal from 'sweetalert2';
import agro360Axios from '../config/agro360Axios';

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topics, setTopics] = useState([]);

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
    fecha: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const manejarCambioFecha = (e) => {
    const nuevaFecha = e.target.value;
    setFormValues({ ...formValues, fecha: nuevaFecha});
  };

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { data } = await agro360Axios('/topics');
        setTopics(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error,
          timer: 2000
        })
      }
    }
    getTopics();
  }, [])

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
            <form onSubmit={handleSubmit} action='crear-formulario/crear/'>
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
                  {topics.map((topic) => (
                    <option value={topic._id}>{topic.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="fecha">Plazo maximo de responder</label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formValues.fecha}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={manejarCambioFecha}
                  required
                  className="input-select"
                />
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
