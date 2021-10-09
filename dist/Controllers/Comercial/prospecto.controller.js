"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const prospecto_entity_1 = require("../../Models/Comercial/prospecto.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
const documento_entity_1 = require("../../Models/Comercial/documento.entity");
function SetController(app) {
    console.log("Controller.prospecto.SetController()");
    app.route('/prospecto').get(getprospectos);
    app.route('/prospecto/:id').get(getprospectoId);
    app.route('/prospecto').post(postprospecto);
    app.route('/prospectow').post(postprospectow);
}
function getprospectos(req, res) {
    console.log("Controller.prospecto.getprospectos()");
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
    console.log("Controller.prospecto.getprospectoId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, prospecto_entity_1.prospectoConsultaPorID)(id, db);
    }).then((_prospecto) => {
        console.log("consultandoDocumentos");
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postprospecto(req, res) {
    console.log("Controller.prospecto.postprospecto()");
    let db = new MySQLDB_1.default();
    let _prospecto = req.body;
    console.log(_prospecto);
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
function postprospectow(req, res) {
    console.log("Controller.prospecto.postprospectow()");
    let db = new MySQLDB_1.default();
    let _prospecto = req.body.Prospecto;
    let _documentos = req.body.Documentos;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, prospecto_entity_1.prospectoGuardar)(_prospecto, db);
    }).then((_prospecto) => {
        console.log("guardando documentos");
        for (var i = 0; i < _documentos.length; i++) {
            _documentos[i].prospecto_id = _prospecto[0].prospecto_id;
            console.log("doc " + i);
            (0, documento_entity_1.documentoGuardar)(_documentos[i], db);
        }
        console.log("documentos fin");
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
