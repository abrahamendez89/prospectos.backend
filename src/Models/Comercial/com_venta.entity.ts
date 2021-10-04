import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class com_venta{
	idcom_venta:Number = 0;
	d_total:Number = 0.0;
	i_articulos:Number = 0;
	d_descuento_aplicado:Number = 0.0;
	d_subtotal:Number = 0.0;
	idcom_cliente:Number = 0;

}
export function com_ventaConsultaTodos(db:MySQLDB){
    console.log("Entity.com_venta.com_ventaConsultaTodos()");
    return db.query("select * from com_venta",[]);
}
export function com_ventaConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.com_venta.com_ventaConsultaPorID()");
    return db.query("select * from com_venta where idcom_venta = ?", id);
}
export function com_ventaGuardar(_com_venta:com_venta, db:MySQLDB){
    console.log("Entity.com_venta.com_ventaGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_com_venta.idcom_venta && _com_venta.idcom_venta != 0)
    {
        query = "update com_venta set ? where idcom_venta = "+_com_venta.idcom_venta;
        id = _com_venta.idcom_venta;    
    }
    else
    {
        query = "insert into com_venta set ?", _com_venta;
    }

    return db.query(query, _com_venta).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return com_ventaConsultaPorID(id, db);
    });
}
