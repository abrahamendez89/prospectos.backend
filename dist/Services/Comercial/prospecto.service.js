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
exports.Prospectos = void 0;
const prospecto_entity_1 = require("../../Models/Comercial/prospecto.entity");
const MySQLDB_1 = __importDefault(require("../../DBUtils/MySQLDB"));
class Prospectos {
    static getprospectos() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Service.prospectos.getprospectos()");
            let db = new MySQLDB_1.default();
            yield db.open().then(() => {
                return (0, prospecto_entity_1.prospectoConsultaTodos)(db);
            }).then((_prospecto) => {
                db.close();
                return _prospecto;
            }).catch((error) => {
                console.log("Entro en el catch de errores");
                return error;
            });
            console.log("salio");
        });
    }
}
exports.Prospectos = Prospectos;
