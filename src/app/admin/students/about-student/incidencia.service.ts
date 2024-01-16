import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {ResponseDTO} from '../../../system-models/responseApi';
import {environment} from '../../../../../src/environments/environment'
import {incidencia, incidenciaArchivo, incidenciaComentario} from '../../../system-models/incidencia'
@Injectable({providedIn: 'root'})

export class IncideciaService {
  

    constructor( private httpClient: HttpClient ) { }

    getIncidenciaComentarioArchivo(id: number): Observable<ResponseDTO> {
        return this.httpClient
        .get<ResponseDTO>(`${environment.api}/incidencias/getIncidenciaComentariosArchivosByIncidencia/`+id)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      getIncidencia(id: number): Observable<ResponseDTO> {
        return this.httpClient
        .get<ResponseDTO>(`${environment.api}/incidencias/`+id)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      updateIncidencia(incidencia: incidencia) {
        return this.httpClient
        .put<ResponseDTO>(`${environment.api}/incidencias`,incidencia)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      insertIncidencia(incidencia: incidencia): Observable<ResponseDTO>  {
        return this.httpClient
        .post<ResponseDTO>(`${environment.api}/incidencias`,incidencia)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      updateIncidenciaComentario(incidenciaComentario: incidenciaComentario) {
        return this.httpClient
        .put<ResponseDTO>(`${environment.api}/incidenciaComentarios`,incidenciaComentario)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      insertIncidenciaComentario(incidenciaComentario: incidenciaComentario): Observable<ResponseDTO>  {
        return this.httpClient
        .post<ResponseDTO>(`${environment.api}/incidenciaComentarios`,incidenciaComentario)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      getIncidenciaComentario(id: number): Observable<ResponseDTO> {
        return this.httpClient
        .get<ResponseDTO>(`${environment.api}/incidenciaComentarios/`+id)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      getIncidenciaArchivo(id: number): Observable<ResponseDTO> {
        return this.httpClient
        .get<ResponseDTO>(`${environment.api}/incidenciaArchivos/getByIdIncidencia/`+id)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      insertIncidenciaArchivo(incidenciaArchivo: incidenciaArchivo): Observable<ResponseDTO>  {
        return this.httpClient
        .post<ResponseDTO>(`${environment.api}/incidenciaArchivos`,incidenciaArchivo)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      updateIncidenciaArchivo(incidenciaArchivo: incidenciaArchivo) {
        return this.httpClient
        .put<ResponseDTO>(`${environment.api}/incidenciaArchivos`,incidenciaArchivo)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
      getComentariosByIdincidencia(id: number): Observable<ResponseDTO> {
        //////////console.log("id", id)
        return this.httpClient
        .get<ResponseDTO>(`${environment.api}/incidenciaComentarios/getComentariosByIdincidencia/`+id)
        .pipe(
          map((response) => {       
            return response;
          })
        );
      }
}