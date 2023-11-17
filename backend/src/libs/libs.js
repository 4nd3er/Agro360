export { default as createToken } from './jwt.js'
export { sendEmailResetPassword, sendEmailFormCode } from './nodemailer.js'
export { default as errorResponse } from './ErrorResponse.js'
export { default as validObjectId } from './ValidObjectId.js'
export { default as compObjectId } from './compObjectId.js'
export { default as compDuplicate } from './compDuplicate.js'
export * as messages from './messages.js'

export function generateCode(digits) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    const code = Math.floor(min + Math.random() * (max - min + 1));
    return code.toString();
}