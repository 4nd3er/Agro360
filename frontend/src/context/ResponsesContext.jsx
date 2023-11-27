import { createContext, useContext, useEffect, useState } from "react";
import { ResponsesRequest, getCodeResponseRequest, getResponseRequest, getResponsesFormRequest, verificateCodeResponseRequest } from "../api/responses";
import { CleanErrors, ContextErrors } from "./Error";

export const ResponsesContext = createContext();

export const useResponses = () => {
    const context = useContext(ResponsesContext);
    if (!context) throw new Error("useReponses debe estar dentro del proveedor ResponseContext");
    return context;
}

export const ResponsesProvider = ({ children }) => {
    const [responses, setResponses] = useState([]);
    const [errors, setErrors] = useState([]);

    CleanErrors(errors, setErrors);

    //* Responses

    // Responses
    useEffect(() => {
        const getResponses = async () => {
            try {
                const res = await ResponsesRequest();
                setResponses(res.data);
            } catch (error) {
                ContextErrors(error, setErrors);
            }
        }
        getResponses();
    }, [])

    // Get Response
    const getReponse = async (id) => {
        try {
            const res = await getResponseRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors);
        }
    }

    // Get Responses Form
    const getResponsesForm = async (id) => {
        try {
            const res = await getResponsesFormRequest(id);
            return res.data;
        } catch (error) {
            ContextErrors(error, setErrors);
        }
    }

    //* Create Response

    const getCodeResponse = async (id, email) => {
        const res = await getCodeResponseRequest(id, email);
        return res.data;
    }

    const verificateCodeResponse = async (id, code) => {
        const res = await verificateCodeResponseRequest(id, code)
        return res.data
    }

    return (
        <ResponsesContext.Provider
            value={{
                responses,
                errors,
                getReponse,
                getResponsesForm,
                getCodeResponse,
                verificateCodeResponse
            }}>
            {children}
        </ResponsesContext.Provider>
    );
}

export default ResponsesContext;