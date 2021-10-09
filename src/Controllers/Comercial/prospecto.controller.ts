import {prospecto, prospectoGuardar, prospectoConsultaPorID, prospectoConsultaTodos } from '../../Models/Comercial/prospecto.entity';
import MySQLDB from '../../DBUtils/MySQLDB';
import { documento, documentoConsultaPorIDProspecto, documentoGuardar } from '../../Models/Comercial/documento.entity';

function SetController(app:any){
    console.log("Controller.prospecto.SetController()");
    app.route('/prospecto').get(getprospectos);
    app.route('/prospecto/:id').get(getprospectoId);
    app.route('/prospecto').post(postprospecto);
}

function getprospectos(req:any, res:any){
    console.log("Controller.prospecto.getprospectos()");
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
    console.log("Controller.prospecto.getprospectoId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return prospectoConsultaPorID(id, db);
    }).then((_prospecto:prospecto[])=>{
        console.log("consultandoDocumentos");
        res.json(_prospecto[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postprospecto(req:any, res:any){
    console.log("Controller.prospecto.postprospecto()");
    let db = new MySQLDB();

    let _prospecto:prospecto = req.body.Prospecto;
    let _documentos:documento[] = req.body.Documentos;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return prospectoGuardar(_prospecto,db);
    }).then((_prospecto:prospecto[])=>{
        console.log("guardando documentos");
        for(var i = 0; i < _documentos.length; i++){
            _documentos[i].prospecto_id = _prospecto[0].prospecto_id;
            console.log("doc "+i);
            documentoGuardar(_documentos[i], db);
        }
        console.log("documentos fin");
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
