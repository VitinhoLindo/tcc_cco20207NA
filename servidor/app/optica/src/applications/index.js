import Collection from './Collection' 

class Application {
  constructor() {
    this.apps       = {};
    this.window     = window;
    this.body       = this.window.document.body;
    this.Collection = Collection;
  }

  offSetMain(div = null) {
    if (!div) {
      let { innerWidth, innerHeight } = this.window;
      return { innerWidth, innerHeight};
    }

    let collection = new this.Collection(div.getClientRects());
    return collection.first();
  }

  getCollection(data) {
    return new this.Collection(data);
  }
}

export default new Application;