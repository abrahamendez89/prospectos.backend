"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const com_venta_entity_1 = require("../../Models/Comercial/com_venta.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
const com_venta_detalle_entity_1 = require("../../Models/Comercial/com_venta_detalle.entity");
function SetController(app) {
    console.log("Controller.com_ventas.SetController()");
    app.route('/com_venta').get(getcom_ventas);
    app.route('/com_venta/:id').get(getcom_ventaId);
    app.route('/com_venta').post(postcom_venta);
    app.route('/com_venta_con_detalle').post(com_venta_con_detalle);
}
function getcom_ventas(req, res) {
    console.log("Controller.com_ventas.getcom_ventas()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_venta_entity_1.com_ventaConsultaTodos)(db);
    }).then((_com_venta) => {
        res.json(_com_venta);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getcom_ventaId(req, res) {
    console.log("Controller.com_ventas.getcom_ventaId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_venta_entity_1.com_ventaConsultaPorID)(id, db);
    }).then((_com_venta) => {
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postcom_venta(req, res) {
    console.log("Controller.com_ventas.com_venta_con_detalle()");
    let db = new MySQLDB_1.default();
    let _com_venta = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, com_venta_entity_1.com_ventaGuardar)(_com_venta, db);
    }).then((_com_venta) => {
        return db.commitTran(_com_venta);
    }).then((_com_venta) => {
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function com_venta_con_detalle(req, res) {
    console.log("------postcom_venta------");
    let db = new MySQLDB_1.default();
    let _com_venta = req.body.venta;
    let _com_venta_detalles = req.body.detalles;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, com_venta_entity_1.com_ventaGuardar)(_com_venta, db);
    }).then((_com_venta) => {
        for (var i = 0; i < _com_venta_detalles.length; i++) {
            _com_venta_detalles[i].idcom_venta = _com_venta[0].idcom_venta;
            (0, com_venta_detalle_entity_1.com_venta_detalleGuardar)(_com_venta_detalles[0], db);
        }
        return db.commitTran(_com_venta);
    }).then((_com_venta) => {
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
