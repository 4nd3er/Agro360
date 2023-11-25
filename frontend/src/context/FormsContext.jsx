import { useContext, createContext, useEffect, useState } from "react";
import { FormsRequest, QuestionTypesRequest, createFormRequest, createQuestionTypeRequest, deleteFormRequest, deleteQuestionTypeRequest, getFormRequest, getFormsResponsesRequest, getQuestionTypeRequest, updateFormRequest, updateQuestionTypeRequest } from "../api/forms";
import { ContextErrors, CleanErrors } from "./Error";

export const FormsContext = createContext();

export const useForms = () => {
    const context = useContext(FormsContext);
    if (!context) throw new Error("debe usarse dentro de un FormsProvider");
    return context;
}

export const FormsProvider = ({ children }) => {
    const [forms, setForms] = useState([]) // Forms
    const [questionsType, setQuestionsType] = useState([]); //Question Types
    const [errors, setErrors] = useState([])

    CleanErrors(errors, setErrors)

    //* FORMS

    // Forms
    useEffect(() => {
        const getForms = async () => {
            try {
                const res = await FormsRequest();
                setForms(res.data)
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getForms();
    }, [])

    // Get Form
    const getForm = async id => {
        try {
            const res = await getFormRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Get Forms Responses
    const FormsResponses = async () => {
        try {
            const res = await getFormsResponsesRequest();
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Create Form
    const createForm = async form => {
        try {
            const res = await createFormRequest(form);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Update Form
    const updateForm = async (id, form) => {
        try {
            const res = await updateFormRequest(id, form);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Delete Form
    const deleteForm = async id => {
        try {
            const res = await deleteFormRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };


    //* Question Types

    // Question Types
    useEffect(() => {
        const getQuestionsType = async () => {
            try {
                const res = await QuestionTypesRequest();
                setQuestionsType(res.data)
            } catch (error) {
                ContextErrors(error, setErrors)
            }
        }
        getQuestionsType();
    }, [])

    // Get Question Type
    const getQuestionType = async id => {
        try {
            const res = await getQuestionTypeRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Create Question Type
    const createQuestionType = async questionType => {
        try {
            const res = await createQuestionTypeRequest(questionType);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Update Question Type
    const updateQuestionType = async (id, questionType) => {
        try {
            const res = await updateQuestionTypeRequest(id, questionType);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    // Delete Question Type
    const deleteQuestionType = async id => {
        try {
            const res = await deleteQuestionTypeRequest(id);
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    };

    return (
        <FormsContext.Provider
            value={{
                forms,
                questionsType,
                FormsResponses,
                getForm,
                createForm,
                updateForm,
                deleteForm,
                getQuestionType,
                createQuestionType,
                updateQuestionType,
                deleteQuestionType,
                errors
            }}>
            {children}
        </FormsContext.Provider>
    )
}

export default FormsContext;