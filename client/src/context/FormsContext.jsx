import { useContext, createContext, useEffect, useState } from "react";
import { FormsRequest, QuestionTypesRequest, createFormRequest, createQuestionTypeRequest, deleteFormRequest, deleteQuestionTypeRequest, getFormInstructorsResultsRequest, getFormReportRequest, getFormRequest, getFormsResponsesRequest, getQuestionTypeRequest, updateFormRequest, updateQuestionTypeRequest } from "../api/forms";
import { ContextErrors } from "./Alerts";
import { saveAs } from 'file-saver';

export const FormsContext = createContext();

export const useForms = () => {
    const context = useContext(FormsContext);
    if (!context) throw new Error("debe usarse dentro de un FormsProvider");
    return context;
}

export const FormsProvider = ({ children }) => {
    const [errors, setErrors] = useState([])

    //* FORMS

    // Forms
    const getForms = async () => {
        try {
            const res = await FormsRequest();
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

    // Get Form
    const getForm = async (id) => {
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

    // Get Form Instructors Results
    const FormInstructorsResults = async (id) => {
        try {
            const res = await getFormInstructorsResultsRequest(id);
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

    const getFormReport = async id => {
        try {
            const res = await getFormReportRequest(id);
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, `Reporte de Encuesta ${id}.xlsx`)
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }


    //* Question Types

    // Question Types
    const getQuestionsType = async () => {
        try {
            const res = await QuestionTypesRequest();
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors)
        }
    }

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
                getQuestionsType,
                getForms,
                FormsResponses,
                getForm,
                FormInstructorsResults,
                createForm,
                updateForm,
                deleteForm,
                getFormReport,
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