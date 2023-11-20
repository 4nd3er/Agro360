import { useAuth} from "./context/AuthContex"
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
    const {user, isAuthenticated} = useAuth()

    if(!isAuthenticated) return <Navigate to='/' replace />


  return  <Outlet/>;
}

export default ProtectedRoute
