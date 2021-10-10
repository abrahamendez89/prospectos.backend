"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Usuario_entity_1 = require("../../Models/Sistema/Usuario.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
const jwt = require("jsonwebtoken");
const appconfig_1 = require("../../appconfig");
function SetController(app) {
    console.log("Controller.usuario.SetController()");
    app.route('/usuario').get(getUsuarios);
    app.route('/usuario/:id').get(getUsuarioId);
    app.route('/usuario').post(postUsuario);
    app.route('/login').post(postLogin);
}
function getUsuarios(req, res) {
    console.log("Controller.usuario.getUsuarios()");
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, Usuario_entity_1.UsuarioConsultaTodos)(db);
    }).then((usuario) => {
        res.json(usuario);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function getUsuarioId(req, res) {
    console.log("Controller.usuario.getUsuarioId()");
    let id = req.params.id;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, Usuario_entity_1.UsuarioConsultaPorID)(id, db);
    }).then((usuario) => {
        res.json(usuario[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postUsuario(req, res) {
    console.log("Controller.usuario.postUsuario()");
    let db = new MySQLDB_1.default();
    let usuario = req.body;
    db.open().then(() => {
        return db.beginTran();
    }).then(() => {
        return (0, Usuario_entity_1.UsuarioGuardar)(usuario, db);
    }).then((usuario) => {
        return db.commitTran(usuario);
    }).then((results) => {
        res.json(results[0]);
        return db.close();
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
function postLogin(req, res) {
    console.log("Controller.usuario.postLogin()");
    let usuarioReq = req.body;
    let db = new MySQLDB_1.default();
    db.open().then(() => {
        return (0, Usuario_entity_1.UsuarioConsultaPorUsuario)(usuarioReq.usuario_usuario, db);
    }).then((usuario) => {
        if (usuario[0] && usuario[0].usuario_contrasena == usuarioReq.usuario_contrasena) {
            const token = jwt.sign({ usuario_usuario: usuario[0].usuario_usuario, usuario_rol: usuario[0].usuario_rol }, appconfig_1.Appconfig.secret, { expiresIn: 1800 });
            db.close();
            res.json({ token: token, rol: usuario[0].usuario_rol });
        }
        else {
            db.close();
            res.sendStatus(403); //forbidden
        }
    }).catch((error) => {
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}
module.exports = { SetController: SetController };
