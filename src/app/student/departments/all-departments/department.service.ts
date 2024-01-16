import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Department } from './department.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { deleteObj, mejoras, mejorasArchivos } from 'src/app/system-models/deleteObj';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { incidenciaAsignaciones, incidenciaAsignacionesByMejora } from 'src/app/system-models/incidencia';
import { Mejora, mejoraComplete, mejoraDTO, filterData, tagsIncidenciaDTO } from 'src/app/system-models/mejoras'
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
  getReportIncidencias() {
    throw new Error('Method not implemented.');
  }
  
  
  
  
  
   
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  dataChangeTag: BehaviorSubject<tagsIncidenciaDTO[]> = new BehaviorSubject<tagsIncidenciaDTO[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  tiposServicios: any;
  Incidenciadetalle: mejoraComplete = {
    id: 0,
    nombreSistema: '',
    idSistema: 0,
    idTipo: 0,
    tipoMejora: '',
    prioridad: 0,
    usuarioRegistro: '',
    usuarioAsignado: '',
    titulo: '',
    descripcion: '',
    horasEstimadas: 0,
    horasConsumidas: 0,
    fechaRegistro: new Date(),
    fechaAtencion: new Date(),
    usuarioCliente: '',
    estadoMejora: '',
    valorEstado: 1,
    solucion: '',
    comentario: '',
    fechaActualiza: new Date(),
    esActivo: 0,
    empresa: '',
    idEmpresa: 0,
    aprobado: 0,
    idUsuarioRegistro: 0
  };
  public fechaInicio: Date;
  public fechaFin: Date;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Department[] {
    return this.dataChange.value;
  }
  get dataTag(): tagsIncidenciaDTO[] {
    return this.dataChangeTag.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDepartments(): void {
    this.getTipoEmpresa(5).subscribe(res =>{
      this.tiposServicios = res;
      ////////////console.log("servi:", res)
      this.subs.sink = this.httpClient.get<any>(`${environment.api}/empresas`).subscribe(
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
  getAllMejoras() {
    this.subs.sink = this.httpClient.get<any>(`${environment.api}/Mejoras`).subscribe(
      (data) => {
        ////////////console.log("dataSistemas", data.objModel)
        this.isTblLoading = false;
        this.dataChange.next(data.objModel);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
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
getUsuariosByEmpresa(id: number) {
  return this.httpClient
  .get<ResponseDTO>(`${environment.api}/personas/getUsuariosByEmpresa/`+id)
  .pipe(
    map((response) => {       
      return response;
    })
  );
}
  postAllMejorasById(form : any) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let filter : filterData = {
      idUser: user.id,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      idEmpresa: form.idEmpresa,
      estados: form.estados
    }
    //console.log("endpoint", form)
    this.subs.sink = this.httpClient.post<any>(`${environment.api}/Mejoras/obtenerMejoraPorIdUsuario/`, filter).subscribe(
      (data) => {
        console.log("mejoraGridListDTO", data.objModel)
        this.isTblLoading = false;
        this.dataChange.next(data.objModel);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
    );

  }
  postAllTagIncidencias(filterForm: any) {
    let filterDataMejorasDTO = {
      fechaInicio: filterForm.fechaInicio,
      fechaFin: filterForm.fechaFin,
      idEmpresa: filterForm.idEmpresa,
      solucionRaiz:filterForm.solucionRaiz

    }
    this.subs.sink = this.httpClient.post<any>(`${environment.api}/tagsincidencias/getTagsByIncidencias/`, filterDataMejorasDTO).subscribe(
      (data) => {
        console.log("dataChangeTag", data.objModel)
        this.isTblLoading = false;
        this.dataChangeTag.next(data.objModel);

      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
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
  getTicketsAsosciados(filter: { idEmpresa: number; idSistema: number; }) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/Mejoras/getTicketsAsosciados/`, filter)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getMejoraById(idMejora: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/Mejoras/getMejoraById/`+idMejora)
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
  obtenerUsuariosParaAsignarByMejora(idMejora: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/Mejoras/obtenerUsuariosParaAsignarByMejora/`+idMejora)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  deleteAsignacion(asignacionObj: incidenciaAsignacionesByMejora) {
    return this.httpClient
    .delete<ResponseDTO>(`${environment.api}/MejoraAsignaciones/`+ asignacionObj.idMejora)
    .pipe(
      map((response) => {       
        return response;
      })
    );    
  }
  insertAsignacionesByMejora(asignacionObj: incidenciaAsignacionesByMejora): Observable<ResponseDTO> {    
    return this.httpClient 
    .post<ResponseDTO>(`${environment.api}/MejoraAsignaciones`, asignacionObj)
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
  
  getMejoraArchivo(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/MejoraArchivos/`)
    .pipe(
      map((response) => {       
        return response.objModel.filter(x=>x.idMejora == id);
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
  getNivelSoporteById(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaAsignaciones/getNivelSoporteById/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
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
  putMejora(mejoras_: mejoras) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/Mejoras`,mejoras_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
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
  postMejora(mejoras_: mejoras) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/Mejoras`,mejoras_)
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
}
