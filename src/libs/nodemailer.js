import nodemailer from 'nodemailer'
import { FRONTEND_URL } from '../config/config.js'

//* Funcion enviar correo para recuperacion de contraseña
export function sendEmailResetPassword(res, data) {

  const { userEmail, token } = data
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ladigiococ@gmail.com',
      pass: 'xurdifznneprfewg'
    }
  })

  const mailOptions = {
    from: 'ladigiococ@gmail.com',
    to: userEmail,
    subject: 'Agro360 - recuperacion de contraseña',
    text: `Para recuperar tu contraseña, haz click en el siguiente enlace: ${FRONTEND_URL}/reset-password/${token}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico: ' + error);
    }
    else {
      res.json({
        response: "Email sent successfully to " + userEmail,
        info: info.response
      });
    }
  });
}

//* Funcion enviar correo para obtener codigo
export function sendEmailFormCode(res, userEmail, code) {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ladigiococ@gmail.com',
      pass: 'xurdifznneprfewg'
    }
  })

  const mailOptions = {
    from: 'ladigiococ@gmail.com',
    to: userEmail,
    subject: 'Agro360 - Codigo',
    text: `<body style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
            <div
              style="font-family: sans-serif; border: 2px solid lightgray; border-radius: 1rem; padding: 1rem; display: flex; flex-direction: column;">
              <header
                style="width: 100%; background-color: #39A900; height: 80px; border-radius: .5rem; display: flex; justify-content: center; align-items: center;">
                <img src="./logo_blanco.png" alt="Sena Logo" style="height: 5rem;">
              </header>
              <h1 style="color: #39A900; text-align: center;">Hola (Insertar nombre y apellido de usuario)!</h1>
              <h2 style="font-weight: 400;">Has generado un codigo para responder la encuesta (insertar titulo de la encuesta)
              </h2>
              <h3 style="font-weight: 400;">Ingresa este codigo para acceder al formulario: <strong>${code}</strong></h3>
              <p>Recuerda que este codigo es de un solo uso y tendras un tiempo limitado para responder</p>
              <p>El equipo de Agro360 te desea <span style="color: #39A900;">Buena Suerte!</span> 🙌</p>
              <span style="font-size: 0.75rem;">Si no generaste ningun omite este correo electronico</span>
            </div>
          </body>`
}

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ message: [`Error al enviar el correo electrónico: ${error}`] });
  });
}

