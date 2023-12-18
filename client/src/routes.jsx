import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useResponses } from "./context/Context.js";
import { Spinner } from './components/Components'

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
    return <Outlet />;
}

export function ProtectedForm() {
    const  { checkUser } = useResponses();

    if (!checkUser()) return window.history.back();
    return <Outlet />;
}
