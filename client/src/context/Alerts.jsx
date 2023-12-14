import { useEffect } from "react";
import Swal from "sweetalert2";

//* Alerts

//Error de servidor
const error500 = () => {
    Swal.fire({
        icon: "error",
        title: "Error 500",
        text: "Ha ocurrido un error en el servidor",
        showConfirmButton: false
    });
};

//Error de no autorizado
const error401 = () => {
    Swal.fire({
        icon: "warning",
        title: "No Autorizado",
        text: "No estas autorizado para ingresar a esta pagina, seras redirigido...",
        showConfirmButton: false
    });
}

//* Functions
export function ContextErrors(error, setErrors, setSuccess, setLoading) {
    if (error.response) {
        switch (error.response.status) {
            case 400 || 401 || 403 :
                setErrors(error.response.data.message)
                break;
            case 404:
                setErrors(error.response.data.message)
                break;
            case 500:
                error500()
                break;
        }
        if (setSuccess) setSuccess('')
        if (setLoading) setLoading(false)
    }
}

export function ContextSuccess(res, setSuccess, setErrors, setLoading) {
    setSuccess(res.data)
    setErrors([])
    if (setLoading) setLoading(false)
}
