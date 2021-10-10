import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class documento{
	documento_id:Number = 0;
	prospecto_id:Number = 0;
	documento_nombre_documento:String = "";
    documento_data_base64:String = "";

}
export function documentoConsultaTodos(db:MySQLDB){
    console.log("Entity.documento.documentoConsultaTodos()");
    return db.query("select * from documento",[]);
}
export function documentoConsultaPorID(id:Number, db:MySQLDB){
    console.log("Entity.documento.documentoConsultaPorID()");
    return db.query("select * from documento where documento_id = ?", id);
}
export function documentoConsultaPorIDProspecto(id:Number, db:MySQLDB){
    console.log("Entity.documento.documentoConsultaPorIDProspecto()");
    return db.query("select documento_id, prospecto_id, documento_nombre_documento from documento where prospecto_id = ?", id);
}
export function documentoGuardar(_documento:documento, db:MySQLDB){
    console.log("Entity.documento.documentoGuardar()");
    let query:String = "";
    let id:Number = 0;
    if(_documento.documento_id && _documento.documento_id != 0)
    {
        query = "update documento set ? where documento_id = "+_documento.documento_id;
        id = _documento.documento_id;    
    }
    else
    {
        query = "insert into documento set ?", _documento;
    }

    return db.query(query, _documento).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return documentoConsultaPorID(id, db);
    });
}
