import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <Menu />
            <Outlet />
        </>
    )
}

export default AuthLayout