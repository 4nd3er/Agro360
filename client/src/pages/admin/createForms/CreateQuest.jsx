import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OptionsQuest from './components/OptionsQuest';
import { useRoles, useForms } from '../../../context/Context';
import Swal from 'sweetalert2';
import {
	AddQuestionSvg,
	ImportQuestionSvg,
} from '../../../assets/Assets';
import { Spinner } from '../../../components/Components';

const CreateQuest = () => {
	const params = useParams();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [descrip, setDescrip] = useState('');
	const [topic, setTopic] = useState('');
	const [questionsType, setQuestionsType] = useState([]); //Question Types
	const [date, setDate] = useState('');
	const [questions, setQuestions] = useState(() => JSON.parse(localStorage.getItem('questions')) || [[['question', ""], ['type', ""], ['options', ['']]]]);
	const [optionsAdded, setOptionsAdded] = useState(false);
	const [role, setRole] = useState('');
	const { getTopic } = useRoles();
	const { createForm, getQuestionsType } = useForms();
	const [validationQuestionContent, setValidationQuestionContent] = useState(false);
	const [validationQuestionType, setValidationQuestionType] = useState(false);
	const [validationQuestionOption, setValidationQuestionOption] = useState(false);
	const questionTypeValue = {};

	useEffect(() => {
		const titleParam = searchParams.get('titulo');
		const descripParam = searchParams.get('descripcion');
		const topicParam = searchParams.get('opciones');
		const fechaParam = searchParams.get('fecha');

		if (titleParam && descripParam && topicParam && fechaParam) {
			localStorage.setItem('title', titleParam);
			localStorage.setItem('descrip', descripParam);
			localStorage.setItem('topic', topicParam);
			localStorage.setItem('date', fechaParam);
		}
		setTitle(localStorage.getItem('title'));
		setDescrip(localStorage.getItem('descrip'));
		setTopic(localStorage.getItem('topic'));
		setDate(localStorage.getItem('date'));
		if (!localStorage.getItem('title') && !localStorage.getItem('descrip') && !localStorage.getItem('topic') && !localStorage.getItem('date')) {
			window.location.href = '/crear-formulario';
		}
	}, [])
	
	useEffect(() => {
		const questionType = async () => {
			const res = await getQuestionsType();
			setQuestionsType(res)
		}
		questionType();
	}, [])

	useEffect(() => {
		const getTopicRequest = async () => {
			const getLocalTopic = localStorage.getItem('topic');
			const res = await getTopic(getLocalTopic);
			setTopic(res);
			setRole(res.role);
			setLoading(false);
		}
		getTopicRequest();
	}, [])

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);



	if (questionsType) {
		questionsType.map((questionType) => {
			questionTypeValue[questionType._id] = questionType.name;
		})
	}

	const addOption = (questionIndex) => {
		const updatedQuestions = [...questions];
		const currentQuestion = updatedQuestions[questionIndex];
		currentQuestion[2][1].push('');
		updatedQuestions[questionIndex] = currentQuestion;
		setQuestions(updatedQuestions);
		window.scrollBy({
			top: 40,
			left: 0,
			behavior: 'smooth'
		});
	};

	const addQuestion = () => {
		setQuestions([...questions, [['question', ""], ['type', ""], ['options', ['']]]]);
		window.scrollBy({
			top: window.scrollY,
			left: 0,
			behavior: 'smooth'
		});
	};

	const deleteOption = (id, questionIndex) => {
		const updatedQuestions = [...questions];
		const currentQuestion = updatedQuestions[questionIndex];
		updatedQuestions[questionIndex][2][1] = currentQuestion[2][1].filter((_, index) => index !== id);
		setQuestions(updatedQuestions);
	};

	const deleteQuestion = (questionIndex) => {
		const updatedQuestion = [...questions];
		setQuestions(updatedQuestion.filter((_, index) => index !== questionIndex));
	}

	const handleQuestionChange = (value, questionIndex) => {
		const updatedQuestions = [...questions];
		const currentQuestion = updatedQuestions[questionIndex];
		currentQuestion[0][1] = value;
		updatedQuestions[questionIndex] = currentQuestion;
		setQuestions(updatedQuestions);
	};

	const handleQuestionTypeChange = (value, questionIndex) => {
		const updatedQuestions = [...questions];
		const currentQuestion = updatedQuestions[questionIndex];
		currentQuestion[1][1] = value;
		if (questionTypeValue[value] === 'Escala de Likert') {
			currentQuestion[2][1] = ['scale'];
			setOptionsAdded(() => !optionsAdded);
		}
		else if (questionTypeValue[value] == 'Respuesta Abierta') {
			currentQuestion[2][1] = ['text'];
			setOptionsAdded(() => !optionsAdded);
		}
		else {
			if (currentQuestion[2][1] == 'text' || currentQuestion[2][1] == 'scale') {
				currentQuestion[2][1] = [''];
			}
		}
		updatedQuestions[questionIndex] = currentQuestion;
		setQuestions(updatedQuestions);
	};

	const handleOptionChange = (questionIndex, optionIndex, value) => {
		const updatedQuestions = [...questions];
		const currentQuestion = updatedQuestions[questionIndex];
		currentQuestion[2][1][optionIndex] = value;
		updatedQuestions[questionIndex] = currentQuestion;
		setQuestions(updatedQuestions);
	};


	let optionss = [];
	const arraytoObject = (array) => {
		var newObject = {};
		for (let i = 0; i < array.length; i++) {
			newObject[array[i][0]] = array[i][1];
		}

		for (let i of Object.keys(array[2][1])) {
			const key = `option`;
			let value = array[2][1][i];
			const optionObject = { [key]: value };
			optionss.push(optionObject);
		}
		newObject[array[2][0]] = optionss;
		optionss = [];
		return newObject;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		let isContentValid = 0;
		let isTypeValid = 0;
		let isOptionValid = 0;
		questions.forEach((question) => {
			if (question[0][1] != '') {
				setValidationQuestionContent(true);
				isContentValid += 1;
			}

			if (question[1][1] != '') {
				setValidationQuestionType(true);
				isTypeValid += 1;
			}
			question[2][1].forEach((option) => {
				if (option != '' || option.length > 3) {
					setValidationQuestionOption(true);
					isOptionValid += 1;
				}
			});
		});
		if ((isContentValid == questions.length) && (isTypeValid == questions.length) && (isOptionValid == questions.length)) {
			try {
				let questionsObject = []
				questions.map((question) => {
					questionsObject.push(arraytoObject(question));
				})
				await createForm({
					name: title, description: descrip, topic: topic._id, end: date,
					questions: questionsObject
				})
				Swal.fire({
					icon: 'success',
					title: 'Encuesta creada!',
					text: 'Se ha guardado la encuesta exitosamente',
					timer: 2000,
					showConfirmButton: false,
					timerProgressBar: true,
				});
				setTimeout(() => {
					window.location.href = `/inicio/tematicas/${role}/encuestas/${topic._id}`;
					localStorage.removeItem('title');
					localStorage.removeItem('descrip');
					localStorage.removeItem('topic');
					localStorage.removeItem('date');
					localStorage.removeItem('questions');
				}, 2100);
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Error al crear la encuesta',
					text: error.response.data.message,
					showConfirmButton: true,
				});
			}
		}
	};

	if (loading) return <Spinner />

	return (
		<aside>
			<section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
				<div className='border-color-sena text-color-sena font-bold border-b-[3px] w-full text-center pb-1'>Preguntas</div>
			</section>
			<form onSubmit={handleSubmit}>
				<section className='flex flex-col justify-start mt-5 min-h-[70vh] w-full lg:w-3/4 xl:w-3/4 mx-auto gap-10 mb-20 p-3 md:p-10 lg:p-0'>
					<div className='p-2 py-4 text-center border-2 rounded-md flex flex-col gap-5 shadow-lg'>
						<h1 className='text-4xl font-bold'>{title}</h1>
						<h1 className='text-2xl'>{descrip}</h1>
						<h1 className='text-xl text-[#39A900]'>{topic.name}</h1>
					</div>
					<div className='w-full flex flex-col justify-start mx-auto gap-10'>
						{questions.map((question, questionIndex) => (
							<div
								key={questionIndex + 1}
								className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-2'
							>
								<div className='flex flex-col md:flex-row lg:flex-row xl:flex-row lg:justify-between px-1 lg:px-10 gap-3'>
									<input
										placeholder='Digite la pregunta'
										className='border-b-2 p-2 border-gray-400 w-full lg:w-3/6 transition-all'
										value={question[0][1]}
										onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
									/>
									<select
										className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg md:w-2/5'
										value={question[1][1]}
										onChange={(e) => handleQuestionTypeChange(e.target.value, questionIndex)}
									>
										<option value="">Seleccione un tipo de pregunta</option>
										<option value="6556ddbbfe823a88d48fafc4">Escala de Likert</option>
									</select>
									<div className='my-auto lg:hover:scale-110 transition-transform'>
										<svg
											onClick={() => deleteQuestion(questionIndex)}
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
											<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
										</svg>
										{/* <img className='' src={DeleteQuestionSvg} onClick={() => deleteQuestion(questionIndex)} /> */}
									</div>
								</div>
								<div className='px-10 mb-5 text-red-500 flex justify-around select-none'>
									<span className={`${question[0][1] === '' && validationQuestionContent < question.length ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Este campo es obligatorio</span>
									<span className={`${question[1][1] === '' && validationQuestionType < question.length ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Seleccione un elemento de la lista</span>
								</div>
								<div className='px-0 lg:px-10'>
									{question[2][1].map((option, index) => (
										<OptionsQuest
											key={index + 1}
											questionIndex={questionIndex}
											index={index}
											option={option}
											question={question}
											handleOptionChange={handleOptionChange}
											addOption={addOption}
											deleteOption={deleteOption}
											questionTypeValue={questionTypeValue}
											validationQuestionOption={validationQuestionOption}
											params={params}
										/>
									))}
									{question[1][1] && (questionTypeValue[question[1][1]] !== 'Escala de Likert' && questionTypeValue[question[1][1]] !== 'Escala de Puntuación' && questionTypeValue[question[1][1]] !== 'Respuesta Abierta') && (
										<div className='flex justify-between my-5 cursor-pointer place-items-center'>
											<span className={`${question[2][1].length < 3 && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-red-500`}>Las pregunta debe contener al menos tres opciones</span>
											<div onClick={() => addOption(questionIndex)} className="border-2 p-2 rounded left-1 top-0 cursor-pointer">Agregar Opción</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</section>
				<section>
					<button
						type='submit'
						className='fixed bottom-8 right-1 lg:right-6 bg-[#39A900] px-7 py-2 text-white rounded-lg'
					>
						Guardar
					</button>
				</section>
			</form>
			<section className='fixed bottom-20  right-1 lg:right-28 bg-white p-2 rounded-xl border-2 shadow-xl'>
				<div className='flex flex-col gap-5 place-items-center'>
					<button onClick={addQuestion}>
						<img className='max-w-8 hover:scale-110 transition-all' src={AddQuestionSvg} />
					</button>
					<button>
						<img className='max-w-10 hover:scale-110 transition-all' src={ImportQuestionSvg} />
					</button>
				</div>
			</section>
		</aside>
	)
}

export default CreateQuest;