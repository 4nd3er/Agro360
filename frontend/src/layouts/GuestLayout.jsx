import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/navbar.css';
import GuestHeader from '../components/GuestHeader';

const GuestLayout = () => {
    return (
        <>
            <GuestHeader />
            <Outlet />
        </>
    )
}

export default GuestLayout;