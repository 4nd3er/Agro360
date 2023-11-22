//* Codigo aleatorio de 6 digitos
export function generateCode(digits) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    const code = Math.floor(min + Math.random() * (max - min + 1));
    return code.toString();
}

//* Comprobar lista duplicada
export function compDuplicate(list) {
    return new Set(list).size < list.lenght
}

//*Funcion para capitalizar una cadena
export function capitalizeString(string) {
    const transformed = []
    for (const word of string.toString().split(" ")) {
        const capWord = word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
        transformed.push(capWord)
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