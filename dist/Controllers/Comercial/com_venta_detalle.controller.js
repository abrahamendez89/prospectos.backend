"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const com_venta_detalle_entity_1 = require("../../Models/Comercial/com_venta_detalle.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
function SetController(app) {
    console.log("Controller.com_venta_detalles.SetController()");
    app.route('/com_venta_detalle').get(getcom_venta_detalles);
    app.route('/com_venta_detalle/:id').get(getcom_venta_detalleId);
    app.route('/com_venta_detalle').post(postcom_venta_detalle);
}
function getcom_venta_detalles(req, res) {
    console.log("Controller.com_venta_detalles.getcom_venta_detalles()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_venta_detalle_entity_1.com_venta_detalleConsultaTodos)(db);
    }).then((_com_venta_detalle) => {
        res.json(_com_venta_detalle);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getcom_venta_detalleId(req, res) {
    console.log("Controller.com_venta_detalles.getcom_venta_detalleId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_venta_detalle_entity_1.com_venta_detalleConsultaPorID)(id, db);
    }).then((_com_venta_detalle) => {
        res.json(_com_venta_detalle[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postcom_venta_detalle(req, res) {
    console.log("Controller.com_venta_detalles.postcom_venta_detalle()");
    let db = new MySQLDB_1.default();
    let _com_venta_detalle = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, com_venta_detalle_entity_1.com_venta_detalleGuardar)(_com_venta_detalle, db);
    }).then((_com_venta_detalle) => {
        return db.commitTran(_com_venta_detalle);
    }).then((_com_venta_detalle) => {
        res.json(_com_venta_detalle[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
