import { formatDate } from '@angular/common';
export class Staff {
  id: number;
  idPerfil: number;
  perfil:string;
  idEmpresa: number;
  nombres: string;
  apellidos: string;
  email: string;
  tipoDocumento: number;
  nroDocumento: number;
  direccion: string;
  telefono: number;
  celular: number;
  img: string;
  esActivo: number;
  primeraVez:number;
  isGerente:boolean;
  constructor(staff) {
    {
      this.id = staff.id ||0;
      this.idPerfil = staff.idPerfil || 0;
      this.idEmpresa = staff.idEmpresa || 0;
      this.nombres = staff.nombres || '';
      this.apellidos = staff.apellidos || '';
      this.email = staff.email || '';
      this.tipoDocumento = staff.tipoDocumento || 0;
      this.nroDocumento = staff.nroDocumento ||'';
      this.direccion = staff.direccion || '';
      this.telefono = staff.telefono || '';
      this.celular = staff.celular || '';
      this.img = staff.img || '';
      this.esActivo = staff.esActivo || 0;
      this.primeraVez = staff.primeraVez || 0;
      this.isGerente = staff.isGerente || false;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
