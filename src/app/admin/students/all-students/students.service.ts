import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { environment } from 'src/environments/environment';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { incidenciaObj, incidenciaComentario, incidenciaArchivo, incidenciaAsignaciones } from 'src/app/system-models/incidencia';
@Injectable({providedIn: 'root'})
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  
  
 
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  incidencia: Students;
  Incidenciadetalle: any;
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
  getAllStudentss(): Observable<ResponseDTO> {
    //////////////console.log("si entra");
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias`)
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

  ckupload(file: File): Promise<any>{
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
    .post(`${environment.api}/configuracion/ckeditorUpload/UploadImage`,file)
    .toPromise();
  }

  getAllIncidencias(role: string, id: number, idNivel:number) : Observable<ResponseDTO>{
    //////////console.log("que botan", role,id,idNivel);
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciasByRolAndUsuarioid/`+role+'/'+id+'/'+idNivel)
    .pipe(
      map((response) => {   
        //////////console.log("??",response.objModel)    
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
  getParameterDetail(id: number) {
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idParametro == id);
      })
    );
  }
  getlistSoluciones() {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaSolucion/getIncidenciaSolucionesByFilter/`)
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
  insertAsignaciones(asignacionObj: incidenciaAsignaciones): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaAsignaciones`, asignacionObj)
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
}
