export interface reporteIncidenciaDTO {
    fechaInicial: string;
    fechaFinal: string;
    idEmpresa: number;
}
export interface reporteIncidenciaResponseDTO {
    idTicket: number;
    solicitante: string;
    fechaRegistro: string;
    tituloTicket: string;
    estado: string;
    razonSocial: string;
    sistema: string;
    prioridad: string;
    responsable: string;
    fechaAtencion: string;
}