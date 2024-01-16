export interface sistemasEmpresaDTO {
    idSistema: number;
    codigoSistema: string;
    nombreSistema: string;
    descripcion: string;
    tipoSistema: number;
    tipoSistemaNombre: string;
    horasContratadas: number;
    esActivo: number;
}
export interface sistemas {
    id: number;
    codigoSistema: string;
    nombreSistema: string;
    descripcion: string;
    tipoSistema: number;
    //intervaloAtencion: number;
    esActivo: number;
}
export interface empresaSistema{
    id: number;
        idEmpresa: number;
        idSistema: number;
        horasContratadas: number;
        intervaloAtencion: number;
}
export interface empresaSistemas {
    id: number;
    idEmpresa: number;
    idSistema: number;
    horasContratadas: number;
    intervaloAtencion: number;
}
export interface empresaSistemaRequestDTO{
    sistema:sistemas;
    empresaSistema: empresaSistemas;
}

export interface empresaANS {
    id: number;
    idEmpresa: number;
    idTipoIncidencia: number;
    tiempoMaximoAtencion: number;
    usuarioNotificación: number;
    esActivo: number;
}
export interface ANSList{
    Empresa:string;
    TipoIncidencia:string;
    Usuario:string;
    tiempoMaximoAtencion: number;
}
export interface horarioEmpresaListDTO {
    idHorario: number;
    dias: Dia[];
    fechaInicio: Date;
    fechaFin: Date;
}
export interface Dia {
    dia: string;
    checked: boolean;
}
export interface HoraInicio {
}

export interface HoraFin {
}
export interface empresaHorarios {
    id: number;
    idEmpresa: number;
    diasAtencion: string;
    fechaInicio: Date;
    horaInicio: HoraInicio;
    fechaFin: Date;
    horaFin: HoraFin;
    esActivo: number;
}
export interface sistemasByIdUsuario {
    idSist:number;
    id:number;
    codigoSistema: string;
    nombreSistema: string;
    descripcion: string;
    horasContratadas: number;
    numeroRUC: string;
    razonSocial: string;
}
export interface sistemasPorAsignarUsuario {
    idEmpSist: number;
    codigoSistema: string;
    nombreSistema: string;
    descripcion: string;
    tipoSistema: string;
    razonSocial: string;
}
export interface empresaSistemaUsuarios {
    id: number;
    idEmpresaSistemas: number;
    idUsuario: number;
    idNivelSoporte:number;
    esActivo: number;
}