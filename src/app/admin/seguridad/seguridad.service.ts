import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { parametro, parametroDetalle } from 'src/app/system-models/parametros';
import { constante } from 'src/app/system-models/constantes';
import { ResponseDTO } from 'src/app/system-models/responseApi';
import { environment } from 'src/environments/environment';
import { menu } from 'src/app/system-models/perfiles';
import { deleteObj, RegistroActividades } from 'src/app/system-models/deleteObj';
import { empresaANS, empresaHorarios, empresaSistema, empresaSistemaRequestDTO, empresaSistemas } from 'src/app/system-models/empresaSistena';
import { incidenciaSolucion, incidenciaSolucionPalabrasClave, tipificacionTipo, tipoTciket } from 'src/app/system-models/incidencia';
import {incidenciaObj, LstIncidenciaSolArchivo } from 'src/app/system-models/solucionObj'
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  
  
  
  
  
  
  
  
  
  
 
  
  
  horas: number;
  intervalo: number;
 
 
  constructor( private httpClient: HttpClient ) { }

  getParameters(): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/parametros`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateParametro(parameto: parametro) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/parametros`,parameto)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateEmpresaSistema(empresaSistema_: empresaSistema) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/empresaSistemas`,empresaSistema_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  UploadPhoto(element: File, fileName: string) {
    const formData = new FormData(); 
    formData.append('file' , element);
    formData.append('fileName', fileName);
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/personas/UploadFoto/`, formData)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertSolucionArchivos(_incidenciaArchivo: LstIncidenciaSolArchivo) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaSolucionArchivos`,_incidenciaArchivo)
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
  getListTipoTicket(id: any) {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/tipoincidenciasempresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })  
    );
  }
  insertParametro(parameto: parametro): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/parametros`,parameto)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getParameterDetails(id: number): Observable<any>  {
    return this.httpClient
    .get<any>(`${environment.api}/parametroDetalles`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idParametro == id);
      })
    );
  }
  getPerfiles(): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/Menu`)
    .pipe(
      map((response) => {       
        return response;
      })  
    );
  }
  getActividadByIdMejora(): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/MejoraRegistroActividades`)
    .pipe(
      map((response) => {       
        return response;
      })  
    );
  }
  updatePerfiles(menu: menu) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/Menu`,menu)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertPerfiles(menu: menu): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/Menu`,menu)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  postItemTipif(tipifTipo: tipificacionTipo) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/tipificacionesempresa`,tipifTipo)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  postItemTipo(tipoTicket: tipoTciket) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/tipoincidenciasempresa`,tipoTicket)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getConstanteDetails(id: number): Observable<any>  {
    return this.httpClient
    .get<any>(`${environment.api}/constantes`)
    .pipe(
      map((response) => {       
        return response.objModel.filter( x => x.idconstante == id);
      })
    );
  }
  getConstantes(): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/constantes`)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateConstantes(constante: constante) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/constantes`,constante)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertConstantes(constante: constante): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/constantes`,constante)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateParametroDetalle(parameto: parametroDetalle) : Observable<ResponseDTO>{
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/parametroDetalles`,parameto)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  } 
  insertParametroDetalle(parameto: parametroDetalle): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/parametroDetalles`,parameto)
    .pipe(
      map((response) => {       
        return response;
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
  getSistemasByIdEmpresa(id: number): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/getSistemasByIdEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }  
  insertEmpresaSistemas(sistemaReq: empresaSistemaRequestDTO): Observable<ResponseDTO> {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/sistemas/insertEmpresaSistemas`,sistemaReq)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  sp_getANSByIdEmpresa(id: number): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaANS/getANSByIdEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  deleteTipificacion(tipifTipo: tipificacionTipo) {
    return this.httpClient
    .delete<ResponseDTO>(`${environment.api}/tipificacionesempresa/`+tipifTipo.id)
    .pipe(
      map((response) => {       
        return response;
      })
    );

    
  }
  deleteMejoraActividad(id: number) {
    return this.httpClient
    .delete<ResponseDTO>(`${environment.api}/MejoraRegistroActividades/`+ id)
    .pipe(
      map((response) => {       
        return response;
      })
    );

    
  }
  deleteTipoTicket(tipoTicket: tipoTciket) {
    return this.httpClient
    .delete<ResponseDTO>(`${environment.api}/tipoincidenciasempresa/`+tipoTicket.id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getUsuariosByEmpresa(id: number): Observable<ResponseDTO>  {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/personas/getUsuariosByEmpresa/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateEmpresaANS(empresaANS: empresaANS): Observable<ResponseDTO>  {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/empresaANS`,empresaANS)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertEmpresaANS(empresaANS: empresaANS): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/empresaANS`,empresaANS)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }

  getHorarioEmpresaList(id: number): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaHorarios/getHorarioEmpresaList/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertEmpresahorario(empresaHorarioObj: empresaHorarios): Observable<ResponseDTO>  {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/empresaHorarios`,empresaHorarioObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  updateEmpresahorario(empresaHorarioObj: empresaHorarios): Observable<ResponseDTO>  {
    ////////////console.log("req", empresaHorarioObj)
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/empresaHorarios`,empresaHorarioObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  putSolucionByMejora(mejorasSolucion_: RegistroActividades) {
    return this.httpClient
    .put<ResponseDTO>(`${environment.api}/MejoraRegistroActividades`,mejorasSolucion_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
    
  }
  getSistemasNoAsociados(id: number): Observable<ResponseDTO> {
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/sistemas/getSistemasNoAsociados/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  addEmpresaSistema(empresaSistema: empresaSistemas) :Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/empresaSistemas`,empresaSistema)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  validaUsuarioAsociado(idSistema: number, idEmpresa: number) :Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/validaUsuarioAsociado/`+idSistema+'/'+idEmpresa)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  deleteEmpresaSistemas(idEmpresa: number, idSistema: number) :Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/empresaSistemas/deleteEmpresaSistemas/`+idEmpresa+'/'+idSistema)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  getIncidenciaSolucion(id: number): Observable<ResponseDTO>{
    return this.httpClient
    .get<ResponseDTO>(`${environment.api}/incidenciaSolucion/`+id)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertIncidenciaSolucion(IncSolucionObj: incidenciaSolucion)  :Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaSolucion`,IncSolucionObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  insertSolucion(IncSolucionObj: incidenciaObj)  :Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaSolucion/InsertObj`,IncSolucionObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
  postSolucionByMejora(mejorasSolucion_: RegistroActividades) {
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/MejoraRegistroActividades`,mejorasSolucion_)
    .pipe(
      map((response) => {       
        return response;
      })
    );
    
  }
  insertTagsSoluciones(tagsObj: incidenciaSolucionPalabrasClave) :Observable<ResponseDTO>{
    return this.httpClient
    .post<ResponseDTO>(`${environment.api}/incidenciaSolucionPalabrasClave/InsertTags`,tagsObj)
    .pipe(
      map((response) => {       
        return response;
      })
    );
  }
}
