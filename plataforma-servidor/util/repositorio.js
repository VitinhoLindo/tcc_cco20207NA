const MyEvent = require('./event');

class Repository extends MyEvent {
    _dirname_ = '';

    constructor() {
        super();
    }
}

module.exports = Repository;