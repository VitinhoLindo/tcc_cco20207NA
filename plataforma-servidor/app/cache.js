const Config = require('../config/config');

class Cache extends Config {
    constructor() {
        super();
        this.requestMinute = {
            requests: 0,
            timeStart: null,
            timeEnd  : null
        };
        this.requestMinuteAsync();
    }

    async requestMinuteAsync(){
        this.newTimeRequest();
        setInterval(() => {
            this.newTimeRequest();
        }, 60000);
    }

    async newTimeRequest() {
        let { year, month, day, hour, minute } = this.getDateObject(new Date());

        this.requestMinute.timeStart = new Date(`${year}-${month}-${day} ${hour}:${minute}`);
        this.requestMinute.timeEnd   = new Date(`${year}-${month}-${day} ${hour}:${minute + 1}`);
        this.requestMinute.requests  = 0;
    }

    openToRequest() {
        return !(this.requestMinute.requests <= this.maxRequestMinute);
    }
}

module.exports = Cache;