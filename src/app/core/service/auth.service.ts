import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { CredencialesUsuaroBE } from 'src/app/system-models/credenciales';
import { ResponseDTO } from '../../system-models/responseApi'
import { message } from 'src/app/authentication/thank-you-wall/thank-you-wall.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://api.ipify.org?format=json';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(credenciales : CredencialesUsuaroBE): Observable<any> {
    ////////////console.log("login")
    return this.http
      .post<any>(`${environment.api}/login/login`, credenciales)
      .pipe(
        map((user) => {
          //console.log("user", user.objModel)
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if(user.objModel.img == ''){
            user.objModel.img = environment.directorio+'user01.png';
          }

          localStorage.setItem('currentUser', JSON.stringify(user.objModel));
          this.currentUserSubject.next(user.objModel);
          return user;
        })
      );
  }
  insertMessage(message: message, photoFile: File): Observable<any> {
    //return this.http.get<any>(this.API_URL);
    const formData = new FormData();
    formData.append('message', JSON.stringify(message));
    formData.append('file', photoFile);
    return this.http
    .post<ResponseDTO>(`${environment.api}/mural`, formData)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }

  getMessages() {
    return this.http
    .get<ResponseDTO>(`${environment.api}/mural`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }

  getTicketsPendientes(id: number) {
    const headers = new HttpHeaders().set('no-loading-spinner', 'true');
    return this.http
    .get<ResponseDTO>(`${environment.api}/incidenciaAsignaciones/getTicketsPendientes/` + id , { headers })
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
  generadorCodigo(email: string) : Observable<ResponseDTO>{
    return this.http
    .get<ResponseDTO>(`${environment.api}/accesos/generadorCodigo/`+email)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  validarCodigo(codigo: number, email: string) : Observable<ResponseDTO>{
    return this.http
    .get<ResponseDTO>(`${environment.api}/accesos/validarCodigo/`+codigo+'/'+email)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  actualizaContrasenia(contrasenia: string, email: string) : Observable<ResponseDTO> {
    return this.http
    .get<ResponseDTO>(`${environment.api}/accesos/actualizaContrasenia/`+contrasenia+'/'+email)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
}
