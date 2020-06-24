class JoinOptions {
    tableTarget = '';
    tableTargetAndColumn = '';
    comparison  = '';
    currentTableAndColumn = '';

    constructor(opt) {
        if (opt) {
            this.tableTarget           = opt.tableTarget;
            this.tableTargetAndColumn  = opt.tableTargetAndColumn;
            this.comparison            = opt.comparison;
            this.currentTableAndColumn = opt.currentTableAndColumn;
        }
    }

    getTargetTable() { return this.tableTarget; }
    getTargetAndColumn() { return this.tableTargetAndColumn; }
    getComparison() { return this.comparison || '='; }
    getCurrentTableAndColumn() { return this.currentTableAndColumn; }
}

module.exports = JoinOptions;