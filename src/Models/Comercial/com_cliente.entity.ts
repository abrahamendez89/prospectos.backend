import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class com_cliente{
	idcom_cliente:Number = 0;
	s_nombres:String = "";
	s_apellido_paterno:String = "";
	s_apellido_materno:String = "";

}
export function com_clienteConsultaTodos(db:MySQLDB){
    console.log("Entity.com_cliente.com_clienteConsultaTodos()");
    return db.query("select * from com_cliente",[]);
}
export function com_clienteConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.com_cliente.com_clienteConsultaPorID()");
    return db.query("select * from com_cliente where idcom_cliente = ?", id);
}
export function com_clienteGuardar(_com_cliente:com_cliente, db:MySQLDB){
    console.log("Entity.com_cliente.com_clienteGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_com_cliente.idcom_cliente && _com_cliente.idcom_cliente != 0)
    {
        query = "update com_cliente set ? where idcom_cliente = "+_com_cliente.idcom_cliente;
        id = _com_cliente.idcom_cliente;    
    }
    else
    {
        query = "insert into com_cliente set ?", _com_cliente;
    }

    return db.query(query, _com_cliente).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return com_clienteConsultaPorID(id, db);
    });
}
