import React, { useEffect, useState } from 'react'
import Survey from '../../components/Survey';
import Create from '../../components/Create';
import { Link } from 'react-router-dom';
import { imgEncuesta } from '../../assets/Assets';
import { useForms } from '../../context/Context.js'
import { Spinner } from '../../components/Components.jsx'

const Quest = () => {
	const { getRecentlyForms } = useForms()
	const [recentlyForms, setRecentlyForms] = useState([])
	const [loading, setLoading] = useState(true)

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
				<Create />
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
					<h1>ENCUESTAS RECIENTES</h1>
				</header>
				<section className='flex'>
					{recentlyForms.map(({ name, status }) => {
						return (
							<Survey
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