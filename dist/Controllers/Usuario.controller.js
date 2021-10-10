"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Usuario_entity_1 = __importDefault(require("../Models/Sistema/Usuario.entity"));
function SetController(app) {
    app.route('/usuarios').get(get);
}
function get(req, res) {
    var user = new Usuario_entity_1.default("abraham", "qwer", new Date(2018, 10, 29));
    res.json(user);
}
module.exports = { SetController: SetController };
