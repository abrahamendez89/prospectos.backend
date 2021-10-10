"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const documento_entity_1 = require("../../Models/Comercial/documento.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
function SetController(app) {
    console.log("Controller.documentos.SetController()");
    app.route('/documento').get(getdocumentos);
    app.route('/documento/:id').get(getdocumentoId);
    app.route('/documento').post(postdocumento);
    app.route('/documentop/:id').get(getdocumentoProspectoId);
}
function getdocumentos(req, res) {
    console.log("Controller.documentos.getdocumentos()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, documento_entity_1.documentoConsultaTodos)(db);
    }).then((_documento) => {
        res.json(_documento);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getdocumentoId(req, res) {
    console.log("Controller.documentos.getdocumentoId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, documento_entity_1.documentoConsultaPorID)(id, db);
    }).then((_documento) => {
        res.json(_documento[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getdocumentoProspectoId(req, res) {
    console.log("Controller.documentos.getdocumentoProspectoId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, documento_entity_1.documentoConsultaPorIDProspecto)(id, db);
    }).then((_documento) => {
        res.json(_documento);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postdocumento(req, res) {
    console.log("Controller.documentos.postdocumento()");
    let db = new MySQLDB_1.default();
    let _documento = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, documento_entity_1.documentoGuardar)(_documento, db);
    }).then((_documento) => {
        return db.commitTran(_documento);
    }).then((_documento) => {
        res.json(_documento[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
