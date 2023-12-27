import { createContext, useState, useContext, useEffect } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth.js'
import { ContextErrors } from './Alerts.jsx';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("debe usarse dentro de un AuthoProvider")
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 200) {
                setUser(res.data.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            ContextErrors(errors, setErrors)
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            const data = res.data.data
            localStorage.setItem('session', JSON.stringify(data))
            setUser(data)
            setIsAuthenticated(true)
        } catch (error) {
            ContextErrors(errors, setErrors)
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('session')
            setUser(null)
            setIsAuthenticated(false)
            window.location.href = '/';
        } catch (error) {
            ContextErrors(errors, setErrors)
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            const session = JSON.parse(localStorage.getItem('session'))
            if (!session) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(session.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data.data)
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                isAuthenticated,
                errors,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;