class Sender {
    from = '';
    to   = [] || '';
    subject     = '';
    attachments = {
        filename    : '',
        contentType : '',
        encoding    : '',
        content     : ''
    };
    text = '';
    html = '';

    constructor() {}
}

module.exports = new Sender();