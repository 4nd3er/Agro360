import nodemailer from 'nodemailer'

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
    text: `Para recuperar tu contraseña, haz click en el siguiente enlace: http://localhost:4000/reset-password/${token}`
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
    text: `Ingresa este codigo para acceder al formulario: ${code}`
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

