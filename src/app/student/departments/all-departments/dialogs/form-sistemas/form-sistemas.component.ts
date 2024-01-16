import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { empresaSistemaRequestDTO, empresaSistemas, sistemas, sistemasEmpresaDTO } from '../../../../../system-models/empresaSistena'
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deleteObj, RegistroActividades } from 'src/app/system-models/deleteObj';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-sistemas',
  templateUrl: './form-sistemas.component.html',
  styleUrls: ['./form-sistemas.component.sass']
})
export class FormSistemasComponent implements OnInit {
  systemList: any[]=[];
  sistemaForm: FormGroup;
  asociarBool:boolean=true;
  tiposSistema: any[] = [];
  boolCodigo:boolean=false;
  // _sistemas:sistemas={
  //   id: 0,
  //   codigoSistema: '',
  //   nombreSistema: '',
  //   descripcion: '',
  //   tipoSistema: 0,
  //   esActivo: 0
  // }
  // _empresaSistema:empresaSistemas={
  //   id: 0,
  //   idEmpresa: 0,
  //   idSistema: 0,
  //   horasContratadas: 0
  // }
  // sistemaReq: empresaSistemaRequestDTO = {
  //   sistema:this._sistemas,
  //   empresaSistema: this._empresaSistema
  // };
  action: string;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  } 
  mejorasSolucion_: RegistroActividades={
    id: 0,
    idMejora: 0,
    horasActividad: 0,
    descripcion: '',
    idUsuarioRegistro: 0,
    fechaActividad: undefined,
    idUsuarioActualiza: 0,
    fechaActualiza: undefined,
    esActivo: 0
  }
  deleteBool:boolean=true;
  ssId: number;
  nombre: string;
  actualiza : boolean = true;
  asociarBoolButton:boolean=false;
  idMejora: any;
  infoDelete: any;
  datos: any;
  toDay: Date = new Date();
  horasEjecutadas: number = 0;
  constructor(public dialogRef: MatDialogRef<FormSistemasComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,    
    private seguridadService : SeguridadService,
    private snackBar: MatSnackBar,) { 
      console.log("dataMejora", data)
      this.sistemaForm = this.createContactForm();
    }
   
  ngOnInit(): void {
    this.LoadSystem();
    
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      codigo:['', [Validators.required]],
      nombreSistema:[''],
      descripcion:['', [Validators.required]],
      tipoSistema:[''],
      horasContratadas:['', [Validators.required, Validators.max(8), Validators.min(0.1)]],
    })
  }
  LoadSystem() {
    this.seguridadService.getActividadByIdMejora().subscribe(res =>{
      this.systemList=res.objModel.filter(x=>x.idMejora==this.data.idMejora);      
      this.systemList.forEach(element => {
        this.horasEjecutadas += element.horasActividad
      });
      /*console.log("horasEjecutadas ",this.horasEjecutadas)
      console.log("actividades ",this.systemList)*/
    })
    this.seguridadService.getParameterDetails(6).subscribe(res =>{
      this.tiposSistema=res;
      //////////////console.log("res", res)
    })
  }
  onNoClick(): void {
    //this.dialogRef.close();
    this.asociarBool = true;
    this.sistemaForm.reset(true);
    this.asociarBoolButton = false;
  }
  editCall(ss){
    //console.log("datos", ss)
    this.datos = ss;
    this.idMejora=ss.id;
    this.actualiza = false;
    this.deleteBool = true;
    this.asociarBoolButton = true;
    //////////////console.log("SS", ss)
    this.asociarBool = false;
    this.sistemaForm.get('codigo').setValue(ss.fechaActividad);
    this.sistemaForm.get('horasContratadas').setValue(ss.horasActividad);
    this.sistemaForm.get('descripcion').setValue(ss.descripcion);
    //this.sistemaForm.get('tipoSistema').setValue(ss.tipoSistema);
    //this.sistemaForm.get('horasContratadas').setValue(ss.horasContratadas);
    this.action='edit';
  }
  putMejora(){
    const clientTimeZone = moment.tz.guess();
    let date;
if (clientTimeZone == 'America/Lima') {
  date = moment().tz('America/Lima');
} else {
  date = moment().tz('America/Lima');
}
let user = JSON.parse(localStorage.getItem('currentUser'));
    this.mejorasSolucion_.id=this.idMejora;
    this.mejorasSolucion_.idMejora=this.data.idMejora;
    this.mejorasSolucion_.horasActividad= this.sistemaForm.value.horasContratadas;
    this.mejorasSolucion_.descripcion= this.sistemaForm.value.descripcion;
    this.mejorasSolucion_.idUsuarioRegistro= this.datos.idUsuarioRegistro;
    this.mejorasSolucion_.fechaActividad= this.sistemaForm.value.codigo;
    this.mejorasSolucion_.idUsuarioActualiza= user.id;
    this.mejorasSolucion_.fechaActualiza= date._d;
    this.mejorasSolucion_.esActivo= 1;    
    //console.log("actualiza Solucion",this.mejorasSolucion_);
    this.seguridadService.putSolucionByMejora(this.mejorasSolucion_).subscribe(res=>{
      
    })
    this.dialogRef.close();
    this.router.navigate(['/soporte/mejoras/bandeja'])
    Swal.fire({
      title: 'OK',
      text: "Se actualizo correctamente", 
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',          
      confirmButtonText: '¡OK!',
    })
  }
  public confirmAdd(): void{    
    let horas = this.sistemaForm.value.horasContratadas + this.horasEjecutadas;
    if(horas > this.data.horasEstimadas){
      this.showNotification(
        'snackbar-danger',
        'Las horas ingresadas son mayor a las estimadas',
        'bottom',
        'center'
      );
      return;
    }
    const clientTimeZone = moment.tz.guess();
    let date;
if (clientTimeZone == 'America/Lima') {
  date = moment().tz('America/Lima');
} else {
  date = moment().tz('America/Lima');
}
let user = JSON.parse(localStorage.getItem('currentUser'));
    this.mejorasSolucion_.id=0;
    this.mejorasSolucion_.idMejora=this.data.idMejora;
    this.mejorasSolucion_.horasActividad= this.sistemaForm.value.horasContratadas;
    this.mejorasSolucion_.descripcion= this.sistemaForm.value.descripcion;
    this.mejorasSolucion_.idUsuarioRegistro= user.id;
    this.mejorasSolucion_.fechaActividad= this.sistemaForm.value.codigo;
    this.mejorasSolucion_.idUsuarioActualiza= 0;
    this.mejorasSolucion_.fechaActualiza= date._d;
    this.mejorasSolucion_.esActivo= 1;    
    //console.log("mejorasSolucion_Insert",this.mejorasSolucion_);
    this.seguridadService.postSolucionByMejora(this.mejorasSolucion_).subscribe(res=>{
      this.dialogRef.close();
      this.router.navigate(['/soporte/mejoras/bandeja'])
      Swal.fire({
        title: 'OK',
        text: "Se registro correctamente", 
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
      })
    })
    
    
  }  
  validateForm(value: any):boolean {
    if(value.codigo ==""){
      this.showNotification(
        'snackbar-danger',
        'Ingrese Código!!!',
        'bottom',
        'center'
      );
      return true
    }    
    if(value.nombreSistema ==""){
      this.showNotification(
        'snackbar-danger',
        'Ingrese Nombre del Sistema!!!',
        'bottom',
        'center'
      );
      return true
    }    
    if(value.tipoSistema ==""){
      this.showNotification(
        'snackbar-danger',
        'Ingrese tipo de Sistema!!!',
        'bottom',
        'center'
      );
      return true
    }    
    if(value.horasContratadas ==""){
      this.showNotification(
        'snackbar-danger',
        'Ingrese horas Contratadas!!!',
        'bottom',
        'center'
      );
      return true
    }    
  }
  submit(){

  }
  asociarSistema(){
    this.asociarBool = false;
    this.deleteBool = true;
    this.asociarBoolButton = true;
    this.sistemaForm.get('codigo').setValue('');
    this.sistemaForm.get('nombreSistema').setValue('');
    this.sistemaForm.get('descripcion').setValue('');
    this.sistemaForm.get('tipoSistema').setValue('');
    this.sistemaForm.get('horasContratadas').setValue('');
  }
  getCodigo(char):boolean{
    let codigo = this.sistemaForm.get('codigo').value;
    //////////////console.log("cod",codigo);
    if(char == 'f'){
      if(codigo == ""){
        return true;
     }else{
      return false
      }
    }else{
      return false;
    }
    
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
  deleteItem(ss){
    //console.log("dato",ss);
    this.asociarBool = true;
    this.deleteBool = false;
    this.asociarBoolButton = true;
    //this.dialogRef.close();
   this.ssId=ss.idSistema;
   this.nombre = ss.nombreSistema;
   //////////////console.log("SS",ss);
   //////////////console.log("ssId",this.ssId);
   this.infoDelete = ss;
   //this.confirmDelete();
  }
  confirmDelete(){
    //console.log("info",this.infoDelete);
    
    this.mejorasSolucion_.id=this.infoDelete.idActividad;
    this.mejorasSolucion_.idMejora=this.infoDelete.idMejora;
    this.mejorasSolucion_.horasActividad= this.infoDelete.horasActividad
    this.mejorasSolucion_.descripcion= this.infoDelete.descripcion
    this.mejorasSolucion_.idUsuarioRegistro= this.infoDelete.idUsuarioRegistro
    this.mejorasSolucion_.fechaActividad= this.infoDelete.fechaActividad
    this.mejorasSolucion_.idUsuarioActualiza= this.infoDelete.idUsuarioActualiza
    this.mejorasSolucion_.fechaActualiza= this.infoDelete.fechaActualiza
    this.mejorasSolucion_.esActivo= this.infoDelete.esActivo 
     this.seguridadService.deleteMejoraActividad(this.infoDelete.id).subscribe(res=>{
       this.LoadSystem();
       this.showNotification(
        'snackbar-info',
        'Tipificación desasociada!!!',
        'bottom',
        'center'
      );
     })


    this.deleteObj.id = this.ssId;
    this.deleteObj.valor = 0;
    this.deleteObj.tabla='[configuracion].[sistemas]';
    this.seguridadService.esActivo(this.deleteObj).subscribe(res =>{
      if(res.objModel){
        this.showNotification(
          'snackbar-success',
          'Se eliminó el registro',
          'bottom',
          'center'
        );
      }else{
        this.showNotification(
          'snackbar-danger',
          res.description,
          'bottom',
          'center'
        );
      }
      //this.LoadSystem(this.data.id);
    })
    this.deleteBool = true;
  }
  cancelDelete(){
    this.asociarBool = true;
    this.deleteBool = true;
    this.asociarBoolButton = false;
  }
}
