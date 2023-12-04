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
    const [responses, setResponses] = useState([]);
    const [existsForm, setExistsForm] = useState(false);
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    //* Responses
    // Responses
    const getResponses = async () => {
        try {
            const res = await ResponsesRequest();
            setResponses(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    // Get Response
    const getReponse = async (id) => {
        try {
            const res = await getResponseRequest(id);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }

    // Get Responses Form
    const getResponsesForm = async (id) => {
        try {
            const res = await getResponsesFormRequest(id);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }

    //* Create Response

    //ValidateCookie
    useEffect(() => {
        const checkUser = async () => {
            const cookies = Cookies.get();
            if (!cookies.user) {
                setUser(false)
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
                return;
            }
            const userObject = JSON.parse(cookies.user.substring(2));
            setUser(userObject)
            setLoading(false)
        }
        checkUser();
    }, [])


    //CompForm
    const compFormResponse = async (id) => {
        try {
            const res = await getFormRequest(id)
            if (res.status == 200) setExistsForm(true)
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }
    // Get Code Response
    const getCodeResponse = async (id, email) => {
        const res = await getCodeResponseRequest(id, email);
        return res;
    }

    // Verificate Code Response
    const verificateCodeResponse = async (id, code) => {
        const res = await verificateCodeResponseRequest(id, code)
        if (res.status == 200) setUser(true)
        return res
    }

    // Get Form to Response
    const getFormtoResponse = async (id) => {
        try {
            const res = await getFormtoResponseRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    //Create Response
    const createResponse = async (id, data) => {
        const res = await createResponseRequest(id, data)
        return res
    }

    return (
        <ResponsesContext.Provider
            value={{
                responses,
                errors,
                success,
                existsForm,
                user,
                loading,
                getResponses,
                getReponse,
                getResponsesForm,
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