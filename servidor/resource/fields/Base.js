class Base {
    constructor() { }

    style(value = {}) {
        let response = this.get();

        response.shared.style = Object.assign({}, response.shared.style, value);

        this.set(response);
        return this;
    }
}

module.exports = Base;