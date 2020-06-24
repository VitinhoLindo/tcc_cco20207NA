const Repository                         = require('./repositorio');
const { Mailer: { Credential, Sender } } = require('../interfaces');

class Mailer extends Repository {
    nodeMailer = require('nodemailer');
    config     = Credential;

    constructor() { 
        this.readConfig();
        this.transport = this.nodeMailer.createTransport({
            host: this.config.SMTP_HOST,
            port: this.config.SMPT_PORT,
            auth: {
                user: this.config.SMTP_USER,
                pass: this.config.SMTP_PASS
            }
        });
    }

    async sendMail(option = Sender) {
        try {
            await this.transport.sendMail({
                from    : option.from,
                to      : option.to,
                subject : option.subject,
                text    : option.text,
                html    : option.html
            })   
        } catch (error) { }
    }
}

module.exports = Mailer;