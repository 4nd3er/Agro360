import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth, useResponses } from "./context/Context.js";
import { Spinner } from './components/Components'
import { useEffect } from 'react';

export function ProtectedRoute() {
    const { isAuthenticated, loading, checkLogin } = useAuth();

    useEffect(() => {
        checkLogin();
    }, [])
    
    if (loading) return <Spinner />;
    if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
    return <Outlet />;
}

export function ProtectedForm() {
    const { checkUser } = useResponses();
    const { idform } = useParams();

    useEffect(() => {
        const compUser = async () => {
            const res = await checkUser(idform);
            if (!res) window.history.back();
        }
        compUser();
    }, [])

    return <Outlet />;
}
