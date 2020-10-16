class Event {
  constructor() {
    this.listiners = {};
    this.rules = {};
  }

  addRuleEvent(listiner, count) {
    this.rules[listiner] = count;
  }

  checkRuleEvent(listiner) {
    if (!this.rules[listiner]) return false;
    if (!this.listiners[listiner]) return false;
    if (
      this.listiners[listiner].length <
      this.rules[listiner]
    ) return false;

    return true;
  }

  on(listiner, func) {
    if (typeof listiner != 'string') return;
    if (typeof func != 'function') return;
    if (this.checkRuleEvent(listiner)) return;
    if (!this.listiners[listiner])
      this.listiners[listiner] = [];

    this.listiners[listiner].push(func);
  }

  emit(listiner, ...args) {
    if (typeof listiner != 'string') return;
    if (!this.listiners[listiner])   return;

    for(let func of this.listiners[listiner])
      func.apply(null, args);
  }
}

export default Event;