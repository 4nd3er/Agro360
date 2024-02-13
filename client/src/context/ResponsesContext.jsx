import { createContext, useContext, useEffect, useState } from "react";
import { ResponsesRequest, createResponseRequest, getCodeResponseRequest, getFormtoResponseRequest, getResponseRequest, getResponsesFormRequest, verificateCodeResponseRequest } from "../api/responses";
import { ContextErrors, ContextSuccess } from "./Alerts";
import { getFormRequest } from "../api/forms";
import Cookies from 'js-cookie'

export const ResponsesContext = createContext();

export const useResponses = () => {
    const context = useContext(ResponsesContext);
    if (!context) throw new Error("useReponses debe estar dentro del proveedor ResponseContext");
    return context;
}

export const ResponsesProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');
    const [existsForm, setExistsForm] = useState(false);
    const [enabledForm, setEnabledForm] = useState(false);
    const [user, setUser] = useState(null)

    //* Responses
    // Responses
    const getResponses = async () => {
        try {
            const res = await ResponsesRequest();
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Get Response
    const getReponse = async (id) => {
        try {
            const res = await getResponseRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Get Responses Form
    const getResponsesForm = async (id) => {
        try {
            const res = await getResponsesFormRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    //* Create Response

    //ValidateCookie
    const checkUser = async (form) => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user || !user.userCode) return false
        try {
            const res = await verificateCodeResponseRequest(form, { user: user })
            if (res.status == 200) setUser(res.data.data)
            return res.data.data
        } catch (error) {
            setUser(null)
            return false
        }
    }

    //CompForm
    const compFormResponse = async (id) => {
        try {
            const res = await getFormRequest(id)
            return res
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Get Code Response
    const getCodeResponse = async (id, email) => {
        const res = await getCodeResponseRequest(id, email);
        localStorage.setItem("user", JSON.stringify(res.data.data))
        return res;
    }

    // Verificate Code Response
    const verificateCodeResponse = async (id, user) => {
        const res = await verificateCodeResponseRequest(id, user)
        return res.data
    }

    // Get Form to Response
    const getFormtoResponse = async (id) => {
        try {
            const user = localStorage.getItem('user')
            const res = await getFormtoResponseRequest(id, user)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    //Create Response
    const createResponse = async (id, data) => {
        const user = localStorage.getItem('user')
        const res = await createResponseRequest(id, data, user)
        return res
    }

    return (
        <ResponsesContext.Provider
            value={{
                errors,
                success,
                user,
                existsForm,
                enabledForm,
                getResponses,
                getReponse,
                getResponsesForm,
                checkUser,
                compFormResponse,
                getCodeResponse,
                verificateCodeResponse,
                getFormtoResponse,
                createResponse
            }}>
            {children}
        </ResponsesContext.Provider>
    );
}

export default ResponsesContext;