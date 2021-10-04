"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class com_venta_detalle {
    constructor() {
        this.idcom_venta_detalle = 0;
        this.idcom_venta = 0;
        this.d_cantidad = 0.0;
        this.d_subtotal = 0.0;
    }
}
exports.com_venta_detalle = com_venta_detalle;
function com_venta_detalleConsultaTodos(db) {
    return db.query("select * from com_venta_detalle", []);
}
exports.com_venta_detalleConsultaTodos = com_venta_detalleConsultaTodos;
function com_venta_detalleConsultaPorID(id, db) {
    return db.query("select * from com_venta_detalle where idcom_venta_detalle = ?", id);
}
exports.com_venta_detalleConsultaPorID = com_venta_detalleConsultaPorID;
function com_venta_detalleGuardar(_com_venta_detalle, db) {
    let query = "";
    let id = 0;
    if (_com_venta_detalle.idcom_venta_detalle && _com_venta_detalle.idcom_venta_detalle != 0) {
        query = "update com_venta_detalle set ? where idcom_venta_detalle = " + _com_venta_detalle.idcom_venta_detalle;
        id = _com_venta_detalle.idcom_venta_detalle;
    }
    else {
        query = "insert into com_venta_detalle set ?", _com_venta_detalle;
    }
    return db.query(query, _com_venta_detalle).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return com_venta_detalleConsultaPorID(id, db);
    });
}
exports.com_venta_detalleGuardar = com_venta_detalleGuardar;
