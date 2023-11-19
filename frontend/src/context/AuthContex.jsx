import {createContext, useState, useContext} from 'react'
import agro360Axios from '../config/agro360Axios'

export const AuthContext = createContext()

export const useAuth = () => {
   const context =  useContext(AuthContext);
   if (!context) {
    throw new Error("debe usarse dentro de un AuthoProvider")
   }
   return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    

    const signup = async (user) => {
        try {
            const res = await agro360Axios(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data);
        }

    };

    const signin = async (user) => {
       try {
        const res = await agro360Axios(user)
        console.log(res)
       } catch (error) {
        console.error(error)
       }

    }

    return(
        <AuthContext.Provider 
        value={{ 
            user,
            signup,
            signin,
            isAuthenticated,
            errors
        }}
        > 
        {children} </AuthContext.Provider>
    )
}