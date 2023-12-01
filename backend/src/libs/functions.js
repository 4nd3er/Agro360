import xlsx from 'xlsx'

//* Codigo aleatorio de 6 digitos
export function generateCode(digits) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    const code = Math.floor(min + Math.random() * (max - min + 1));
    return code.toString();
}

//* Comprobar lista duplicada
export function compDuplicate(list) {
    return new Set(list).size < list.length
}

//*Funcion para capitalizar una cadena
export function capitalizeString(string) {
    const transformed = []
    for (const word of string.toString().split(" ")) {
        const capWord = word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
        if (capWord !== "") transformed.push(capWord)
    }
    return transformed.join(" ")
}

//*Funcion para capitalizar la primera letra
export function capitalizeWord(word) {
    const string = word.split(" ")[0]
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}

//*Funcion para devolver un nombre en minuscula y capitalizado
export function nameMayusName(name) {
    const lowerName = name.toLowerCase()
    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)

    return [lowerName, mayusName]
}

//*Funcion para capitalizar un objeto dependiendo del parametro
export function capitalizeObject(data, find, capitalize) {
    if (capitalize == "capitalize") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "name") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }
    else if (capitalize == "capitalize 2") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "lastnames") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }
}

//* Funcion para eliminar tildes
export function deleteAccents(string) {
    const accentsMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ü': 'u',
        'à': 'a',
        'è': 'e',
        'ì': 'i',
        'ò': 'o',
        'ù': 'u',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U',
        'Ü': 'U',
    };

    return string.replace(/[áéíóúàèìòùüÁÉÍÓÚÜ]/g, (match) => accentsMap[match] || match);
}

//* Funcion para convertir el codigo de fecha a fecha de un xlsx
export function parseDate(date) {
    const convertDate = xlsx.SSF.parse_date_code(date)
    return new Date(`${convertDate.y}-${convertDate.m}-${convertDate.d}`);
}