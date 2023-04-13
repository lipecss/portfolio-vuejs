import { Post } from '../../models/Post'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default defineEventHandler(async (event) => {
  const { name, from, subject, message } = await readBody(event)
  try {
    sendToMe(name, from, subject, message)

    sendToUser(name, from)

    return { message: 'Email enviado' }
  } catch (error) {
    return { message: 'Falha ao enviar o email. Tente novamente' }
  }
})

function sendToMe(name, from, subject, message) {
  const msg = {
    to: 'felipecss@vemlavaralouca.com.br',
    from: 'lipegame360@live.com',
    dynamic_template_data: {
      email: from,
      name,
      subject: `Nova mensagem de ${name} | ${subject}`,
      title: subject,
      message
    },
    template_id: 'd-7712437d773245d2800f5192b672b110'
  }

  sgMail
    .send(msg)
    .then(() => {
      return 200
    }).catch(() => {
      return 400
    })
}

function sendToUser(name, from) {
  const msg = {
    to: from,
    from: 'felipecss@vemlavaralouca.com.br',
    dynamic_template_data: {
      name,
      subject: `Obrigado pelo contato ${name} | Felipecss`,
    },
    template_id: 'd-420d094fea5b44b2b8238aedb4de3dee'
  }

  sgMail
    .send(msg)
    .then(() => {
      return 200
    }).catch(() => {
      return 400
    })
}
