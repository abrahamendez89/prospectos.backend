"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class com_cliente {
    constructor() {
        this.idcom_cliente = 0;
        this.s_nombres = "";
        this.s_apellido_paterno = "";
        this.s_apellido_materno = "";
    }
}
exports.com_cliente = com_cliente;
function com_clienteConsultaTodos(db) {
    return db.query("select * from com_cliente", []);
}
exports.com_clienteConsultaTodos = com_clienteConsultaTodos;
function com_clienteConsultaPorID(id, db) {
    return db.query("select * from com_cliente where idcom_cliente = ?", id);
}
exports.com_clienteConsultaPorID = com_clienteConsultaPorID;
function com_clienteGuardar(_com_cliente, db) {
    let query = "";
    let id = 0;
    if (_com_cliente.idcom_cliente && _com_cliente.idcom_cliente != 0) {
        query = "update com_cliente set ? where idcom_cliente = " + _com_cliente.idcom_cliente;
        id = _com_cliente.idcom_cliente;
    }
    else {
        query = "insert into com_cliente set ?", _com_cliente;
    }
    return db.query(query, _com_cliente).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return com_clienteConsultaPorID(id, db);
    });
}
exports.com_clienteGuardar = com_clienteGuardar;
