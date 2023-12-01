import { createContext, useContext, useState } from 'react'
import { ContextErrors, ContextSuccess } from './Alerts'
import { createCoursesRequest, createCronogramsRequest, createInstructorsRequest } from '../api/chargeData'

export const ChargeDataContext = createContext()

export const useChargeData = () => {
    const context = useContext(ChargeDataContext)
    if (!context) throw new Error('Debe usarse dentro del proveedor ChargeDataProvider')
    return context
}

export const ChargeDataProvider = ({ children }) => {
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('');

    const createCourses = async (data) => {
        try {
            const res = await createCoursesRequest(data) 
            ContextSuccess(res, setSuccess, setErrors)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess)
        }
    }

    const createCronograms = async (data) => {
        try {
            const res = await createCronogramsRequest(data)
            ContextSuccess(res, setSuccess, setErrors)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess)
        }
    }

    const createInstructors = async (data) => {
        try {
            const res = await createInstructorsRequest(data)
            ContextSuccess(res, setSuccess, setErrors)
            return res.data
        } catch (error) {
        }
    }

    return (
        <ChargeDataContext.Provider
            value={{
                errors,
                success,
                setErrors,
                createCourses,
                createCronograms,
                createInstructors
            }}>
            {children}
        </ChargeDataContext.Provider>
    )
}

export default ChargeDataContext