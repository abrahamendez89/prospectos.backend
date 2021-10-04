"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prospectoGuardar = exports.prospectoConsultaPorID = exports.prospectoConsultaTodos = exports.prospecto = void 0;
class prospecto {
    constructor() {
        this.prospecto_id = 0;
        this.prospecto_nombre = "";
        this.prospecto_appaterno = "";
        this.prospecto_apmaterno = "";
        this.prospecto_calle = "";
        this.prospecto_numero = "";
        this.prospecto_colonia = "";
        this.prospecto_cod_postal = 0;
        this.prospecto_tel = "";
        this.prospecto_RFC = "";
        this.prospecto_estatus = "";
    }
}
exports.prospecto = prospecto;
function prospectoConsultaTodos(db) {
    console.log("Entity.prospecto.prospectoConsultaTodos()");
    return db.query("select * from prospecto", []);
}
exports.prospectoConsultaTodos = prospectoConsultaTodos;
function prospectoConsultaPorID(id, db) {
    console.log("Entity.prospecto.prospectoConsultaPorID()");
    return db.query("select * from prospecto where prospecto_id = ?", id);
}
exports.prospectoConsultaPorID = prospectoConsultaPorID;
function prospectoGuardar(_prospecto, db) {
    console.log("Entity.prospecto.prospectoGuardar()");
    let query = "";
    let id = 0;
    if (_prospecto.prospecto_id && _prospecto.prospecto_id != 0) {
        query = "update prospecto set ? where prospecto_id = " + _prospecto.prospecto_id;
        id = _prospecto.prospecto_id;
    }
    else {
        query = "insert into prospecto set ?", _prospecto;
    }
    return db.query(query, _prospecto).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return prospectoConsultaPorID(id, db);
    });
}
exports.prospectoGuardar = prospectoGuardar;
