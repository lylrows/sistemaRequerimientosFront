import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { environment } from 'src/environments/environment';
import { incidenciaArchivo, incidenciaComentario, incidenciaObj, objectTag } from 'src/app/system-models/incidencia';
@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  
  
  private readonly API_URL = 'assets/data/teachers.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  Incidenciadetalle: any;
 
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllTeacherss(): void {
  //   this.subs.sink = this.httpClient.get<Teachers[]>(this.API_URL).subscribe(
  //     (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       //////////console.log(error.name + ' ' + error.message);
  //     }
  //   );
  // }
  getAllSolutions(): void {
      this.subs.sink = this.httpClient.get<any>(`${environment.api}/incidenciaSolucion/getIncidenciaSolucionesByFilter`).subscribe(
             (data) => {
              //////////console.log("??",data)
               this.isTblLoading = false;
               this.dataChange.next(data.objModel);
             },
             (error: HttpErrorResponse) => {
               this.isTblLoading = false;
               //////////console.log(error.name + ' ' + error.message);
             }
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
  updateincidenciaTipifica(obj: incidenciaObj) : Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidencias/updateincidenciaTipifica/`, obj)
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
  addTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteTeachers(id: number): void {
    //////////console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  obtenerLista(listTag: objectTag[]) {
    return this.httpClient
        .post<ResponseDTO>(`${environment.api}/incidenciaSolucion/getIncidenciaSolucionesByTagFilter`,listTag)
        .pipe(
          map((response) => {       
            return response;
          })
        );
  }
  getSolutionById(id: number) {
    return this.httpClient
    .get<any>(`${environment.api}/incidenciaSolucion/getSolutionById/`+ id)
    .pipe(
      map((response) => {       
        return response
      })
    );
  }
  getSolutionImg(idSolucion: number) {
    return this.httpClient
    .get<any>(`${environment.api}/incidenciaSolucion/getSolutionImg/`+ idSolucion)
    .pipe(
      map((response) => {       
        return response
      })
    );
  }
}
