import MySQLDB from "../../DBUtils/MySQLDB"
import InsertedModel from '../InsertedModel.entity';
export class Usuario{
    usuario_id:Number = 0;
    usuario_usuario:String = "";
    usuario_contrasena:String = "";
    usuario_rol:String="";
}
export function UsuarioConsultaTodos(db:MySQLDB){
    return db.query("select * from usuario",[]);
}
export function UsuarioConsultaPorID(id:Number, db:MySQLDB){
    return db.query("select * from usuario where usuario_id = ?", id);
}
export function UsuarioConsultaPorUsuario(usuario:String, db:MySQLDB){
    return db.query("select * from usuario where usuario_usuario = ?", usuario);
}
export function UsuarioGuardar(usuario:Usuario, db:MySQLDB){

    let query:String = "";
    let id:Number = 0;
    if(usuario.usuario_id && usuario.usuario_id != 0)
    {
        query = "update usuario set ? where usuario_id = "+usuario.usuario_id;
        id = usuario.usuario_id;    
    }
    else
    {
        query = "insert into usuario set ?", usuario;
    }

    return db.query(query, usuario).then((insertedModel:InsertedModel)=>{
        
        if(id == 0)
            id = insertedModel.insertId;
        return UsuarioConsultaPorID(id, db);
    });
}