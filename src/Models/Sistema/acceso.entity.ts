import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class acceso{
	acceso_id:Number = 0;
	acceso_rol:String = "";
	acceso_api:String = "";
	acceso_metodo:String = "";
    acceso_activo:Number = 0;

}
export function accesoConsultaTodos(db:MySQLDB){
    console.log("Entity.acceso.accesoConsultaTodos()");
    return db.query("select * from acceso",[]);
}
export function accesoConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.acceso.accesoConsultaPorID()");
    return db.query("select * from acceso where acceso_id = ?", id);
}
export function accesoConsultaValoresActivos(rol:String, api:String, metodo:String, db:MySQLDB){
    console.log("Entity.acceso.accesoConsultaPorID()");
    return db.query("select * from acceso where acceso_rol = ? and acceso_api = ? and acceso_metodo = ? and acceso_activo = 1", [rol, api, metodo]);
}
export function accesoGuardar(_acceso:acceso, db:MySQLDB){
    console.log("Entity.acceso.accesoGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_acceso.acceso_id && _acceso.acceso_id != 0)
    {
        query = "update acceso set ? where acceso_id = "+_acceso.acceso_id;
        id = _acceso.acceso_id;    
    }
    else
    {
        query = "insert into acceso set ?", _acceso;
    }

    return db.query(query, _acceso).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return accesoConsultaPorID(id, db);
    });
}
