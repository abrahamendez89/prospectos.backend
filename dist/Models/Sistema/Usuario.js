export default class Usuario {
    constructor(usuario, contrasena, fechaRegistro) {
        this.Usuario = usuario;
        this.Contrasena = contrasena;
        this.FechaRegistro = fechaRegistro;
    }
    toSQL() {
        return "";
    }
}
