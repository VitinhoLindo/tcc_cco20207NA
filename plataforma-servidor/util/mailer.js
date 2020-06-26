const Util                               = require('./util');
const { Mailer: { Credential, Sender } } = require('../interfaces');

class Mailer extends Util {
    nodeMailer = require('nodemailer');
    config     = Credential;

    constructor() { 
        super();
        this.readMailerConfig();
        this.transport = this.nodeMailer.createTransport({
            host: this.config.SMTP_HOST,
            port: this.config.SMPT_PORT,
            auth: {
                user: this.config.SMTP_USER,
                pass: this.config.SMTP_PASS
            }
        });
    }

    readMailerConfig() {
        this.config.SMTP_HOST = this.process.env.SMTP;
        this.config.SMTP_PORT = this.process.env.SMTP_PORT;
        this.config.SMTP_USER = this.process.env.SMTP_USER;
        this.config.SMTP_PASS = this.process.env.SMTP_PASS;
    }

    async sendMail(option = new Sender) {
        if (option.replace) {
            if (option._pathFile) {
                let info = await this.getFileInfo(option.fileConent, option._pathFile);
                
                if (option.replace.type == 'html') {
                    option.html = info.file.replace(new RegExp(option.replace.regexp, 'g'), option.replace.value);
                }
            }

        }
        
        let _opt = {
            from: option.from,
            to: this.config.SMTP_USER,
            subject: option.subject,
            text: option.text,
            html: option.html
        }

        await this.transport.sendMail(_opt);
    }
}

module.exports = Mailer;