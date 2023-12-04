import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/Context.js";
import { Spinner } from './components/Components'

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
    return <Outlet />;
}

export default ProtectedRoute;
