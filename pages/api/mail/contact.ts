import { render } from '@react-email/render';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailInfo } from '../../../helpers';
import { isContactForm } from '../../../lib/checks';
import transporter from '../../../lib/mail';
import { cors, runMiddleware } from '../../../lib/middleware';
import { EmailContact } from '../../../templates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'POST': {
      try {
        if (!isContactForm<true>(req.body)) {
          return res.status(400).json({
            message: 'Invalid Contact form',
          });
        }

        const emailHtml = render(EmailContact(req.body), { pretty: true });

        transporter.sendMail({
          from: mailInfo.from,
          to: mailInfo.to,
          subject: `${req.body.name} contacted you`,
          html: emailHtml,
        });

        return res.status(200).json('Mail sent successfully');
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    default: {
      return res.status(405).json({
        message: 'Method not allowed',
      });
    }
  }
}
