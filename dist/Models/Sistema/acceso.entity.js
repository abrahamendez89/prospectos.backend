"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accesoGuardar = exports.accesoConsultaValoresActivos = exports.accesoConsultaPorID = exports.accesoConsultaTodos = exports.acceso = void 0;
class acceso {
    constructor() {
        this.acceso_id = 0;
        this.acceso_rol = "";
        this.acceso_api = "";
        this.acceso_metodo = "";
        this.acceso_activo = 0;
    }
}
exports.acceso = acceso;
function accesoConsultaTodos(db) {
    console.log("Entity.acceso.accesoConsultaTodos()");
    return db.query("select * from acceso", []);
}
exports.accesoConsultaTodos = accesoConsultaTodos;
function accesoConsultaPorID(id, db) {
    console.log("Entity.acceso.accesoConsultaPorID()");
    return db.query("select * from acceso where acceso_id = ?", id);
}
exports.accesoConsultaPorID = accesoConsultaPorID;
function accesoConsultaValoresActivos(rol, api, metodo, db) {
    console.log("Entity.acceso.accesoConsultaPorID()");
    return db.query("select * from acceso where acceso_rol = ? and acceso_api = ? and acceso_metodo = ? and acceso_activo = 1", [rol, api, metodo]);
}
exports.accesoConsultaValoresActivos = accesoConsultaValoresActivos;
function accesoGuardar(_acceso, db) {
    console.log("Entity.acceso.accesoGuardar()");
    let query = "";
    let id = 0;
    if (_acceso.acceso_id && _acceso.acceso_id != 0) {
        query = "update acceso set ? where acceso_id = " + _acceso.acceso_id;
        id = _acceso.acceso_id;
    }
    else {
        query = "insert into acceso set ?", _acceso;
    }
    return db.query(query, _acceso).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return accesoConsultaPorID(id, db);
    });
}
exports.accesoGuardar = accesoGuardar;
