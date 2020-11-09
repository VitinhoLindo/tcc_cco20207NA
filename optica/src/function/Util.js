import Variables from './Variables'

class Util extends Variables {
    constructor() { super(); }

    sleep(time) {
        time = (parseFloat(time) || 1) * 1000;
        return new Promise((resolve) => {
            setTimeout(() => { resolve(true); }, time);
        });
    }


    async getDiv(id, trying = 1000) {
        let count = 0, division = null;

        if (!id) return division;
        do {
            if (count == trying) break;

            division = document.getElementById(id);
            await this.sleep(0.01);
            count++;
        } while (!division);

        return division;
    }

    random(min, max) {
        let _max, decimalHouse = 10, rand;

        if (min > max) {
            _max = max; max = min; min = _max;
        }

        while (max > decimalHouse) {
            decimalHouse += 10;
        }

        do {
            rand = Math.floor(Math.random() * decimalHouse);
        } while (rand < min || rand > max);

        return rand;
    }

    characters(_super = false) {
        let object = {
            latter: 'abcdefghijklmnopqrstuvxywz',
            number: '0123456789',
            super: '!@#$%*()_+£¢¬<>,.:;^~]}[{ª|§º'
        };

        let characters = `${object.latter}${object.number}`;

        return (_super) ? `${characters}${object.super}` : characters;
    }

    randomString(len, _super = false) {
        let characters = this.characters(_super),
            rand = '';

        if (len < 0) len = len * (-1);

        for (let x = 0; x < len; x++) {
            let v = this.random(0, characters.length - 1);
            rand += characters[v];
        }

        return rand;
    }
}

export default Util;