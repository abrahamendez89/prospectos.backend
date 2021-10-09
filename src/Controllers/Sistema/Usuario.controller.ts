import {Usuario, UsuarioGuardar, UsuarioConsultaPorID, UsuarioConsultaTodos, UsuarioConsultaPorUsuario } from '../../Models/Sistema/Usuario.entity';
import MySQLDB from '../../DBUtils/MySQLDB';
import jwt = require('jsonwebtoken');
import { Appconfig } from '../../appconfig'; 
import { RedisDB } from '../../DBUtils/RedisDB';

function SetController(app:any){
    console.log("Controller.usuario.SetController()");
    app.route('/usuario').get(getUsuarios);
    app.route('/usuario/:id').get(getUsuarioId);
    app.route('/usuario').post(postUsuario);
    app.route('/login').post(postLogin);
}

function getUsuarios(req:any, res:any){
    console.log("Controller.usuario.getUsuarios()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return UsuarioConsultaTodos(db);
    }).then((usuario:Usuario[])=>{
        res.json(usuario);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getUsuarioId(req:any, res:any){
    console.log("Controller.usuario.getUsuarioId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return UsuarioConsultaPorID(id, db);
    }).then((usuario:Usuario[])=>{
        res.json(usuario[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postUsuario(req:any, res:any){
    console.log("Controller.usuario.postUsuario()");
    let db = new MySQLDB();

    let usuario:Usuario = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return UsuarioGuardar(usuario,db);
    }).then((usuario:Usuario[])=>{
        return db.commitTran(usuario);
    }).then((results: Usuario[])=>{
        res.json(results[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postLogin(req:any, res:any) {
    console.log("Controller.usuario.postLogin()");
    let usuarioReq:Usuario = req.body;    
    let db = new MySQLDB();
    db.open().then(()=>{
        return UsuarioConsultaPorUsuario(usuarioReq.usuario_usuario, db);
    }).then((usuario: Usuario[])=>{
        if(usuario[0] && usuario[0].usuario_contrasena == usuarioReq.usuario_contrasena){
            const token =  jwt.sign({usuario_usuario: usuario[0].usuario_usuario, usuario_rol:usuario[0].usuario_rol}, Appconfig.secret, { expiresIn: 1800 });
            
            db.close();
            res.json({token:token});
        }
        else{
            db.close();
            res.sendStatus(403); //forbidden
        }
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};