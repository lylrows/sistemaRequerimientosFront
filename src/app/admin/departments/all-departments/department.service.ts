import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Department } from './department.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { ResponseDTO } from 'src/app/system-models/responseApi';
@Injectable()
export class DepartmentService extends UnsubscribeOnDestroyAdapter {
   
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  tiposServicios: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Department[] {
    return this.dataChange.value;
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

     this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
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
