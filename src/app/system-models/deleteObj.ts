import * as internal from "stream";

export interface deleteObj {
    id: number;
    valor: number;
    tabla: string;
}
export interface generete{
    idEmpresa: number;
    razonSocial: string;
}
export interface reporteDash{
    idEmpresa: number;
        mesInicio: number;
        mesFin: number;
        anio: number;
}

export interface mejoras{
    id: number;
    idMejora: number;
    idSistema: number;
    idTipo: number;
    prioridad: number;
    idUsuarioRegistro: number;
    idUsuarioAsignado: number;
    titulo: string;
    descripcion: string;
    horasEstimadas: number;
    horasConsumidas: number;
    fechaRegistro: Date;
    fechaAtencion: Date;
    idUsuarioCliente: number;
    idEstado: number;
    comentario: string;
    idUsuarioActualiza: number;
    fechaActualiza: Date;
    esActivo: number;
    idEmpresa: number;
}
export interface mejorasArchivos{
    id: number;
    idMejora: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
    fechaRegistro: Date;
}
export interface RegistroActividades{
    id: number;
        idMejora: number;
        horasActividad: number;
        descripcion: string;
        idUsuarioRegistro: number;
        fechaActividad: Date;
        idUsuarioActualiza: number;
        fechaActualiza: Date;
        esActivo: number;
}
