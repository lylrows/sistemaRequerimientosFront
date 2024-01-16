import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Department, filterData } from './department.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { deleteObj, mejoras, mejorasArchivos } from 'src/app/system-models/deleteObj';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { Mejora, mejoraDTO } from 'src/app/system-models/mejoras';
@Injectable()
export class DepartmentService extends UnsubscribeOnDestroyAdapter {
 
  
  _mejora:Mejora={
    id: 0,
    idSistema: 0,
    idTipo: 0,
    prioridad: 0,
    idUsuarioRegistro: 0,
    idUsuarioAsignado: 0,
    titulo: '',
    descripcion: '',
    horasEstimadas: 0,
    horasConsumidas: 0,
    fechaRegistro: undefined,
    idUsuarioCliente: 0,
    idEstado: 0,
    comentario: '',
    idUsuarioActualiza: 0,
    esActivo: 0,
    idEmpresa: 0,
    aprobado: 0
  }
  public mejoraDTO: mejoraDTO={
    mejora: this._mejora,
    mejoraArchivos: [],
    mejoraActividades: []
  };
  
   
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  tiposServicios: any;
  public userId: number;
  user: any;
  Incidenciadetalle: any;
  constructor(private httpClient: HttpClient) {
    super();
    this.user= JSON.parse(localStorage.getItem('currentUser'));
  }
  get data(): Department[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getMejoraArchivo(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/MejoraArchivos/`)
    .pipe(
      map((response) => {       
        return response.objModel.filter(x=>x.idMejora == id);
      })
    );
  }
  getMejoraById(idMejora: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/Mejoras/getMejoraById/`+idMejora)
    .pipe(
      map((response) => {    
        //console.log("response", response.objModel)   
        return response;
      })
    );
  }
  UpdateMejora(mejora: Mejora) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/Mejoras/`, mejora)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getNivelSoporteById(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaAsignaciones/getNivelSoporteById/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getUsuariosByEmpresa(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/personas/getUsuariosByEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getEmpresas(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaAsignaciones/getNivelSoporteById/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  UploadPhoto(file: File, fileName: string) {
    const formData = new FormData(); 
    formData.append('file' , file);
    formData.append('fileName', fileName);
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/personas/UploadFoto/`, formData)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertMejoraArchivos(mejorasArchivos_: mejorasArchivos) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/MejoraArchivos`,mejorasArchivos_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  postMejora(mejoras_: mejoras) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/Mejoras`,mejoras_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  putMejora(mejoras_: mejoras) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/Mejoras`,mejoras_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getParameterDetail(id: number) {
    
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idParametro == id);
      })
    );
  }
  getSistemas(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasEmpresaByUser/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getSistemasByEmpresa(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasByIdEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  /** CRUD METHODS */
  getAllDepartments(): void {
    this.getTipoEmpresa(5).subscribe(res =>{
      this.tiposServicios = res;
      ////////////console.log("servi:", res)
      this.subs.sink = this.httpClient.get<any>(`${environment.api}/empresas/getEmpresaByIdUsuario/`+ this.user.id).subscribe(
        (data) => {
          this.isTblLoading = false;
          data.objModel.forEach(element => {
            element.servicio = this.tiposServicios.filter(x=> x.valorEntero== element.tipoServicio)[0].nombre;
          });
          this.dataChange.next(data.objModel.filter(x=> x.esActivo == 1));
          ////////////console.log("emoresas:", data.objModel)
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          //////////console.log(error.name + ' ' + error.message);
        }
      );
    })
    
  }
  postAllMejorasById() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.subs.sink = this.httpClient.post<any>(`${environment.api}/Mejoras/obtenerMejoraPorIdUsuario`,user.id).subscribe(
      (data) => {
        //console.log("dataSistemas", data.objModel)
        this.isTblLoading = false;
        this.dataChange.next(data.objModel);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
    );

  }
  postAllMejorasGerenteById(form : any) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let filter : filterData = {
      idUser: user.id,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      idEmpresa: form.idEmpresa,
      estados: form.estados
    }
   
    this.subs.sink = this.httpClient.post<any>(`${environment.api}/Mejoras/obtenerMejoraPorIdUsuario/`, filter).subscribe(
      (data) => {
        //console.log("dataSistemas", data.objModel)
        this.isTblLoading = false;
        this.dataChange.next(data.objModel);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
    );

  }
  addDepartment(department: Department): Observable<any> {
    this.dialogData = department;
    return this.httpClient
    .post<any>(`${environment.api}/empresas`, department)
    .pipe(
      map((response) => {       
        return response.objModel;
      })
    );
    /*  this.httpClient.post(this.API_URL, department).subscribe(data => {
      this.dialogData = department;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateDepartment(department: Department): Observable<any> {
    this.dialogData = department;
    return this.httpClient
    .put<any>(`${environment.api}/empresas`, department)
    .pipe(
      map((response) => {       
        return response.objModel;
      })
    );

    /* this.httpClient.put(this.API_URL + department.id, department).subscribe(data => {
      this.dialogData = department;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteDepartment(id: number): void {
    //////////console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  getTipoEmpresa(id: number) : Observable<any> {
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter(x => x.idParametro == id);
      })
    );
  }
  esActivo(deleteObj: deleteObj): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/esActivo`,deleteObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
}
