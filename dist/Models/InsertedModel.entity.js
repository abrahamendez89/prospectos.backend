"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InsertedModel {
    constructor() {
        this.fieldCount = 0;
        this.affectedRows = 0;
        this.insertId = 0;
        this.serverStatus = 0;
        this.warningCount = 0;
        this.message = '';
        this.protocol41 = false;
        this.changedRows = 0;
    }
}
exports.default = InsertedModel;
