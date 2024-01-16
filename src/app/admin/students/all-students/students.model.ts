import { formatDate } from '@angular/common';
export class Students {
  id: number;
  idUsuarioRegistro: number;
  nombre: string;
  fechaRegistro: Date=new Date();
  idPrioridad: number;
  idEstado: number;
  fechaAtencion: Date;
  esActivo: number;
  constructor(students) {
    {
      this.id = students.id || 0;//this.getRandomID();
      this.idUsuarioRegistro = students.idUsuarioRegistro || 0;
      this.nombre = students.nombre || '';
      this.fechaRegistro = students.fechaRegistro || '';
      //this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.idPrioridad = students.idPrioridad || 0;
      this.idEstado = students.idEstado || 0;
      this.fechaAtencion = students.fechaAtencion || '';
      this.esActivo = students.esActivo || 0;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
