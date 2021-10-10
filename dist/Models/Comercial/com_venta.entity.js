"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.com_ventaGuardar = exports.com_ventaConsultaPorID = exports.com_ventaConsultaTodos = exports.com_venta = void 0;
class com_venta {
    constructor() {
        this.idcom_venta = 0;
        this.d_total = 0.0;
        this.i_articulos = 0;
        this.d_descuento_aplicado = 0.0;
        this.d_subtotal = 0.0;
        this.idcom_cliente = 0;
    }
}
exports.com_venta = com_venta;
function com_ventaConsultaTodos(db) {
    console.log("Entity.com_venta.com_ventaConsultaTodos()");
    return db.query("select * from com_venta", []);
}
exports.com_ventaConsultaTodos = com_ventaConsultaTodos;
function com_ventaConsultaPorID(id, db) {
    console.log("Entity.com_venta.com_ventaConsultaPorID()");
    return db.query("select * from com_venta where idcom_venta = ?", id);
}
exports.com_ventaConsultaPorID = com_ventaConsultaPorID;
function com_ventaGuardar(_com_venta, db) {
    console.log("Entity.com_venta.com_ventaGuardar()");
    let query = "";
    let id = 0;
    if (_com_venta.idcom_venta && _com_venta.idcom_venta != 0) {
        query = "update com_venta set ? where idcom_venta = " + _com_venta.idcom_venta;
        id = _com_venta.idcom_venta;
    }
    else {
        query = "insert into com_venta set ?", _com_venta;
    }
    return db.query(query, _com_venta).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return com_ventaConsultaPorID(id, db);
    });
}
exports.com_ventaGuardar = com_ventaGuardar;
