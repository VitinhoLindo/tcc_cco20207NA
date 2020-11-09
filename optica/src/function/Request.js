import Util from './Util'

class MyRequest extends Util {

    constructor() {
        super();

        /**
         * temporario
         */
        this.ip = '10.0.0.108';
        this.port = '3000';
        this.protocol = (this.port == '403') ? 'https' : 'http';
        this.path = `${this.protocol}://${this.ip}:${this.port}`;
    }

    defaultHeader(headers = {}) {
        let defaultHeader = {
            'Content-type': 'application/json',
        };

        for (let key in defaultHeader)
            if (headers[key]) continue;
            else headers[key] = defaultHeader[key];

        headers['Authorization'] = (this.storage.shared && this.storage.shared.auth) ? `Bearer ${this.storage.shared.auth}` : '';

        return headers;
    }


    async request(option = this.requestOptions) {
        try {
            let { data } = await this.Axios({
                url: `${this.path}${option.url.toLowerCase()}`,
                method: (option.method || 'get').toUpperCase(),
                headers: this.defaultHeader(option.headers),
                params: option.params || {},
                data: option.data || {}
            });

            return data;
        } catch (error) {
            console.log(error);
            let err = error.toJSON();

            return {
                status: 'error',
                message: err.message,
                result: {
                    stack: err.stack
                }
            };
        }
    }
}

export default MyRequest;