import React, { useState } from 'react';
import Logo from '../img/logoAgro360.png';
import Perfil from '../img/perfil.png';
import '../layouts/css/navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	const { logout, user } = useAuth();

	const handleLogOut = () => {
		logout();
	};
	return (
		<>
			<header className="navbar">
				<img className="logo" src={Logo} />
				<button onClick={toggleDropdown}>
					<img className="perfil" src={Perfil} />
				</button>
			</header>
			{isDropdownOpen && (
				<div className="z-10 absolute right-14 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-auto">
					<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
						<div>{user.names}</div>
						<div className="font-medium truncate">{user.email}</div>
					</div>
					<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
						<li>
							<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Configuración</a>
						</li>
					</ul>
					<div className="py-2">
						<button
							onClick={handleLogOut}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Cerrar sesión
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default Navbar