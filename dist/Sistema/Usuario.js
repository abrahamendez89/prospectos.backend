import Entidad from '../Entidad';
export default class Usuario extends Entidad {
    constructor(usuario, contrasena, fechaRegistro) {
        super();
        this.Usuario = usuario;
        this.Contrasena = contrasena;
        this.FechaRegistro = fechaRegistro;
    }
    toSQL() {
        return "";
    }
}
