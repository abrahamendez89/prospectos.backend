"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioGuardar = exports.UsuarioConsultaPorUsuario = exports.UsuarioConsultaPorID = exports.UsuarioConsultaTodos = exports.Usuario = void 0;
class Usuario {
    constructor() {
        this.usuario_id = 0;
        this.usuario_usuario = "";
        this.usuario_contrasena = "";
        this.usuario_rol = "";
    }
}
exports.Usuario = Usuario;
function UsuarioConsultaTodos(db) {
    return db.query("select * from usuario", []);
}
exports.UsuarioConsultaTodos = UsuarioConsultaTodos;
function UsuarioConsultaPorID(id, db) {
    return db.query("select * from usuario where usuario_id = ?", id);
}
exports.UsuarioConsultaPorID = UsuarioConsultaPorID;
function UsuarioConsultaPorUsuario(usuario, db) {
    return db.query("select * from usuario where usuario_usuario = ?", usuario);
}
exports.UsuarioConsultaPorUsuario = UsuarioConsultaPorUsuario;
function UsuarioGuardar(usuario, db) {
    let query = "";
    let id = 0;
    if (usuario.usuario_id && usuario.usuario_id != 0) {
        query = "update usuario set ? where usuario_id = " + usuario.usuario_id;
        id = usuario.usuario_id;
    }
    else {
        query = "insert into usuario set ?", usuario;
    }
    return db.query(query, usuario).then((insertedModel) => {
        if (id == 0)
            id = insertedModel.insertId;
        return UsuarioConsultaPorID(id, db);
    });
}
exports.UsuarioGuardar = UsuarioGuardar;
