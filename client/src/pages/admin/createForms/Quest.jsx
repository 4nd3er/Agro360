import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForms } from '../../../context/Context';
import { Spinner } from '../../../components/Components';
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
		<div className="flex flex-col justify-center mt-10 md:mt-20 lg:mt-28 xl:mt-28">
      <section
        className="flex justify-between align-center"
      >
        
          <button
            className="block pl-10 sm:pl-0 lg:p-0 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setOpenModal(true)}
          >
            CREAR ENCUESTA
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-plus mx-auto"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              strokeWidth="1.1"
              stroke="#39a900"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
              <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
            </svg>
          </button>
        
        <CreateQuestModal modalState={{ openModal, setOpenModal }} />
        {localStorage.getItem("title") &&
          localStorage.getItem("descrip") &&
          localStorage.getItem("topic") &&
          localStorage.getItem("date") && (
            <div className="my-auto me-10">
              <Link
                to="crear"
                className="transition-colors p-2 border-2 rounded-lg border-color-sena text-color-sena hover:text-white hover:bg-color-sena"
              >
                Volver al formulario
              </Link>
            </div>
          )}
      </section>

	  
      <p
        className="text-center"
        style={{
          borderTop: "1px solid #ccc",
          width: "80%",
          marginLeft: "5%",
          height: "10px",
        }}
      ></p>
			<article className='flex flex-col items-center'>
				<header>
					<h1 className="flex flex-col items-center">ENCUESTAS RECIENTES</h1>
				</header>
				<section className='flex flex-wrap justify-center'>
					{recentlyForms.map((form) => {
						return (
							<CardForm
								key={form._id}
								form={form}
								imageSrc={imgEncuesta}
							/>
						)
					})}
				</section>
			</article>
		</div>
	);
}

export default Quest
