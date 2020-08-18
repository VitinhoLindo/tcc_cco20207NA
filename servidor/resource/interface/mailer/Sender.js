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
    _pathFile  = '';
    fileConent = '';
    replace   = {
        regexp: '',
        value : '',
        type  : ''
    } 

    constructor() {}
}

module.exports = Sender;