export class Department {
  id: number;
  tipoEmpresa: number;
  tipoServicio: number;
  servicio:string;
  numeroRUC: string;
  razonSocial: string;
  direccion: string;
  urlWeb: string;
  nombreContacto: string;
  emailContacto: string;
  observacion: string;
  esActivo: number;
  constructor(department) {
    {
      this.id = department.id ||0;
      this.tipoEmpresa = department.tipoEmpresa || 0;
      this.tipoServicio = department.hod || 0;
      this.numeroRUC = department.phone || '';
      this.razonSocial = department.email || '';
      this.urlWeb = department.sYear || '';
      this.nombreContacto = department.sCapacity || '';
      this.emailContacto = department.sCapacity || '';
      this.observacion = department.sCapacity || '';
      this.esActivo = department.sCapacity || 0;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
