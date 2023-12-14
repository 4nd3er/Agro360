import React, { useEffect, useState } from 'react';
import '../css/Create.css';
import Alert from './Alert';
import { useRoles } from '../context/Context.js';
import { imgNuevaEncuesta } from '../assets/Assets.jsx';

const Create = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { getTopics } = useRoles();
	const [alert, setAlert] = useState({});
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		const Topics = async () => {
			const res = await getTopics();
			setTopics(res)
		}
		Topics();
	}, [])

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
		setFormValues({ ...formValues, fecha: nuevaFecha });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const cleaned = () => {
			setTimeout(() => {
				setAlert({})
			}, 1500);
		}

		if ([formValues.titulo, formValues.descripcion, formValues.opciones, formValues.fecha].includes('')) {
			setAlert({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			cleaned();
			return;
		}
		if (formValues.descripcion.length < 16) {
			setAlert({
				msg: 'La descripcion debe ser mayor a 16 caracteres',
				error: true
			})
			cleaned();
			document.form.descripcion.focus();
			return;
		}
		if (formValues.fecha < `${new Date().toISOString().split('T')[0]}T${new Date().toString().split(' ').splice(2, 3)[2]}`) {
			setAlert({
				msg: 'La hola asignada debe ser mayor a la recurrente',
				error: true
			})
			cleaned();
			document.form.fecha.focus();
			return;
		}
		localStorage.removeItem('questions');
		document.form.submit();
	};

	const { msg } = alert;

	return (
		<div className='flex-container'>
			<div>
				<div className="image-label">
					CREAR ENCUESTA
				</div>
				<img
					src={imgNuevaEncuesta}
					alt="img"
					className="img-icon cursor-pointer hover:scale-110 transition"
					onClick={openModal}
				/>
			</div>

			{isModalOpen && (
				<div className="modal" onClick={handleModalClick}>
					<div className="modal-form">
						<h2 className="modal-title">CREAR ENCUESTA</h2>
						{msg && <Alert alert={alert} />}
						<form onSubmit={handleSubmit} name="form" action='crear-formulario/crear/' noValidate>
							<div className="input-container">
								<label htmlFor="titulo">Titulo</label>
								<input
									type="text"
									id="titulo"
									name="titulo"
									placeholder="Titulo"
									value={formValues.titulo}
									onChange={handleInputChange}
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
								/>
							</div>

							<div className="input-container">
								<label htmlFor="opciones">Temáticas</label>
								<select
									id="opciones"
									name="opciones"
									value={formValues.opciones}
									onChange={handleInputChange}
									className="input-select"
								>
									<option value="">Seleccione Temática</option>
									{topics.map((topic) => (
										<option key={topic._id} value={topic._id}>{topic.name}</option>
									))}
								</select>
							</div>

							<div className="input-container">
								<label htmlFor="fecha">Plazo maximo de responder</label>
								<input
									id="fecha"
									name="fecha"
									type="datetime-local"
									value={formValues.fecha}
									onChange={manejarCambioFecha}
									min={`${new Date().toISOString().split(':')[0]}:${new Date().toISOString().split(':')[1]}`}
									className="input-select"
								/>
							</div>

							<div className="form-buttons">
								<button type="button" onClick={closeModal} className="button-cancel">
									Cerrar
								</button>
								<button type="submit" className="button-accept">
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
