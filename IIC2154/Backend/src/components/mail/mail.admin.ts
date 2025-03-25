import nodemailer from 'nodemailer';
import config from '../../config/config';

const mailAdmin = async (companyName: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.mailUser,
      pass: config.mailToken,
    },
  });

  try {
    await transporter.sendMail({
      from: '"AgTech" <proyectoespecialidadgrupo2@gmail.com>',
      to: 'agtech.superuser@gmail.com',
      subject: 'Startup esperando aprobación',
      text: `La startup '${companyName}' está esperando aprobación para ser parte de Agtech
       por favor ingresar a la plataforma y aprobarla.`,
      html: `<a>La startup '</a>${companyName}'<a> está esperando aprobación para ser parte de Agtech, 
      por favor ingresar a la plataforma y aprobarla.</a>`,
    });
  } catch (error) {
    throw new Error('Error sending mail');
  }
};

export default mailAdmin;
