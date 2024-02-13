import React from 'react'
import Survey from '../../components/Survey';
import Create from '../../components/Create';
import { Link } from 'react-router-dom';
import { imgEncuesta } from '../../assets/Assets';

const Quest = () => {
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
			<div>
				<h1>ENCUESTAS RECIENTES</h1>
				<div onClick={() => location.reload()}>
					<Survey
						title="Encuesta pedagógica"
						imageSrc={imgEncuesta}
						isActive={true}
					/>
				</div>
			</div>
		</div>
	);
}


export default Quest