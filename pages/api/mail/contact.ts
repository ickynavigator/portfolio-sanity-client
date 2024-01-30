import { render } from '@react-email/render';
import type { NextApiRequest, NextApiResponse } from 'next';
import server from '../../../env/server.mjs';
import { isContactForm } from '../../../src/lib/checks';
import transporter from '../../../src/lib/mail';
import { cors, runMiddleware } from '../../../src/lib/middleware';
import projectConfig from '../../../src/lib/project.config';
import { EmailContact } from '../../../src/templates';

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

        if (server.SMTP_SERVICE && server.SMTP_USER && server.SMTP_PASS) {
          const emailHtml = render(EmailContact(req.body), { pretty: true });

          transporter.sendMail({
            from: projectConfig.mailInfo.from,
            to: projectConfig.mailInfo.to,
            subject: `${req.body.name} contacted you`,
            html: emailHtml,
          });
        }

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
