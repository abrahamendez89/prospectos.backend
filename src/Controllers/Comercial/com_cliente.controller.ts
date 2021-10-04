import {com_cliente, com_clienteGuardar, com_clienteConsultaPorID, com_clienteConsultaTodos } from '../../Models/Comercial/com_cliente.entity';
import MySQLDB from '../../DBUtils/MySQLDB';

function SetController(app:any){
    console.log("Controller.com_clientes.SetController()");
    app.route('/com_cliente').get(getcom_clientes);
    app.route('/com_cliente/:id').get(getcom_clienteId);
    app.route('/com_cliente').post(postcom_cliente);
}

function getcom_clientes(req:any, res:any){
    console.log("Controller.com_clientes.getcom_clientes()");
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_clienteConsultaTodos(db);
    }).then((_com_cliente:com_cliente[])=>{
        res.json(_com_cliente);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function getcom_clienteId(req:any, res:any){
    console.log("Controller.com_clientes.getcom_clienteId()");
    let id = req.params.id;
    let db = new MySQLDB();
    db.open().then(()=>{
        return com_clienteConsultaPorID(id, db);
    }).then((_com_cliente:com_cliente[])=>{
        res.json(_com_cliente[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

function postcom_cliente(req:any, res:any){
    console.log("Controller.com_clientes.postcom_cliente()");
    let db = new MySQLDB();

    let _com_cliente:com_cliente = req.body;

    db.open().then(()=>{
        return db.beginTran();  
    }).then(()=>{
        return com_clienteGuardar(_com_cliente,db);
    }).then((_com_cliente:com_cliente[])=>{
        return db.commitTran(_com_cliente);
    }).then((_com_cliente: com_cliente[])=>{
        res.json(_com_cliente[0]);
        return db.close();
    }).catch((error:any)=>{
        console.log("Entro en el catch de errores");
        res.json(error);
    });
}

export = { SetController: SetController};
