"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const prospecto_entity_1 = require("../../Models/Comercial/prospecto.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
function SetController(app) {
    console.log("Controller.prospectos.SetController()");
    app.route('/prospecto').get(getprospectos);
    app.route('/prospecto/:id').get(getprospectoId);
    app.route('/prospecto').post(postprospecto);
}
function getprospectos(req, res) {
    console.log("Controller.prospectos.getprospectos()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, prospecto_entity_1.prospectoConsultaTodos)(db);
    }).then((_prospecto) => {
        res.json(_prospecto);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getprospectoId(req, res) {
    console.log("Controller.prospectos.getprospectoId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, prospecto_entity_1.prospectoConsultaPorID)(id, db);
    }).then((_prospecto) => {
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postprospecto(req, res) {
    console.log("Controller.prospectos.postprospecto()");
    let db = new MySQLDB_1.default();
    let _prospecto = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, prospecto_entity_1.prospectoGuardar)(_prospecto, db);
    }).then((_prospecto) => {
        return db.commitTran(_prospecto);
    }).then((_prospecto) => {
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
