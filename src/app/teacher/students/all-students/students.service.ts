import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { environment } from 'src/environments/environment';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { incidenciaObj, incidenciaComentario, incidenciaArchivo, incidenciaAsignaciones } from 'src/app/system-models/incidencia';
import { dashboard, dashboardAns, dashboardEmp, dashboardPendiente, dashboardPendienteGerente, dashboardSistema, dashSoporte } from 'src/app/system-models/acceso';
import { aprobacionCorreo, pedidos } from 'src/app/system-models/emision';
@Injectable({providedIn: 'root'})
export class StudentsService extends UnsubscribeOnDestroyAdapter {
 
  
 
 
  
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  Incidenciadetalle: any;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  // get data(): Students[] {
  //   return this.dataChange.value;
  // }
  // getDialogData() {
  //   return this.dialogData;
  // }
  /** CRUD METHODS */
  getAllStudentss(role: string, id: number, idNivel:number): Observable<ResponseDTO> {
    //////////////console.log("si entra");
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByRolAndUsuarioid/`+role+'/'+id+'/'+idNivel)
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
  getPboUsers(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidos/getPboUsers/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  aprobacionCorreo(aprobacionCorreo: aprobacionCorreo) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/pedidos/aprobacionCorreo/`, aprobacionCorreo)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  respuestaEmision(aprobacionCorreo: aprobacionCorreo) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/pedidos/respuestaEmision/`, aprobacionCorreo)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  asignarPedido (idUsuario: number, id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidos/asignarPedido/`+ idUsuario + '/' + id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getEmissionOrdersGrid() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidos/getEmissionOrdersGrid/`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getPedidosById(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidos/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getRespuestaByIdPedido(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidosrespuesta/getByIdPedido/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  downloadPedidosArchivos(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/pedidosarchivos/getByIdPedido/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketsGerenteCliente(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getTicketsGerenteCliente/`+id)
    .pipe(
      map((response) => {       
        return response;
      }) 
    );
  }
  insertEmisionPedido(pedidosObj: pedidos, files: File[]) {
    const formData = new FormData();
    formData.append('pedidos' , JSON.stringify(pedidosObj));    
    
    files.forEach(element => {
      formData.append('files' , element);
    });
    return this.httpClient
      .post<ResponseDTO>(`${environment.api}/pedidos/insertEmisionPedido/`,formData)
      .pipe(
        map((response) => {       
          return response;
        })
      );
  }
  getatencionSolicitudesByEmp( dashboardEmp_ : dashboardEmp) {
    //console.log("dash servicio",dashboardEmp_)
      return this.httpClient
      .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciaByTipifFechaByEmp/`,dashboardEmp_)
      .pipe(
        map((response) => {       
          return response;
        })
      );
    }
  updateIncidencias(_incidencia: incidenciaObj): Observable<ResponseDTO>  {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/incidencias`,_incidencia)
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
  getListTipificaciones(id: any) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tipificacionesempresa/getTipificacionByEmpresa/`+id)
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
  getincidencias(role: string, id: number, idNivel:number): Observable<ResponseDTO> {
    //////////////console.log("si entra");
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByRolAndUsuarioid/`+role+'/'+id+'/'+idNivel)
    .pipe(
      map((response) => {       
        return response;
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
  insertIncidencias(_incidencia: incidenciaObj): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias`,_incidencia)
    .pipe(
      map((response) => {  
        return response;
      })/*,
      catchError((error: HttpErrorResponse) => {
        // Crear un objeto ResponseDTO para devolver en caso de error
        const errorResponse: ResponseDTO = {
          status: 0,
          description: error.statusText,
          objModel: error,
          token: null,
          objPaginated: null
        }
        return of(errorResponse);
      })*/
    );
  }
  
  insertIncidenciaComentario(_comentario: incidenciaComentario) {
    //////////console.log("comnetario",_comentario);
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaComentarios`,_comentario)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertIncidenciaArchivos(_incidenciaArchivo: incidenciaArchivo) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaArchivos`,_incidenciaArchivo)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketPendientes(dashGerente: dashboardPendienteGerente) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByTipifList/`,dashGerente)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getSemanasByEstadoCliente(dashSoporte: dashSoporte) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getEstadosByCliente/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getConteoPorcentaje(dashSoporte: dashSoporte){
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEtapaCliente/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getConteoByEstados(dashSoporte: dashSoporte){
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEstadoCliente/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  UploadPhotoList(files: File[], _incidenciaArchivo: incidenciaArchivo) {
    const formData = new FormData(); 
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('incidenciaArchivo', JSON.stringify(_incidenciaArchivo));

    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/personas/UploadPhotoList/`, formData)
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
  addStudents(students: Students): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias`,students)
    .pipe(
      map((response) => {       
        return response;
      })
    );

    /*  this.httpClient.post(this.API_URL, students).subscribe(data => {
      this.dialogData = students;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateStudents(students: Students) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/incidencias`,students)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  deleteStudents(id: number): void {
    //////////console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  getAllIncidencias(role: string, id: number, idNivel:number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByRolAndUsuarioid/`+role+'/'+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getDetail(id: number) : Observable<any> {
    return this.httpClient
    .get<any>(`${environment.api}/incidenciaComentarios`)
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
  updateincidenciaTipifica(obj: incidenciaObj) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/updateincidenciaTipifica/`, obj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getatencionSolicitudes( dash : dashboard) {
    //////////console.log("dash servicio",dash)
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciaByTipifFecha/`,dash)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketSystem(dashboardEmp_: dashboardEmp) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidencia_conteoHorasByIncidenciaSistema/`,dashboardEmp_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  // getTicketSystemByEmpresa(dashSystem: dashboardSistema) {
  //   return this.httpClient
  //   .post<ResponseDTO>(`${environment.api}/incidencias/getIncidencia_conteoHorasByIncidenciaSistema/`,dashSystem)
  //   .pipe(
  //     map((response) => {       
  //       return response;
  //     })
  //   );
  // }
  getCumplimientoANS(dashAns: dashboardAns) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciaANSByMonth/`,dashAns)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getatencionSolicitudesObj( dash : dashboard) {
    //////////console.log("dash servicio",dash)
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByTipifList/`,dash)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketSistema(dash: dashboard) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasBySistemaFecha/`,dash)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  
}
