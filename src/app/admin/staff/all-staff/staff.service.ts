import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Staff } from './staff.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { empresaSistemaUsuarios } from 'src/app/system-models/empresaSistena';
import { accesos } from 'src/app/system-models/acceso';
@Injectable()
export class StaffService extends UnsubscribeOnDestroyAdapter {
 
  private readonly API_URL = 'assets/data/staff.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  perfiles: any;
  public dataRow: Staff;
  public imgTemp: string;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffs(): void {
    this.getPerfiles(2).subscribe(res =>{
      this.perfiles = res;
      //////////console.log("??",this.perfiles);
      this.subs.sink = this.httpClient.get<any>(`${environment.api}/personas`).subscribe(
      (data) => {
        //////////console.log("data",data.objModel)
        this.isTblLoading = false;
        data.objModel.forEach(element => {
          element.perfil = this.perfiles.filter(x=> x.valorEntero== element.idPerfil)[0].nombre;
        });
        this.dataChange.next(data.objModel.filter(x=> x.esActivo == 1));
        ////////////console.log("personas:", data.objModel)
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        //////////console.log(error.name + ' ' + error.message);
      }
    );
    })
    
  }
  getPerfiles(id: number) : Observable<any> {
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter(x => x.idParametro == id);
      })
    );
  }

  addStaff(staff: Staff): void {
    this.dialogData = staff;

    /*  this.httpClient.post(this.API_URL, staff).subscribe(data => {
      this.dialogData = staff;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateStaff(staff: Staff): void {
    this.dialogData = staff;

    /* this.httpClient.put(this.API_URL + staff.id, staff).subscribe(data => {
      this.dialogData = staff;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteStaff(id: number): void {
    //////////console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      //////////console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  getSistemasByIdUsuario(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasByIdUsuario/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  esActivo(deleteObj: deleteObj) : Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/esActivo`,deleteObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getSistemasPorAsignarByIdUsuario(id: number): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasPorAsignarByIdUsuario/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertempresaSistemaUsuarios(empresaSistemaObj: empresaSistemaUsuarios): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/empresaSistemaUsuarios`,empresaSistemaObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getParameterDetails(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idParametro == id);
      })
    );
  }
  getEmpresas() : Observable<ResponseDTO>{
    return this.httpClient
    .get<any>(`${environment.api}/empresas`)
    .pipe(
      map((response) => {       
        return response
      })
    );
  } 
  UploadPhoto(file: File, fileName: string) : Observable<ResponseDTO>{
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
  insertPersona(staff: Staff) : Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/personas/`, staff)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updatePersona(staff: Staff) : Observable<ResponseDTO>{
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/personas/`, staff)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }  
  insertAcceso (accesoObj: accesos) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/accesos/`, accesoObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getContraseniaByIdUser(id: number) : Observable<ResponseDTO>{
    return this.httpClient
    .get<any>(`${environment.api}/accesos/getContraseniaByIdUser/` + id)
    .pipe(
      map((response) => {       
        return response
      })
    );
  }
  updateContrasenia(contrasenia: string, usuario: string) {
    return this.httpClient
    .get<any>(`${environment.api}/accesos/actualizaContrasenia/` + contrasenia + '/' + usuario)
    .pipe(
      map((response) => {       
        return response
      })
    );
  } 
}
