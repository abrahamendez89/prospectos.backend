import {prospecto, prospectoGuardar, prospectoConsultaPorID, prospectoConsultaTodos } from '../../Models/Comercial/prospecto.entity';
import MySQLDB from '../../DBUtils/MySQLDB';

function SetController(app:any){
    console.log("Controller.prospectos.SetController()");
    app.route('/prospecto').get(getprospectos);
    app.route('/prospecto/:id').get(getprospectoId);
    app.route('/prospecto').post(postprospecto);
}

function getprospectos(req:any, res:any){
    console.log("Controller.prospectos.getprospectos()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return prospectoConsultaTodos(db);
    }).then((_prospecto:prospecto[])=>{
        res.json(_prospecto);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getprospectoId(req:any, res:any){
    console.log("Controller.prospectos.getprospectoId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return prospectoConsultaPorID(id, db);
    }).then((_prospecto:prospecto[])=>{
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postprospecto(req:any, res:any){
    console.log("Controller.prospectos.postprospecto()");
    let db = new MySQLDB();

    let _prospecto:prospecto = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return prospectoGuardar(_prospecto,db);
    }).then((_prospecto:prospecto[])=>{
        return db.commitTran(_prospecto);
    }).then((_prospecto: prospecto[])=>{
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};
