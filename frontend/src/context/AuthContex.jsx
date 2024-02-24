import {createContext, useState, useContext, useEffect} from 'react'
import {loginRequest, registerRequest, verifyTokenRequest} from '../config/agro360Axios'
import Cookies from 'js-cookie'

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
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data);
        }

    };

    const signin = async (user) => {
       try {
        const res = await loginRequest(user)
        console.log(res)
        setIsAuthenticated(true)
        setUser(res.data)
       } catch (error) {
        if(Array.isArray(error.response.data)){
          return  setErrors(error.response.data)
        }
        setErrors([error.response.data.msg])
       }

    }

    useEffect (()=>{
        if (errors.length > 0){
          const timer =  setTimeout(()=>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    useEffect(()=>{
        function chekLogin  ()  {
            const cookies = Cookies.get();

        console.log(cookies)
        if(cookies.token){
         try {
            const res =   verifyTokenRequest(cookies.token)
            console.log(res)
            if (!res.data) setIsAuthenticated(false)
            
            isAuthenticated(true)
            setUser(res.data)
         } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
         }
        }
        }
        chekLogin()
    },[])

    return(
        <AuthContext.Provider 
        value={{ 
            signup,
            signin,
            user,
            isAuthenticated,
            errors
        }}
        > 
        {children} 
        </AuthContext.Provider>
    )
}