import { createContext, useState, useContext, useEffect } from 'react'
import { forgetPasswordRequest, loginRequest, registerRequest, resetPasswordRequest, verifyTokenRequest } from '../api/auth.js'
import { ContextErrors, ContextSuccess } from './Alerts.jsx';

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
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            ContextSuccess(res, setSuccess, setErrors)
            return res
        } catch (error) {
            ContextErrors(error, setErrors)
            return false
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
            ContextErrors(error, setErrors)
        }
    }

    const forgetPassword = async email => {
        try {
            const res = await forgetPasswordRequest(email)
            ContextSuccess(res, setSuccess, setErrors)
            return res
        } catch (error) {
            ContextErrors(error, setErrors)
            return false
        }
    }

    const resetPassword = async (password, token) => {
        try {
            const res = await resetPasswordRequest(password, token)
            ContextSuccess(res, setSuccess, setErrors)
            return res
        } catch (error) {
            ContextErrors(error, setErrors)
            return false
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('session')
            setUser(null)
            setIsAuthenticated(false)
            window.location.href = '/';
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

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


    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                forgetPassword,
                resetPassword,
                checkLogin,
                logout,
                isAuthenticated,
                errors,
                setErrors,
                success,
                setSuccess,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;