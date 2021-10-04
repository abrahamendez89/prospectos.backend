"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accesos = void 0;
const acceso_entity_1 = require("./Models/Sistema/acceso.entity");
const MySQLDB_1 = __importDefault(require("./DBUtils/MySQLDB"));
class Accesos {
    Evaluar(rol, api, metodo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Accesos.Evaluar()");
            let db = new MySQLDB_1.default();
            let apiSplit = api.split('/');
            let apiTransformada = '';
            if (apiSplit.length > 2) {
                apiTransformada = '/' + apiSplit[1] + '/';
            }
            else {
                apiTransformada = api;
            }
            let respuesta = yield db.open().then(() => {
                return (0, acceso_entity_1.accesoConsultaValoresActivos)(rol, apiTransformada, metodo, db);
            }).then((acceso) => {
                db.close();
                if (acceso != undefined && acceso[0] != undefined) {
                    if (apiTransformada == acceso[0].acceso_api.toString()) {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }).catch((error) => {
                console.log("Entro en el catch de errores");
                throw error;
            });
            return respuesta;
        });
    }
}
exports.Accesos = Accesos;
