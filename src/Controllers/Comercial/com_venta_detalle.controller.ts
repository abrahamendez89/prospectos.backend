import {com_venta_detalle, com_venta_detalleGuardar, com_venta_detalleConsultaPorID, com_venta_detalleConsultaTodos } from '../../Models/Comercial/com_venta_detalle.entity';
import MySQLDB from '../../DBUtils/MySQLDB';

function SetController(app:any){
    console.log("Controller.com_venta_detalles.SetController()");
    app.route('/com_venta_detalle').get(getcom_venta_detalles);
    app.route('/com_venta_detalle/:id').get(getcom_venta_detalleId);
    app.route('/com_venta_detalle').post(postcom_venta_detalle);
}

function getcom_venta_detalles(req:any, res:any){
    console.log("Controller.com_venta_detalles.getcom_venta_detalles()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_venta_detalleConsultaTodos(db);
    }).then((_com_venta_detalle:com_venta_detalle[])=>{
        res.json(_com_venta_detalle);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getcom_venta_detalleId(req:any, res:any){
    console.log("Controller.com_venta_detalles.getcom_venta_detalleId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_venta_detalleConsultaPorID(id, db);
    }).then((_com_venta_detalle:com_venta_detalle[])=>{
        res.json(_com_venta_detalle[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postcom_venta_detalle(req:any, res:any){
    console.log("Controller.com_venta_detalles.postcom_venta_detalle()");
    let db = new MySQLDB();

    let _com_venta_detalle:com_venta_detalle = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return com_venta_detalleGuardar(_com_venta_detalle,db);
    }).then((_com_venta_detalle:com_venta_detalle[])=>{
        return db.commitTran(_com_venta_detalle);
    }).then((_com_venta_detalle: com_venta_detalle[])=>{
        res.json(_com_venta_detalle[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};
