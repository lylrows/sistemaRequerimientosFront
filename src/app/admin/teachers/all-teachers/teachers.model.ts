import { formatDate } from '@angular/common';
export class Teachers {
  idIncidencia: number;
  idSolucion: number;
  nombreIncidencia: string;
  tipoIncidencia: string;
  tipificacion: string;
  prioridad: string;
  solucion: string;
  // department: string;
  // degree: string;
  constructor(teachers) {
    {
      this.idIncidencia = teachers.idIncidencia || 0;
      this.idSolucion = teachers.idSolucion || 0;
      this.nombreIncidencia = teachers.nombreIncidencia || '';
      this.tipoIncidencia = teachers.tipoIncidencia || '';
      this.tipificacion = teachers.tipificacion || '';
      this.prioridad = teachers.prioridad || '';
      this.solucion = teachers.solucion || '';
      // this.department = teachers.department || '';
      // this.degree = teachers.degree || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
