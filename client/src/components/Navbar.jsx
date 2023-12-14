import { LogoBlanco } from '../assets/Assets';
import '../layouts/css/navbar.css';
import { useAuth } from '../context/AuthContext';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

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
				<Menu as="div" className="user">
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
									<button onClick={handleLogout} className={`${active ? 'bg-color-sena text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout me-2" width="12%" viewBox="0 0 24 24" strokeWidth="1.5" stroke={active ? '#ffffff' : '#39a900'} fill="none" strokeLinecap="round" strokeLinejoin="round">
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