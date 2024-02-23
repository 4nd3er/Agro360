import { useEffect } from "react";

export function ContextErrors(error, setErrors) {
    console.log(error.response.data)
    setErrors(error.response.data.message);
}

export function CleanErrors(errors, setErrors) {
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])
}