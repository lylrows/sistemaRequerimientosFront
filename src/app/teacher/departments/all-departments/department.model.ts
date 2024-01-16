export class Department {
  id_mejora: number;
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
    solucion: string;
    comentario: string;
    idUsuarioActualiza: number;
    fechaActualiza: Date;
    esActivo: number;
  constructor(department) {
    {
      this.id_mejora = department.id_mejora ||0;
      this.idSistema = department.idSistema ||0;
      this.idTipo = department.idTipo || 0;
      this.prioridad = department.prioridad || 0;
      this.idUsuarioRegistro = department.idUsuarioRegistro || 0;
      this.idUsuarioAsignado = department.idUsuarioAsignado || 0;
      this.titulo = department.titulo || '';
      this.descripcion = department.descripcion || '';
      this.horasEstimadas = department.horasEstimadas || 0;
      this.horasConsumidas = department.horasConsumidas || 0;
      this.fechaRegistro = department.fechaRegistro || new Date();
      this.fechaAtencion = department.fechaAtencion || new Date();
      this.idUsuarioCliente = department.idUsuarioCliente || 0;
      this.idEstado = department.idEstado || 0;
      this.solucion = department.solucion || '';
      this.comentario = department.comentario || '';
      this.idUsuarioActualiza = department.idUsuarioActualiza || 0;
      this.fechaActualiza = department.fechaActualiza || new Date();
      this.esActivo = department.esActivo || 0;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}

export interface filterData {
  idUser:number;
  fechaInicio: string;
  fechaFin: string;
  idEmpresa: number;
  estados: number[];
}
