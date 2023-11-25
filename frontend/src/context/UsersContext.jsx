import { createContext, useContext, useEffect, useState } from "react";
import { CleanErrors, ContextErrors } from "./Error";
import { UsersRequest, getUserRequest } from "../api/users";

export const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("Users debe usarse en un UsersProvider");
    return context;
}

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([])

    CleanErrors(errors, setErrors)

    //* Users

    // Get Users
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await UsersRequest();;
                setUsers(res.data);
                setLoading(false)
            } catch (error) {
                ContextErrors(error,)
            }
        }
        getUsers();
    }, [])

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error,)
        }
    }

    return (
        <UsersContext.Provider value={{
            users,
            loading,
            errors,
            getUser
        }}>
            {children}
        </UsersContext.Provider>
    )
}