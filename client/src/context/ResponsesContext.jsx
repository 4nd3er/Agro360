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
    const checkUser = () => {
        const cookies = Cookies.get();
        if (!cookies.user) return false
        const user = JSON.parse(cookies.user.substring(2));
        if (!user.userCode) return false
        return user
    }

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
        return res.data
    }

    // Get Form to Response
    const getFormtoResponse = async (id) => {
        try {
            const res = await getFormtoResponseRequest(id)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
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
                errors,
                success,
                existsForm,
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