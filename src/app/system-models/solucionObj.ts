export interface IncidenciaSol {
    id: number;
    idIncidencia: number;
    tipoSolucion: number;
    solucion: string;
    comentarios: string;
}

export interface LstIncidenciaSolArchivo {
    id: number;
    idIncidenciaSolucion: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
}

export interface LstIncidenciaSolPalabra {
    id: number;
    idIncidenciaSolucion: number;
    palabraClave: string;
}

export interface incidenciaObj {
    incidenciaSol: IncidenciaSol;
    lstIncidenciaSolArchivos: LstIncidenciaSolArchivo[];
    lstIncidenciaSolPalabras: LstIncidenciaSolPalabra[];
}