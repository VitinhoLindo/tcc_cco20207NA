import MyRequest from './Request'

class Window extends MyRequest {

    constructor() { super(); }

    offSetMain(div = null) {
        if (!div) {
            let { innerWidth, innerHeight } = this.window;
            return { innerWidth, innerHeight };
        }

        let collection = new this.Collection(div.getClientRects());
        return collection.first();
    }
}

export default Window;