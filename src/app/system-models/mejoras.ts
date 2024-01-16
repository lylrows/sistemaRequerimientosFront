export interface mejoraComplete {
    id: number;
    nombreSistema: string;
    idSistema: number;
    idTipo: number;
    tipoMejora: string;
    prioridad: number;
    usuarioRegistro: string;
    usuarioAsignado: string;
    titulo: string;
    descripcion: string;
    horasEstimadas: number;
    horasConsumidas: number;
    fechaRegistro: Date;
    fechaAtencion: Date;
    usuarioCliente: string;
    estadoMejora: string;
    valorEstado: number;
    solucion: string;
    comentario: string;
    usuarioActualiza?: any;
    fechaActualiza: Date;
    esActivo: number;
    empresa: string;
    idEmpresa: number;
    aprobado: number;
    idUsuarioRegistro: number;
}
export interface mejoraGridListDTO {
    idMejora: number;
    nombreSistema: string;
    tipoMejora: string;
    titulo: string;
    usuarioAsignado: string;
    fechaRegistro: Date;
    usuarioCliente?: any;
    estadoMejora: string;
    usuarioRegistro: string;
}
export interface tagsIncidenciaDTO {
    idIncidencia: number;
    incidenciaNombre: string;
    ticketId: number;
    tagIds: number[];
    tagNames: string[];
    solucionRaiz: number;
    soporte: string;
    cliente: string;
    sistema: string;
    fechaRegistro: Date;
}

export interface Mejora {
    id: number;
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
    fechaAtencion?: any;
    idUsuarioCliente: number;
    idEstado: number;
    solucion?: any;
    comentario: string;
    idUsuarioActualiza: number;
    fechaActualiza?: any;
    esActivo: number;
    idEmpresa: number;
    aprobado: number;
}

export interface filterData {
    idUser:number;
    fechaInicio: string;
    fechaFin: string;
    idEmpresa: number;
    estados: number[];
  }
  

export interface MejoraArchivo {
    id: number;
    idMejora: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
    fechaRegistro: Date;
}

export interface MejoraActividades {
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

export interface mejoraDTO {
    mejora: Mejora;
    mejoraArchivos: MejoraArchivo[];
    mejoraActividades: MejoraActividades[];
}