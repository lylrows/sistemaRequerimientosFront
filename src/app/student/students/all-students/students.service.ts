import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { environment } from 'src/environments/environment';
import { deleteObj, reporteDash } from 'src/app/system-models/deleteObj';
import { incidenciaArchivo, incidenciaComentario, incidenciaObj, incidenciaAsignaciones, incidenciaObjprueba, prioridadHistorial, dashSoporteReporte, tags, tagsIncidencias } from 'src/app/system-models/incidencia';
import { dashboard, dashboardAns, dashboardEmp, dashboardPendiente, dashboardPendienteGerente, dashboardSistema, dashSoporte } from 'src/app/system-models/acceso';
@Injectable({providedIn: 'root'})
export class StudentsService extends UnsubscribeOnDestroyAdapter {

  
  Incidenciadetalle: any;
 
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  incidencia: Students;
  
  
 
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
  getParameterDetail(id: number) {
    
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idParametro == id);
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
  getFactorRendimientoAsignado(objeto: dashSoporteReporte){
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/Incidencia_getFactorRendimientoAsignado/`,objeto)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertPrioridad(objPrioridad: prioridadHistorial) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/prioridadhistorial/`,objPrioridad)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getatencionSolicitudesByEmp( dashboardEmp_ : dashboardEmp) {
  ////console.log("dash servicio",dashboardEmp_)
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciaByTipifFechaByEmp/`,dashboardEmp_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertTag(tag: tags) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/tags`,tag)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertTagIncidencia(tagInc: tagsIncidencias) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/tagsincidencias`,tagInc)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketBySoporteGerente() {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEtapaGen/`,null)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getSemanasByEstadoGerente() {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getEstadosByUsuarioGen/`,null)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
 getTags() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tags`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTagListByIdIncidencia(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tagsincidencias/getTagListByIdIncidencia/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  deleteTagsById(idTag: number, incidenciaid: number) {
    return this.httpClient
    .delete<ResponseDTO>(`${environment.api}/tagsincidencias/`+idTag+'/'+incidenciaid)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketByEstadoGerente() {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEstadoGen/`,null)
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
  getTicketSistemaByGerente(dashboardEmp_: dashboardEmp) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasBySistemaFechaByEmp/`,dashboardEmp_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketSystem(dashSystem: dashboardSistema) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidencia_conteoHorasByIncidenciaSistema/`,dashSystem)
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
  getListTipificaciones(id: any) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tipificacionesempresa/getTipificacionByEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })  
    );
  }
  getAllStudentss(): Observable<ResponseDTO> {
    //////////console.log("si entra");
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  cambioAnsDescartado(idIncidencia: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaANS/cambioAnsDescartado/`+idIncidencia)
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
  getSistemasByEmpresa(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasByIdEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getlistSoluciones(id : number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaSolucion/getIncidenciaSolucionesByFilter/`+id)
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
  getTicketBySoporte(dashSoporte: dashSoporte) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEtapa/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  
  getCumplimientoANS(dashAns: dashboardAns) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/Incidencia_getANSByEmp/`,dashAns)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getPorcentajeCumplimiento(dashAns: dashboardAns) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getPorcentajeCumplimiento/`,dashAns)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getSemanasByEstado(dashSoporte: dashSoporte) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getEstadosByUsuario/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getTicketByEstado(dashSoporte: dashSoporte) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByEstado/`,dashSoporte)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertAsignaciones(asignacionObj: incidenciaAsignaciones): Observable<ResponseDTO> {
    return this.httpClient 
    .post<ResponseDTO>(`${environment.api}/incidenciaAsignaciones`, asignacionObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getAllIncidencias(role: string, id: number, idNivel:number) : Observable<ResponseDTO>{
    //////////console.log("que botan", role,id,idNivel);
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByRolAndUsuarioid/`+role+'/'+id+'/'+idNivel)
    .pipe(
      map((response) => {      
        return response;        
      })
    );
  }
  getTicketsGerenteSoporte(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getTicketsGerenteSoporte/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
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
  
  insertIncidencias(_incidencia: incidenciaObj): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias`,_incidencia)
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
  insertIncidenciaComentarioNotificar(_comentario: incidenciaComentario) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaComentarios/InsertNotificar`,_comentario)
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
  obtenerUsuariosParaAsignar(idIncidencia: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/obtenerUsuariosParaAsignar/`+idIncidencia)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  obtenerEmpresa() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresas/`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  obtenerSoporteGerente() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tipificacionesempresa/getSoporteByAsignacion/`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
    obtenerEmpresaCliente() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresas/`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getReporteTipif(reporteDash_: reporteDash): Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/Incidencia_getTicketHorasTable1/`, reporteDash_)
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
  getIncidencia(id: number){
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }

  // insertAsignaciones(asignacionObj: incidenciaAsignaciones): Observable<ResponseDTO> {
  //   return this.httpClient
  //   .post<ResponseDTO>(`${environment.api}/incidenciaAsignaciones`, asignacionObj)
  //   .pipe(
  //     map((response) => {       
  //       return response;
  //     })
  //   );
  // }
}
