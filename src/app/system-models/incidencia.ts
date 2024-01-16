export interface incidencia {
    id: number;
    idUsuarioRegistro: number;
    idTipoIncidencia: number;
    nombre: string;
    fechaRegistro: Date;
    idPrioridad: number;//
    idEstado: number;
    fechaAtencion: Date;
    esActivo: number;
    archivoList:incidenciaArchivo[];
    comentarioList: incidenciaComentario[];
    solucionIncidencia: incidenciaSolucion[];

}
export interface incidenciaArchivo{
    id: number;
    idIncidencia: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
    fechaRegistro: Date;
    img: string;
}
export interface dashSoporteReporte{
    idUsuarioAsignado: number;
    mesInicio: number;
    mesFin: number;
}

export interface incidenciaComentario{
    id:number;
    idIncidencia: number;
    idUsuario: number;
    comentario: string;
    fechaRegistro: Date;
}
export interface incidenciaSolucion {
    id: number;
    idIncidencia: number;    
    tipoSolucion: number;
    solucion: string;
    comentarios: string;   
}
export interface incidenciaSolucionPalabrasClave{
    id: number;
    idIncidenciaSolucion: number;
    palabraClave: string;
    
}
export interface incidenciaSolucionArchivos{
    id: number;
    idIncidenciaSolucion: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
}
export interface incidenciaObj {
    id: number;
    idTicket: number;
    idEmpSist: number;
    idUsuarioRegistro: number;
    idTipoIncidencia: number;
    idSubtipoIncidencia: number;
    idTipificacion: number;
    nombre: string;
    fechaRegistro: Date | string;
    idPrioridad: number;
    idEstado: number;
    fechaAtencion: Date;
    calificacionIncidente: number;
    cumplioANS: number;
    horasEstimadas: number;
    horasEjecutadas: number;
    idUsuarioActualiza: number;
    fechaActualiza: Date | string;
    esActivo: number;
}
export interface incidenciaObjprueba {
    id: number;
    idEmpSist: number;
    idUsuarioRegistro: number;
    idTipoIncidencia: number;
    idSubtipoIncidencia: number;
    idTipificacion:number;
    nombre: string;
    fechaRegistro: Date;
    idPrioridad: number;
    idEstado: number;
    idSistema: number,
    fechaAtencion: Date;
    calificacionIncidente: number;
    cumplioANS: number;
    idUsuarioActualiza: number;
    fechaActualiza: Date;
    esActivo: number;
}
export interface usuariosAsignar {
    idUsuario: number;
    idNivelSoporte: number;
    usuario: string;
    asignado: number;
}

export interface incidenciaAsignaciones {
    id: number;
    idIncidencia: number;
    idUsuarioOrigen: number;
    idUsuaroAsignado: number;
    idUsuarioEscalar: number;
    esActivo: number;
}
export interface incidenciaAsignacionesByMejora {
    id: number;
    idMejora: number;
    idUsuariOrigen: number;
    idUsuarioAsignado: number;
    esActivo: number;
}
export interface tag {
    id: number;    
    nombre: string;    
}
export interface incidenciaOb {
    id: number;
    idEmpSist: number;
    idUsuarioRegistro: number;
    idTipoIncidencia: number;
    idSubtipoIncidencia: number;
    nombre: string;
    fechaRegistro: Date;
    idPrioridad: number;
    idEstado: number;
    fechaAtencion: Date;
    esActivo: number;
    comentario :comentarioReporte[];
}
export interface comentarioReporte {
    usuario : string;
    imgUsuario: string;
    fecha : Date;
    comentario: string;
}


export interface comentariosByIdincidenciaDTO {
    id: number;
    idIncidencia: number;
    usuario: string;
    img: string;
    comentario: string;
    fechaRegistro: Date;
}
export interface tags {
    id: number;
    nombreTag: string;
}

export interface tagsIncidencias {
    id: number;
    idTag: number;
    idIncidencia: number;
    solucionRaiz: boolean;
}

export interface objSoluciones{
    idIncidencia: number;
    idSolucion: number;
    nombreIncidencia: string;
    TipoIncidencia: string;
    Tipificacion:string;
    prioridad:string;
    solucion:string;
}
export interface objectTag {
    tag: string;
}
export interface tipificacionTipo{
    id: number;
  idEmpresa: number;
  idTipificacion: number;
}
export interface tipoTciket{
    id: number;
  idEmpresa: number;
  idTipoIncidencia: number;
}
export interface prioridadHistorial {
    id: number;
    idIncidencia: number;
    idUsuario: number;
    idPrioridadInicial: number;
    idPrioridadFinal: number;
    motivo: string;
    fechaRegistro: Date;
}

export interface PorcentajeCumplimientoDTO {
    mesNumero: number;
    mes: string;
    anio: number;
    numeroTickets: number;
    cumplenANS: number;
    noCumplenANS: number;
    descartados: number;
    porcentajeCumplimiento: number;
    empresa: string;
  }
  