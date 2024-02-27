import { format } from 'date-fns'
import { es } from 'date-fns/locale';

export const formatDate = (date, type) => {
    const newDate = new Date(date)
    let options = {};
    switch (type) {
        case 'date':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            return newDate.toLocaleDateString('es-Es', options)

        case 'date-time':
            const converted = format(newDate, "dd 'de' MMMM 'de' yyyy, h:mm a", { locale: es })            
            return converted
    }
}