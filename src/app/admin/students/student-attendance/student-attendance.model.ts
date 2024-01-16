import { formatDate } from '@angular/common';
export class StudentAttendance {
  id: number;
  img: string;
  rollNo: string;
  sName: string;
  class: string;
  date: string;
  status: string;
  note: string;
  Empresa: string;
  Sistema: string;
  Rango_Fecha: string;
  Usuario: string;
  constructor(studentAttendance) {
    {
      this.id = studentAttendance.id || 0;
      this.img = studentAttendance.img || 'assets/images/user/user1.jpg';
      this.rollNo = studentAttendance.rollNo || '';
      this.sName = studentAttendance.sName || '';
      this.class = studentAttendance.class || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.status = studentAttendance.status || '';
      this.note = studentAttendance.note || '';
    }
  }
  // public getRandomID(): string {
  //   const S4 = () => {
  //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  //   };
  //   return S4() + S4();
  // }
}
