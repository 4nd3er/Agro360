export function validateSenaEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@soy\.sena\.edu\.co$/;
    return emailRegex.test(email);
  }