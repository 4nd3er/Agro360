import { createContext, useContext, useState } from 'react'
import { ContextErrors, ContextSuccess } from './Alerts'
import { createCoursesRequest, createCronogramsRequest, createInstructorsRequest, createUsersRequest } from '../api/chargeData'

export const ChargeDataContext = createContext()

export const useChargeData = () => {
    const context = useContext(ChargeDataContext)
    if (!context) throw new Error('Debe usarse dentro del proveedor ChargeDataProvider')
    return context
}

export const ChargeDataProvider = ({ children }) => {
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false)

    const createCourses = async (data) => {
        try {
            setLoading(true)
            const res = await createCoursesRequest(data)
            ContextSuccess(res, setSuccess, setErrors, setLoading)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess, setLoading)
        }
    }

    const createCronograms = async (data) => {
        try {
            setLoading(true)
            const res = await createCronogramsRequest(data)
            ContextSuccess(res, setSuccess, setErrors, setLoading)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess, setLoading)
        }
    }

    const createInstructors = async (data) => {
        try {
            setLoading(true)
            const res = await createInstructorsRequest(data)
            ContextSuccess(res, setSuccess, setErrors, setLoading)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess, setLoading)
        }
    }

    const createUsers = async (data) => {
        try {
            setLoading(true)
            const res = await createUsersRequest(data)
            ContextSuccess(res, setSuccess, setErrors, setLoading)
            return res.data
        } catch (error) {
            ContextErrors(error, setErrors, setSuccess, setLoading)
        }
    }

    return (
        <ChargeDataContext.Provider
            value={{
                errors,
                success,
                loading,
                setErrors,
                createCourses,
                createCronograms,
                createInstructors,
                createUsers
            }}>
            {children}
        </ChargeDataContext.Provider>
    )
}

export default ChargeDataContext