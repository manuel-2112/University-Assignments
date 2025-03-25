import nodemailer from 'nodemailer';
import config from '../../config/config';
import { MailCases } from './mail.enum';

/**
 * Generate the html for the mail
 * @param formInfo
 * @param useCase
 * @param companyName
 * @returns
 */
function generateHtml(
  formInfo: string,
  useCase: string,
  companyName: string,
): string {
  let html = '<a></a>';
  if (useCase === 'clientMail') {
    html +=
      '<a>Le informamos que uno de sus servicios ha sido solicitado. Por favor contactar al cliente en cuanto pueda.</a>';
    html += '<a> A continuación se lista la información de consulta: </a><ul>';
  } else if (useCase === 'adminMail') {
    html += `<a>Le informamos que se ha solicitado un servicio de la empresa ${companyName}.</a>`;
    html += '<a> A continuación se lista la información de consulta: </a><ul>';
  } else {
    html +=
      '<a>Su solicitud esta siendo procesada. La empresa pronto se pondrá en contacto con usted.</a>';
    html += '<a> A continuación se lista la información de consulta: </a><ul>';
  }

  const form: Record<string, string> = JSON.parse(formInfo);
  const translateKey = (key: string): string => {
    switch (key) {
      case 'service':
        return 'Servicio';
      case 'name':
        return 'Nombre';
      case 'email':
        return 'Email';
      case 'phone':
        return 'Teléfono';
      case 'text':
        return 'Mensaje';
      default:
        return key;
    }
  };

  Object.keys(form).forEach((key) => {
    if (!['companyId', '_id', '__v'].includes(key)) {
      // Exclude specific keys
      const keyTranslate = translateKey(key);
      /* eslint-disable security/detect-object-injection */
      html += `<li>${keyTranslate}: ${form[key]}</li>`;
      /* eslint-enable security/detect-object-injection */
    }
  });

  html += '</ul>';
  return html;
}

/**
 * Set the mail body
 * @param useCase
 * @param companyName
 * @param formInfo
 * @returns
 */

const setMailBody = (
  useCase: MailCases,
  companyName: string,
  formInfo: string,
) => {
  let subject: string;
  let text: string;
  let html: string;
  switch (useCase) {
    case MailCases.VERIFIED_COMPANY:
      subject = 'Startup aprobada';
      text = `Su startup ${companyName} ha sido aprobada para ser parte de Agtech. 
      Ahora puede comenzar a utilizarla.`;
      html = `<a>Su startup </a>${companyName}<a> ha sido aprobada para ser parte de Agtech.
       Ahora puede comenzar a utilizarla.</a>`;
      break;
    case MailCases.REJECTED_COMPANY:
      subject = 'Startup rechazada';
      text = `Su startup ${companyName} ha sido rechazada para ser parte de Agtech.`;
      html = `<a>Su startup </a>${companyName}<a> ha sido rechazada para ser parte de Agtech.</a>`;
      break;
    case MailCases.WAITING_COMPANY:
      subject = 'Startup esperando aprobacion';
      text = `Su startup ${companyName} está en espera de aprobación por Agtech, se le no
      tificará cuando su cuenta esté verificada.`;
      html = `<a>Su startup </a>${companyName}<a> está en espera de aprobación por Agtech, se le
       notificará cuando su cuenta esté verificada.</a>`;
      break;
    case MailCases.REQUESTED_SERVICE:
      subject = 'Servicio solicitado';
      text = formInfo;
      html = generateHtml(formInfo, 'clientMail', companyName);
      break;
    default:
      break;
  }
  return { subject, text, html };
};

/**
 * Send mail
 * @param companyEmail
 * @param subject
 * @param text
 * @param html
 * @returns
 */
const sendMail = async (
  companyEmail: string,
  subject: string,
  text: string,
  html: string,
): Promise<boolean> => {
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
      to: companyEmail,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Mail company
 * @param useCase
 * @param companyName
 * @param companyEmail
 * @param formInfo
 */
const mailCompany = async (
  useCase: MailCases,
  companyName: string,
  companyEmail: string,
  formInfo: string,
) => {
  const { subject, text, html } = setMailBody(useCase, companyName, formInfo);
  if (useCase === MailCases.REQUESTED_SERVICE) {
    await sendMail(
      JSON.parse(formInfo).email,
      subject,
      text,
      generateHtml(formInfo, 'companyMail', companyName),
    );
    await sendMail(
      'agtech.superuser@gmail.com',
      subject,
      text,
      generateHtml(formInfo, 'adminMail', companyName),
    );
  }
  try {
    await sendMail(companyEmail, subject, text, html);
  } catch (error) {
    throw new Error('Error al enviar el mail');
  }
};

export default mailCompany;
