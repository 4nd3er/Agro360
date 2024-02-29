export function validateSenaEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  const email1Regex = /^[a-zA-Z0-9._%+-]+@soy\.sena\.edu\.co$/;
  const email2Regex = /^[a-zA-Z0-9._%+-]+@misena\.edu\.co$/
  return email1Regex.test(email) || email2Regex.test(email)
}