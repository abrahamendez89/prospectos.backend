"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentoGuardar = exports.documentoConsultaPorIDProspecto = exports.documentoConsultaPorID = exports.documentoConsultaTodos = exports.documento = void 0;
class documento {
    constructor() {
        this.documento_id = 0;
        this.prospecto_id = 0;
        this.documento_nombre_documento = "";
        this.documento_data_base64 = "";
    }
}
exports.documento = documento;
function documentoConsultaTodos(db) {
    console.log("Entity.documento.documentoConsultaTodos()");
    return db.query("select * from documento", []);
}
exports.documentoConsultaTodos = documentoConsultaTodos;
function documentoConsultaPorID(id, db) {
    console.log("Entity.documento.documentoConsultaPorID()");
    return db.query("select * from documento where documento_id = ?", id);
}
exports.documentoConsultaPorID = documentoConsultaPorID;
function documentoConsultaPorIDProspecto(id, db) {
    console.log("Entity.documento.documentoConsultaPorIDProspecto()");
    return db.query("select documento_id, prospecto_id, documento_nombre_documento from documento where prospecto_id = ?", id);
}
exports.documentoConsultaPorIDProspecto = documentoConsultaPorIDProspecto;
function documentoGuardar(_documento, db) {
    console.log("Entity.documento.documentoGuardar()");
    let query = "";
    let id = 0;
    if (_documento.documento_id && _documento.documento_id != 0) {
        query = "update documento set ? where documento_id = " + _documento.documento_id;
        id = _documento.documento_id;
    }
    else {
        query = "insert into documento set ?", _documento;
    }
    return db.query(query, _documento).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return documentoConsultaPorID(id, db);
    });
}
exports.documentoGuardar = documentoGuardar;
