import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
import { documento } from "./documento.entity";
export class prospecto{
	prospecto_id:Number = 0;
	prospecto_nombre:String = "";
	prospecto_appaterno:String = "";
	prospecto_apmaterno:String = "";
	prospecto_calle:String = "";
	prospecto_numero:String = "";
	prospecto_colonia:String = "";
	prospecto_cod_postal:String = "";
	prospecto_tel:String = "";
	prospecto_RFC:String = "";
	prospecto_estatus:String = "";
}
export function prospectoConsultaTodos(db:MySQLDB){
    console.log("Entity.prospecto.prospectoConsultaTodos()");
    return db.query("select * from prospecto",[]);
}
export function prospectoConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.prospecto.prospectoConsultaPorID()");
    return db.query("select * from prospecto where prospecto_id = ?", id);
}
export function prospectoGuardar(_prospecto:prospecto, db:MySQLDB){
    console.log("Entity.prospecto.prospectoGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_prospecto.prospecto_id && _prospecto.prospecto_id != 0)
    {
        query = "update prospecto set ? where prospecto_id = "+_prospecto.prospecto_id;
        id = _prospecto.prospecto_id;    
    }
    else
    {
        query = "insert into prospecto set ?", _prospecto;
    }

    return db.query(query, _prospecto).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return prospectoConsultaPorID(id, db);
    });
}
