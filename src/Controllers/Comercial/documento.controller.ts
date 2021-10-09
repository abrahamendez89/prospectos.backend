import {documento, documentoGuardar, documentoConsultaPorID, documentoConsultaTodos, documentoConsultaPorIDProspecto } from '../../Models/Comercial/documento.entity';
import MySQLDB from '../../DBUtils/MySQLDB';

function SetController(app:any){
    console.log("Controller.documentos.SetController()");
    app.route('/documento').get(getdocumentos);
    app.route('/documento/:id').get(getdocumentoId);
    app.route('/documento').post(postdocumento);
    app.route('/documentop/:id').get(getdocumentoProspectoId);
}

function getdocumentos(req:any, res:any){
    console.log("Controller.documentos.getdocumentos()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return documentoConsultaTodos(db);
    }).then((_documento:documento[])=>{
        res.json(_documento);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getdocumentoId(req:any, res:any){
    console.log("Controller.documentos.getdocumentoId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return documentoConsultaPorID(id, db);
    }).then((_documento:documento[])=>{
        res.json(_documento[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getdocumentoProspectoId(req:any, res:any){
    console.log("Controller.documentos.getdocumentoProspectoId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return documentoConsultaPorIDProspecto(id, db);
    }).then((_documento:documento[])=>{
        res.json(_documento);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postdocumento(req:any, res:any){
    console.log("Controller.documentos.postdocumento()");
    let db = new MySQLDB();

    let _documento:documento = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return documentoGuardar(_documento,db);
    }).then((_documento:documento[])=>{
        return db.commitTran(_documento);
    }).then((_documento: documento[])=>{
        res.json(_documento[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};
