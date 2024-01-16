export interface accesos {
    id: number;
    idPersona: number;
    usuario: string;
    contrasenia: string;
    intentosFallidos: number;
    fechaUltimoLogin?: any;
    codigoValidacion: number;
    estaBloqueado: boolean;
}
export interface objPersona {
    id: number;
    idPerfil: number;
    idEmpresa: number;
    nombres: string;
    apellidos: string;
    email: string;
    tipoDocumento: number;
    nroDocumento: string;
    direccion: string;
    telefono: string;
    celular: string;
    img: string;
    esActivo: number;
    primeraVez: number;
}
export interface objestado {
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
export interface dashboard{
        anho: number;
        mes: number;
        id_usuario: number;
        rol: number;
}
export interface dashboardEmp{
    anho: number;
    mes: number;
    id_empresa: number;
    rol: number;
}
export interface dashSoporte{
    id_usuario: number;
    rol: string;
}
export interface dashboardSistema{
    anho: number;
    mes: number;
    id_usuario: number;
    rol: string;
}
export interface dashboardAns{
    idEmpresa: number;
    fechaInicio: Date;
    fechaFin: Date;
}
export interface dashboardPendiente{
    anio: number;
    mes: number;
    idTipificacion: string;
    id_usuario: number;
    rol: number;
}
export interface dashboardPendienteGerente{
    anio: number;
    mes: number;
    idTipificacion: string;
    id_empresa: number;
    id_rol: number;
}
export interface fecha{
    fechaInicio: Date | string;
    fechaFin : Date | string;
 }
 export interface fechaNombre{
    fechaInicio: Date | string;
    fechaFin : Date | string;
    nombre: any;
 }
 export interface fechaNombreobj{
    rango: Date | string;
    nombre: any;
    cantidad: any;
 }
 export interface seriesBar{
    name: string;
    type: string;
    data: any;
    markLine: any;
 }
 export interface tipif{
    value: number;
    text: string;
 }
//  export interface datum {
//     type: string;
// }

// export interface markLine {
//     data: datum[];
// }

export interface series {
    name: string;
    type: string;
    data: number[];
    //markLine: markLine;
}