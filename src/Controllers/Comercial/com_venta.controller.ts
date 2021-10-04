import {com_venta, com_ventaGuardar, com_ventaConsultaPorID, com_ventaConsultaTodos } from '../../Models/Comercial/com_venta.entity';
import MySQLDB from '../../DBUtils/MySQLDB';
import { com_venta_detalle, com_venta_detalleGuardar } from '../../Models/Comercial/com_venta_detalle.entity';


function SetController(app:any){
    console.log("Controller.com_ventas.SetController()");
    app.route('/com_venta').get(getcom_ventas);
    app.route('/com_venta/:id').get(getcom_ventaId);
    app.route('/com_venta').post(postcom_venta);
    app.route('/com_venta_con_detalle').post(com_venta_con_detalle);
}

function getcom_ventas(req:any, res:any){
    console.log("Controller.com_ventas.getcom_ventas()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_ventaConsultaTodos(db);
    }).then((_com_venta:com_venta[])=>{
        res.json(_com_venta);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getcom_ventaId(req:any, res:any){
    console.log("Controller.com_ventas.getcom_ventaId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_ventaConsultaPorID(id, db);
    }).then((_com_venta:com_venta[])=>{
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postcom_venta(req:any, res:any){
    console.log("Controller.com_ventas.com_venta_con_detalle()");
    let db = new MySQLDB();

    let _com_venta:com_venta = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return com_ventaGuardar(_com_venta,db);
    }).then((_com_venta:com_venta[])=>{
        return db.commitTran(_com_venta);
    }).then((_com_venta: com_venta[])=>{
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function com_venta_con_detalle(req:any, res:any){
    console.log("------postcom_venta------");
    let db = new MySQLDB();
    let _com_venta:com_venta = req.body.venta;
    let _com_venta_detalles:com_venta_detalle[] = req.body.detalles;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return com_ventaGuardar(_com_venta,db);
    }).then((_com_venta:com_venta[])=>{
        for(var i = 0; i < _com_venta_detalles.length; i++){
            _com_venta_detalles[i].idcom_venta = _com_venta[0].idcom_venta;
            com_venta_detalleGuardar(_com_venta_detalles[0], db);
        }
        return db.commitTran(_com_venta);
    }).then((_com_venta: com_venta[])=>{
        res.json(_com_venta[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};
