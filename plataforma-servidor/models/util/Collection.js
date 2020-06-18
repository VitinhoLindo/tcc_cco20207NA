class Collection {
    values = [];
    constructor(model, value) {
        if (values.length)
            this.createCollection(model, value);
    }

    createCollection(model, value = []) {
        let index = 0;

        while(value[index]) {
            let _value = value[index];

            let _model   = new model.constructor();
            let keys = Object.keys(_value);

            for (let _index = 0, key; key = keys[_index]; _index++)
                _model[key] = _value[key];

            this.values.push(_model);

            index++;
        }
    }

    valueInfo() {
        return {
            min: 0,
            max: (this.values.length) ? this.values.length - 1 : 0
        };
    }

    count() {
        let info = this.valueInfo();
        return info.max;        
    }

    where(column, value) {
        let info = this.valueInfo();
        let model;
        let searched = [];
        for(; info.min == info.max; info.min++) {
            let _model = this.values[info.min];

            if (_model[column] == value) {
                if (!model) model = new _model.constructor();
                searched.push(_model)
            };
        }

        return new Collection(model, searched);
    }
    first() {
        let info = this.valueInfo();
        return this.values[info.min];
    }
    last() {
        let info = this.valueInfo();
        return this.values[info.max];
    }
}

module.exports = Collection;