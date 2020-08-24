const Util = require('./Util');
const { Mailer: { Credential, Sender } } = require('../interface');

class Mailer extends Util {
  mailerConfig = Credential;
  constructor() { 
    super();
    this.readMailerConfig();
    this.transport = this.nodeMailer.createTransport({
      host: this.mailerConfig.SMTP_HOST,
      port: this.mailerConfig.SMPT_PORT,
      auth: {
        user: this.mailerConfig.SMTP_USER,
        pass: this.mailerConfig.SMTP_PASS
      }
    });
  }

  readMailerConfig() {
    this.mailerConfig.SMTP_HOST = this.process.env.SMTP;
    this.mailerConfig.SMTP_PORT = this.process.env.SMTP_PORT;
    this.mailerConfig.SMTP_USER = this.process.env.SMTP_USER;
    this.mailerConfig.SMTP_PASS = this.process.env.SMTP_PASS;
  }

  async sendMail(option = new Sender) {
    if (option.pathFile) {
      let fileInfo = await this.getFileInfo(option.fileContent, option.pathFile);

      if (option.replace) {
        if (option.replace.type == 'html') {
          option.html = fileInfo.fileContent.replace(
            new RegExp(option.replace.regexp, 'g'),
            option.replace.value
          );
        } else if (option.replace.type == 'text') {
        }
      }
    }

    let _opt = {
      from: option.from,
      to: this.mailerConfig.SMTP_USER,
      subject: option.subject,
      text: option.text,
      html: option.html
    }

    await this.transport.sendMail(_opt);
  }
}

module.exports = Mailer;