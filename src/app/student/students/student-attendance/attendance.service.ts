import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { StudentAttendance } from './student-attendance.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { reporteIncidenciaDTO } from '../../../system-models/reportes'
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { D, END } from '@angular/cdk/keycodes';
@Injectable()
export class StudentAttendanceService extends UnsubscribeOnDestroyAdapter {  
  private readonly API_URL = 'assets/data/student-attendance.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<StudentAttendance[]> = new BehaviorSubject<
    StudentAttendance[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  public fechaInicio: Date =  new Date();
  public fechaFin: Date =  new Date();
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): StudentAttendance[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStudentAttendances(form : any): void {   
    const fechaInicioText = new Date(form.fechaInicio).toLocaleDateString('en-EN', { year: 'numeric', month: '2-digit', day: '2-digit' }).substring(0, 11);
    const fechaFinText = new Date(form.fechaFin).toLocaleDateString('en-EN', { year: 'numeric', month: '2-digit', day: '2-digit' }).substring(0, 11);
    //console.log("form", form)
    let reporteReqDTO:reporteIncidenciaDTO = {
      fechaInicial: fechaInicioText,
      fechaFinal: fechaFinText,
      idEmpresa: form.idEmpresa
    }
    this.subs.sink = this.httpClient
      .post<ResponseDTO>(`${environment.api}/incidencias/getReporteIncidenciasByFechas`, reporteReqDTO)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.objModel);
          //console.log("data", data.objModel)
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          //////////console.log(error.name + ' ' + error.message);
        }
      );
  }
  getComentarios(id: number) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaComentarios/getComentariosByIdincidencia/`+id)
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
  
  addStudentAttendance(studentAttendance: StudentAttendance): void {
    this.dialogData = studentAttendance;

    /*  this.httpClient.post(this.API_URL, studentAttendance).subscribe(data => {
      this.dialogData = studentAttendance;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateStudentAttendance(studentAttendance: StudentAttendance): void {
    this.dialogData = studentAttendance;

    /* this.httpClient.put(this.API_URL + studentAttendance.id, studentAttendance).subscribe(data => {
      this.dialogData = studentAttendance;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteStudentAttendance(id: number): void {
    //////////console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
