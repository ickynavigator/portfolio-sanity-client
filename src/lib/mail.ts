import nodemailer from 'nodemailer';
import type { SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import server from '../env/server.mjs';
import { getConfig } from './project.config';

export default class Mailer {
  private transporter?: Transporter<SentMessageInfo>;

  private create() {
    this.transporter = nodemailer.createTransport({
      logger: process.env.NODE_ENV !== 'production',
      debug: process.env.NODE_ENV !== 'production',
      service: server.SMTP_SERVICE,
      auth: { user: server.SMTP_USER, pass: server.SMTP_PASS },
    });
  }

  private destroy() {
    this.transporter?.close();
    this.transporter = undefined;
  }

  async sendMail(html: string, options?: Mail.Options) {
    const projectConfig = await getConfig();

    if (!projectConfig?.mailInfo?.from || !projectConfig?.mailInfo?.to) return;

    if (
      server.SMTP_USER === undefined ||
      server.SMTP_PASS === undefined ||
      server.SMTP_SERVICE === undefined
    )
      return;

    if (!this.transporter) {
      this.create();
    }

    try {
      await this.transporter?.sendMail({
        from: projectConfig.mailInfo.from,
        to: projectConfig.mailInfo.to,
        html,
        ...options,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.destroy();
    }
  }
}
