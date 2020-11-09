import Window from './Window'

class Language extends Window {
    constructor() { super(); }

    $Language() {
        return this.language;
    }

    $Languages() {
        return this.languages;
    }

    async setlanguage(language) {
        let res = await this.request({
            url: '/translate',
            method: 'GET',
            params: {
                lang: language
            }
        });

        this.language = {
            lang: language,
            labels: res.result
        };

        this.emit('language-change');
        this.getLanguages();
    }

    async getLanguages() {
        let res = await this.request({
            url: '/translate/languages',
            method: 'get'
        });

        this.languages = res.result.languages || null;
    }
}

export default Language;