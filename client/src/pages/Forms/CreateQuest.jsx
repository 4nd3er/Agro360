import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AddQuestionSvg, ImportQuestionSvg, DeleteQuestionSvg } from '../../assets/Assets.jsx';
import { Options } from '../../components/Components.jsx';
import '../../css/question.css';
import Swal from 'sweetalert2';
import { useRoles, useForms } from '../../context/Context.js';

const CreateQuest = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [title, setTitle] = useState('');
	const [descrip, setDescrip] = useState('');
	const [topics, setTopics] = useState([]); //Topics 
	const [topic, setTopic] = useState('');
	const [questionsType, setQuestionsType] = useState([]); //Question Types
	const [date, setDate] = useState('');
	const [questions, setQuestions] = useState(() => JSON.parse(localStorage.getItem('questions')) || [[['question', ""], ['type', ""], ['options', ['']]]]);
	const [optionsAdded, setOptionsAdded] = useState(false);
	const { getTopics } = useRoles();
	const { createForm, getQuestionsType } = useForms();
	const [validationQuestionContent, setValidationQuestionContent] = useState(false);
	const [validationQuestionType, setValidationQuestionType] = useState(false);
	const [validationQuestionOption, setValidationQuestionOption] = useState(false);
	const questionTypeValue = {};

	useEffect(() => {
		const questionType = async () => {
			const res = await getQuestionsType();
			setQuestionsType(res)
		}
		questionType();
	}, [])

	useEffect(() => {
		const Topics = async () => {
			const res = await getTopics();
			setTopics(res)
		}
		Topics();
	}, [])

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);


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

	const handleSubmit = (e) => {
		e.preventDefault();
		let isContentValid = false;
		let isTypeValid = false;
		let isOptionValid = false;
		questions.forEach((question) => {
			if (question[0][1] == '') {
				setValidationQuestionContent(true);
				isContentValid = false;
			} else {
				setValidationQuestionContent(false);
				isContentValid = true;
			}

			if (question[1][1] == '') {
				setValidationQuestionType(true);
				isTypeValid = false;
			} else {
				setValidationQuestionType(false);
				isTypeValid = true;
			}
			question[2][1].forEach((option) => {
				if (option.length == '' || option.length < 2) {
					setValidationQuestionOption(true);
					isOptionValid = false;
				} else {
					setValidationQuestionOption(false);
					isOptionValid = true;
				}
			});
		});
		if (isContentValid && isTypeValid && isOptionValid) {
			try {
				let questionsObject = []
				questions.map((question) => {
					questionsObject.push(arraytoObject(question));
				})
				createForm({
					name: title, description: descrip, topic: topic, end: date,
					questions: questionsObject
				}).then((data) => {
					switch (data.response) {
						case 'Form created successfully':
							Swal.fire({
								icon: 'success',
								title: 'Encuesta creada!',
								text: 'Se ha guardado la encuesta exitosamente',
								timer: 2000,
								showConfirmButton: false,
								timerProgressBar: true,
							});
							setTimeout(() => {
								window.location.href = '/crear-formulario';
								localStorage.removeItem('title');
								localStorage.removeItem('descrip');
								localStorage.removeItem('topic');
								localStorage.removeItem('date');
								localStorage.removeItem('questions');
							}, 2100);
							break;
					}
				}).catch((error) => {
					switch (error.response.data.message) {
						case 'Form already exists':
							Swal.fire({
								icon: 'error',
								title: 'Encuesta duplicada',
								text: 'La encuesta que deseas registrar ya existe, intentalo mas tarde',
								showConfirmButton: true,
							});
							break;
					}
				});
			} catch (error) {
				Swal.fire({
					icon: 'error',
					text: error,
					showConfirmButton: true
				});
			}
		}
	};

	return (
		<aside>
			<section className='mt-5 mx-auto flex justify-center uppercase text-xl'>
				<div className='border-[#39A900] text-[#39A900] font-bold border-b-[3px] w-full text-center pb-1'>Preguntas</div>
			</section>
			<form onSubmit={handleSubmit}>
				<section className='flex flex-col justify-start mt-5 min-h-[70vh] w-3/4 mx-auto gap-10 mb-20'>
					<div className='p-2 py-4 text-center border-2 rounded-md flex flex-col gap-5 shadow-lg'>
						<h1 className='text-4xl font-bold'>{title}</h1>
						<h1 className='text-2xl'>{descrip}</h1>
						<h1 className='text-xl text-[#39A900]'>{
							topics.filter((i) => i._id === topic).map((topic) => topic.name)
						}</h1>
					</div>
					<div className='w-full flex flex-col justify-start mx-auto gap-10'>
						{questions.map((question, questionIndex) => (
							<div
								key={questionIndex + 1}
								className='border-2 border-gray-300 p-2 rounded-md flex flex-col gap-2'
							>
								<div className='flex justify-between px-10'>
									<input
										placeholder='Digite la pregunta'
										className='border-b-2 p-2 border-gray-400 w-3/6'
										value={question[0][1]}
										onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
									/>
									<select
										className='px-4 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] rounded-lg'
										value={question[1][1]}
										onChange={(e) => handleQuestionTypeChange(e.target.value, questionIndex)}
									>
										<option value="">Seleccione el tipo de pregunta</option>
										{questionsType ? questionsType.map((questionType) => (
											<option value={questionType._id}>{questionType.name}</option>
										)) : null}
									</select>
									<div className='cursor-pointer my-auto' onClick={() => deleteQuestion(questionIndex)}>
										<img src={DeleteQuestionSvg} />
									</div>
								</div>
								<div className='px-10 mb-5 text-red-500 flex justify-around select-none'>
									<span className={`${question[0][1] === '' && validationQuestionContent ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Este campo es obligatorio</span>
									<span className={`${question[1][1] === '' && validationQuestionType ? 'opacity-100' : 'opacity-0'} transition-[.1s_all]`}>Seleccione un elemento de la lista</span>
								</div>
								<div className='px-10'>
									{question[2][1].map((option, index) => (
										<Options
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
						className='fixed bottom-8 right-6 bg-[#39A900] px-3 py-2 text-white rounded-lg'
					>
						Guardar
					</button>
				</section>
			</form>
			<section className='fixed right-28 bottom-20 bg-white p-2 rounded-xl border-2 shadow-xl'>
				<div className='flex flex-col gap-5 place-items-center'>
					<button onClick={addQuestion}>
						<img className='max-w-8' src={AddQuestionSvg} />
					</button>
					<button>
						<img className='max-w-10' src={ImportQuestionSvg} />
					</button>
				</div>
			</section>
		</aside>
	)
}

export default CreateQuest;