import { LogoBlanco } from '../../assets/Assets';
import '../css/navbar.css';
import { useAuth } from '../../context/AuthContext';
import { Menu } from '@headlessui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isHovered, setIsHovered] = useState(false)
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<header className="header">
				<img className="logo" src={LogoBlanco} />
				<Menu as="div" className='z-10'>
					<Menu.Button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" className="perfil icon icon-tabler icon-tabler-user-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${isHovered ? '#c1ff95' : '#ffffff'}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							<path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
						</svg>
					</Menu.Button>

					<Menu.Items className="absolute right-4 top-16 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<Link to='/inicio'>
										<button className={`${active ? 'bg-color-sena text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all`}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="ionicon me-2 text-color-sena"
												viewBox="0 0 512 512"
												width="12%"
												fill="none"
												stroke={active ? '#ffffff' : '#39A900'}
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="32">
												<path
													d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
												/>
												<path
													d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
												/>
											</svg>
											Inicio
										</button>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link to='/crear-formulario'>
										<button className={`${active ? 'bg-[#00324D] text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all`}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="ionicon me-2 text-[#00324D]"
												viewBox="0 0 512 512"
												fill="none"
												width="12%"
												stroke={active ? '#ffffff' : '#00324D'}
												stroke-linejoin="round"
												stroke-width="32"
											>
												<path d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32" />
												<rect
													x="176"
													y="32"
													width="160"
													height="64"
													rx="26.13"
													ry="26.13"
												/>
											</svg>
											Crear Formulario
										</button>
									</Link>

								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link to='/resultados'>
										<button className={`${active ? 'bg-[#cb7766] text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all`}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="ionicon me-2 text-[#cb7766]"
												viewBox="0 0 512 512"
												fill="none"
												width="12%"
												stroke={active ? '#ffffff' : '#cb7766'}
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="32"
											>
												<rect
													x="64"
													y="320"
													width="48"
													height="160"
													rx="8"
													ry="8"
												/>
												<rect
													x="288"
													y="224"
													width="48"
													height="256"
													rx="8"
													ry="8"
												/>

												<rect
													x="400"
													y="112"
													width="48"
													height="368"
													rx="8"
													ry="8"
												/><rect
													x="176"
													y="32"
													width="48"
													height="448"
													rx="8"
													ry="8"
												/>
											</svg>
											Resultados
										</button>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button onClick={handleLogout} className={`${active ? 'bg-color-sena text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all`}>
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout me-2" width="12%" viewBox="0 0 24 24" strokeWidth="1.5" stroke={active ? '#ffffff' : '#39A900'} fill="none" strokeLinecap="round" strokeLinejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
											<path d="M9 12h12l-3 -3" />
											<path d="M18 15l3 -3" />
										</svg>
										Cerrar Sesión
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Menu >
			</header>
		</>
	)
}

export default Navbar