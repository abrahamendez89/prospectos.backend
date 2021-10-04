import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class com_venta_detalle{
	idcom_venta_detalle:Number = 0;
	idcom_venta:Number = 0;
	d_cantidad:Number = 0.0;
	d_subtotal:Number = 0.0;

}
export function com_venta_detalleConsultaTodos(db:MySQLDB){
    console.log("Entity.com_venta_detalle.com_venta_detalleConsultaTodos()");
    return db.query("select * from com_venta_detalle",[]);
}
export function com_venta_detalleConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.com_venta_detalle.com_venta_detalleConsultaPorID()");
    return db.query("select * from com_venta_detalle where idcom_venta_detalle = ?", id);
}
export function com_venta_detalleGuardar(_com_venta_detalle:com_venta_detalle, db:MySQLDB){
    console.log("Entity.com_venta_detalle.com_venta_detalleGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_com_venta_detalle.idcom_venta_detalle && _com_venta_detalle.idcom_venta_detalle != 0)
    {
        query = "update com_venta_detalle set ? where idcom_venta_detalle = "+_com_venta_detalle.idcom_venta_detalle;
        id = _com_venta_detalle.idcom_venta_detalle;    
    }
    else
    {
        query = "insert into com_venta_detalle set ?", _com_venta_detalle;
    }

    return db.query(query, _com_venta_detalle).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return com_venta_detalleConsultaPorID(id, db);
    });
}
