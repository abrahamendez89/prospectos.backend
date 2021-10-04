"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const com_cliente_entity_1 = require("../../Models/Comercial/com_cliente.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
function SetController(app) {
    console.log("Controller.com_clientes.SetController()");
    app.route('/com_cliente').get(getcom_clientes);
    app.route('/com_cliente/:id').get(getcom_clienteId);
    app.route('/com_cliente').post(postcom_cliente);
}
function getcom_clientes(req, res) {
    console.log("Controller.com_clientes.getcom_clientes()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_cliente_entity_1.com_clienteConsultaTodos)(db);
    }).then((_com_cliente) => {
        res.json(_com_cliente);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getcom_clienteId(req, res) {
    console.log("Controller.com_clientes.getcom_clienteId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, com_cliente_entity_1.com_clienteConsultaPorID)(id, db);
    }).then((_com_cliente) => {
        res.json(_com_cliente[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postcom_cliente(req, res) {
    console.log("Controller.com_clientes.postcom_cliente()");
    let db = new MySQLDB_1.default();
    let _com_cliente = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, com_cliente_entity_1.com_clienteGuardar)(_com_cliente, db);
    }).then((_com_cliente) => {
        return db.commitTran(_com_cliente);
    }).then((_com_cliente) => {
        res.json(_com_cliente[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
