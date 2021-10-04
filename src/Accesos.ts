import {accesoConsultaValoresActivos, acceso} from './Models/Sistema/acceso.entity';
import MySQLDB from './DBUtils/MySQLDB';

export class Accesos {

    public async Evaluar(rol:String, api:String, metodo:String):Promise<boolean>{
        console.log("Accesos.Evaluar()");
        let db = new MySQLDB();
        let apiSplit = api.split('/');
        let apiTransformada:String = '';
        if(apiSplit.length > 2){
            apiTransformada = '/'+apiSplit[1]+'/';
        }else{
            apiTransformada = api;
        }

        let respuesta = await db.open().then(()=>{
            return accesoConsultaValoresActivos(rol,apiTransformada,metodo, db);
        }).then((acceso:acceso[])=>{
            db.close();
            if(acceso != undefined && acceso[0] != undefined ){
                if(apiTransformada == acceso[0].acceso_api.toString()){
                    return true;
                }
            }
            else
            {
                return false;
            }
            
        }).catch((error:any)=>{
            console.log("Entro en el catch de errores");
            throw error;
        });
        return respuesta;
    }
}