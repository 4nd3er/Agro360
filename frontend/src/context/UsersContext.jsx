import { createContext, useContext, useEffect, useState } from "react";
import { ContextErrors, ContextSuccess } from "./Alerts";
import { CoursesRequest, UsersRequest, createUserRequest, getCourseNameRequest, getCourseRequest, getUserRequest } from "../api/users";

export const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("Users debe usarse en un UsersProvider");
    return context;
}

export const UsersProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('')


    //* Users

    // Get Users
    const getUsers = async () => {
        try {
            const res = await UsersRequest();;
            setLoading(false)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

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
            ContextSuccess(res, setSuccess, setErrors)
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess)
        }
    }

    //* Courses

    const getCourses = async () => {
        try {
            const res = await CoursesRequest();
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

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
            loading,
            errors,
            success,
            getUsers,
            getCourses,
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