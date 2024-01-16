import { formatDate } from '@angular/common';
export class StudentAttendance {
  id:number;
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
  tipificacion: string;
  tipo: string;
  horasEstimadas: string;
  horasEjecutadas: string;
  TiempoEmpleado: string;
  ans:string;
  constructor(studentAttendance) {
    {
      this.idTicket = studentAttendance.idTicket;
      this.solicitante = studentAttendance.solicitante || '';
      this.fechaRegistro = studentAttendance.fechaRegistro || '';
      this.tituloTicket = studentAttendance.tituloTicket || '';
      this.estado = studentAttendance.estado || '';
      this.razonSocial = studentAttendance.razonSocial || '';
      this.sistema = studentAttendance.sistema || '';
      this.prioridad = studentAttendance.prioridad || '';
      this.responsable = studentAttendance.responsable || '';
      this.fechaAtencion = studentAttendance.fechaAtencion || '';
    }
  }
  
}
