export const formatDate = (date, type) => {
    const newDate = new Date(date.split('T')[0].split('-'))
    let options = {};
    switch (type) {
        case 'date':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        case 'date-time':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }
    }
    return newDate.toLocaleDateString('es-Es', options)
}