import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { empresaSistema, empresaSistemaRequestDTO, empresaSistemas, sistemas, sistemasEmpresaDTO } from '../../../../../system-models/empresaSistena'
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { FormDialogHorasComponent } from './form-dialog-horas/form-dialog-horas.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Component({
  selector: 'app-form-sistemas',
  templateUrl: './form-sistemas.component.html',
  styleUrls: ['./form-sistemas.component.sass']
})
export class FormSistemasComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  systemList: sistemasEmpresaDTO[]=[];
  sistemaForm: FormGroup;
  asociarBool:boolean=true;
  cambio: boolean=false;
  actualiza: boolean=true;
  tiposSistema: any[] = [];
  boolCodigo:boolean=false;
  buscarSistemasBool:boolean=true;
  _sistemas:sistemas={
    id: 0,
    codigoSistema: '',
    nombreSistema: '',
    descripcion: '',
    tipoSistema: 0,
    //intervaloAtencion:0,
    esActivo: 0
  }
  empresaSistema_ : empresaSistema={
    id: 0,
    idEmpresa: 0,
    idSistema: 0,
    horasContratadas: 0,
    intervaloAtencion: 0
  }
  _empresaSistema:empresaSistemas={
    id: 0,
    idEmpresa: 0, 
    idSistema: 0,
    horasContratadas: 0,
    intervaloAtencion: 0,
  }
  sistemaReq: empresaSistemaRequestDTO = {
    sistema:this._sistemas,
    empresaSistema: this._empresaSistema
  };
  action: string;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  } 
  deleteBool:boolean=true;
  ssId: number;
  nombre: string;
  asociarBoolButton:boolean=false;
  listSystem: any;
  idSistema: any;
  idEmpresaSistema: number;
  constructor(public dialogRef: MatDialogRef<FormSistemasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,    
    private seguridadService : SeguridadService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,) { 
    super();
      ////////////console.log("data", data.id)
      this.sistemaForm = this.createContactForm();
    }
   
  ngOnInit(): void {
    this.LoadSystem(this.data.id);
    
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      codigo:[''],
      nombreSistema:[''],
      descripcion:[''],
      tipoSistema:[''],
      otros:[''],
      horasContratadas:[''],
      intervaloAtencion:[''],
    })
  }
  LoadSystem(id: number) {
    this.seguridadService.getSistemasByIdEmpresa(id).subscribe(res =>{
      this.systemList=res.objModel;
      //console.log("datos: ",this.systemList)
    })
    this.seguridadService.getParameterDetails(6).subscribe(res =>{
      this.tiposSistema=res;
      ////////////console.log("res", res)
    })
  }
  onNoClick(): void {
    //this.dialogRef.close();
    this.asociarBool = true;
    this.sistemaForm.reset(true);
    this.asociarBoolButton = false;
  }
  
  public confirmAdd(): void{    
    //console.log("actualiza");
    //return
    if(this.validateForm(this.sistemaForm.value)){        
      return;
    }
    ////////////console.log("req", this.sistemaReq)
    this.sistemaReq.sistema = {
      id: 0,
      codigoSistema: this.sistemaForm.getRawValue().codigo,
      nombreSistema: this.sistemaForm.getRawValue().nombreSistema,
      descripcion: this.sistemaForm.getRawValue().descripcion,
      tipoSistema: this.sistemaForm.getRawValue().tipoSistema,
      //intervaloAtencion: this.sistemaForm.getRawValue().intervaloAtencion,
      esActivo: 1,
    }
    this.sistemaReq.empresaSistema = {
      id: 0,
      idEmpresa: this.data.id,
      idSistema: 0,
      horasContratadas: this.sistemaForm.getRawValue().horasContratadas,
      intervaloAtencion:this.sistemaForm.getRawValue().intervaloAtencion ,
    }
    this.seguridadService.insertEmpresaSistemas(this.sistemaReq).subscribe(res=>{
      this.LoadSystem(this.data.id);
      this.asociarBool = true;
      this.sistemaForm.reset(false);     
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
    this.sistemaForm.get('otros').setValue('');
    this.sistemaForm.get('intervaloAtencion').setValue('3');
    let event: any ={"value": 0};   
    this.selecttipoSistema(event);

  }
  getCodigo(char):boolean{
    let codigo = this.sistemaForm.get('codigo').value;
    ////////////console.log("cod",codigo);
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
  editCall(ss){
    this.idSistema = ss.idSistema;
    this.idEmpresaSistema = ss.idEmpresaSistema;
    this.actualiza=false;
    this.deleteBool = true;
    this.asociarBoolButton = true;
    //console.log("SS", ss)
    this.asociarBool = false;
    this.sistemaForm.get('codigo').setValue(ss.codigoSistema);
    this.sistemaForm.get('nombreSistema').setValue(ss.nombreSistema);
    this.sistemaForm.get('descripcion').setValue(ss.descripcion);
    this.sistemaForm.get('tipoSistema').setValue(ss.tipoSistema);
    this.sistemaForm.get('horasContratadas').setValue(ss.horasContratadas);
    this.sistemaForm.get('intervaloAtencion').setValue(ss.intervaloAtencion);
    this.sistemaForm.get('otros').setValue(ss.descripcionTipoSistema);
    let event: any ={"value": 0};
    event.value = ss.tipoSistema
    this.selecttipoSistema(event);

    this.action='edit';
    
  }
  actualizar(){
    this.empresaSistema_.id=this.idEmpresaSistema;
    this.empresaSistema_.idEmpresa=this.data.id;
    this.empresaSistema_.idSistema=this.idSistema;
    this.empresaSistema_.horasContratadas=this.sistemaForm.value.horasContratadas;
    this.empresaSistema_.intervaloAtencion=this.sistemaForm.value.intervaloAtencion;
    ////console.log("actualiza",this.empresaSistema_);
    this.seguridadService.updateEmpresaSistema(this.empresaSistema_).subscribe(res=>{
      if(res.objModel){
        this.showNotification(
          'snackbar-success',
          'Se actualizó corretamente !!!',
          'bottom',
          'center'
        );
      }
      this.asociarBool = true;
      this.LoadSystem(this.data.id);
    })

  }
  selecttipoSistema(event){
    ////////////console.log("evento",event.value);
     if(event.value==5){
       this.cambio=true;
     }else{
      this.cambio=false;
     }
  }
  deleteItem(ss){
    this.ssId=ss.idSistema;
    this.seguridadService.validaUsuarioAsociado(ss.idSistema,this.data.id).subscribe(res =>{
      ////////////console.log("res",res)
      if(res.objModel){
        this.showNotification(
          'snackbar-success',
          'Existe un usuario asignado!!!',
          'bottom',
          'center'
        );
        this.asociarBool = true;
        this.deleteBool = true;
        this.asociarBoolButton = false;
      }else{
        this.asociarBool = true;
        this.deleteBool = false;
        this.asociarBoolButton = true;
        this.buscarSistemasBool = true;
        this.nombre = ss.nombreSistema;
      }
    })   
  }
  confirmDelete(){
    /*this.deleteObj.id = this.ssId;
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
      this.LoadSystem(this.data.id);
    })*/
    this.seguridadService.deleteEmpresaSistemas(this.data.id,this.ssId).subscribe( res =>{
      if(res.objModel){
        this.asociarBool = true;
        this.deleteBool = true;
        this.asociarBoolButton = false;
        this.LoadSystem(this.data.id);
        this.showNotification(
          'snackbar-success',
          'Sistema desasociado!!!',
          'bottom',
          'center'
        );
      }
    })    
  }
  cancelDelete(){
    this.asociarBool = true;
    this.deleteBool = true;
    this.asociarBoolButton = false;
  }
  sistemaExistente(){
    this.seguridadService.getSistemasNoAsociados(this.data.id).subscribe( res =>{
      this.listSystem = res.objModel;
      this.buscarSistemasBool = false;
      ////////////console.log("no asoc:", this.listSystem  )
    })
    
  }
  asociarSistemaNuevo(ss){
    ////////////console.log("ss", ss)   
    const dialogRef = this.dialog.open(FormDialogHorasComponent, {
      
      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1){
        ////////////console.log("sis.horas", this.seguridadService.horas)
        this.sistemaReq.empresaSistema = {
          id: 0,
          idEmpresa: this.data.id,
          idSistema: ss.id,
          horasContratadas: this.seguridadService.horas,
          intervaloAtencion:this.seguridadService.intervalo ,
        }
        this.addEmpresaSistema(this.sistemaReq.empresaSistema);
      }
    }) 
  }
  addEmpresaSistema(empresaSistema: empresaSistemas) {
    this.seguridadService.addEmpresaSistema(empresaSistema).subscribe(res =>{
      this.buscarSistemasBool = true;
      this.LoadSystem(this.data.id);
    })
  }
}
