import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForms } from '../../context/Context';
import { Spinner } from '../../components/Components';
import CardForm from '../../../components/CardForm';
import CreateQuestModal from '../../../components/CreateQuestModal';
import { imgNuevaEncuesta } from '../../../assets/Assets';
import { imgEncuesta } from '../../../assets/Assets';

const Quest = () => {
	const { getRecentlyForms } = useForms()
	const [recentlyForms, setRecentlyForms] = useState([])
	const [loading, setLoading] = useState(true)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		const getForms = async () => {
			const res = await getRecentlyForms()
			setRecentlyForms(res)
			setLoading(false)
		}
		getForms()
	}, [])

	if (loading) return <Spinner />

	return (
		<div className='flex flex-col justify-center items-center min-h-[80vh]'>
			<div className='text-center mt-1 place-items-center' style={{ marginBottom: '1rem' }}>
				<div>
					<div className="image-label">
						CREAR ENCUESTA
					</div>
					<img
						src={imgNuevaEncuesta}
						alt="img"
						className="img-icon cursor-pointer hover:scale-110 transition"
						onClick={() => setOpenModal(true)}
					/>
				</div>
				<CreateQuestModal modalState={{ openModal, setOpenModal }} />
				{localStorage.getItem('title') && localStorage.getItem('descrip') && localStorage.getItem('topic') && localStorage.getItem('date') && (
					<div className='relative w-44 bottom-32 left-96'>
						<Link
							to='crear'
							className='absolute right-0 transition-colors p-2 border-2 rounded-lg border-color-sena text-color-sena hover:text-white hover:bg-color-sena'
						>
							Volver al formulario
						</Link>
					</div>
				)}
			</div>
			<div className='text-center' style={{
				borderTop: '1px solid #ccc', width: '80%', marginLeft: '5%',
				height: '10px',
			}}>
			</div>
			<article className='flex flex-col items-center'>
				<header>
					<h1 className="flex flex-col items-center">ENCUESTAS RECIENTES</h1>
				</header>
				<section className='flex flex-wrap justify-center'>
					{recentlyForms.map(({ name, status }, index) => {
						return (
							<CardForm
								key={index}
								title={name}
								imageSrc={imgEncuesta}
								isActive={status}
							/>
						)
					})}
				</section>
			</article>
		</div>
	);
}

export default Quest
