export interface parametro {
    id: number;
    codigo: string;
    nombre: string;
    esActivo: number;
}
export interface parametroDetalle {
    id: number;
    idParametro: number;
    codigo: string;
    nombre: string;
    valor: string;
    valorEntero: number;
    valorAuxiliar: string;
    idParametroPadre: number;
    esActivo: number;
}