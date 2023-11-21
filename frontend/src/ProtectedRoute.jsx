import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/AuthContex";

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <h1>Cargando..</h1>;
    if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
    return <Outlet />;
}

export default ProtectedRoute;
