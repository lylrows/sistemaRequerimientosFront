export interface pedidos {
    id: number;
    titulo: string;
    emailCopyList: string;
    descripcion: string;
    inicioVigencia: string;
    idEstado:number;
    idCuenta:number;
    idMovimiento:number;
    fichaTecnica: string;
    tramaDatos: string;
    cartaNoSiniestro: string;
    documentosAdicionales: string;
    ordenesServicio: string;
    idUsuarioRegistro: number;
    fechaRegistro: Date;
    idUsuarioAtendido: number;
    fechaAtencion: Date;
    esActivo: number;
  }
  export interface pedidosArchivos {
    id: number;
    idPedido: number;
    idUsuario: number;
    urlArchivo: string;
    nombreArchivo: string;
}
export interface aprobacionCorreo {
  id:number;
  titulo: string;
  emailToList: string[];
  comentario: string;
}


export interface pedidosRespuesta{
  id: number;
  idPedido: number;
  titulo: string;
  comentario: string;
}