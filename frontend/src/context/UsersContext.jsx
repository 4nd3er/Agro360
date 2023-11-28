import { createContext, useContext, useEffect, useState } from "react";
import { CleanErrors, ContextErrors } from "./Error";
import { CoursesRequest, UsersRequest, createUserRequest, getCourseNameRequest, getCourseRequest, getUserRequest } from "../api/users";

export const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("Users debe usarse en un UsersProvider");
    return context;
}

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([])
    

    //* Users

    // Get Users
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await UsersRequest();;
                setUsers(res.data);
                setLoading(false)
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getUsers();
    }, [])

    //Get User
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    //Create User
    const createUser = async (data) => {
        try {
            const res = await createUserRequest(data);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    //* Courses

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await CoursesRequest();
                setCourses(res.data);
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getCourses();
    }, [])

    const getCourse = async (id) => {
        try {
            const res = await getCourseRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    //* Courses Names
    const getCourseName = async (id) => {
        try {
            const res = await getCourseNameRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    return (
        <UsersContext.Provider value={{
            users,
            courses,
            loading,
            errors,
            getUser,
            createUser,
            getCourse,
            getCourseName,
            setErrors
        }}>
            {children}
        </UsersContext.Provider>
    )
}