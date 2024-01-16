import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { tipificacionTipo, tipoTciket } from 'src/app/system-models/incidencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipificaciones-empresa',
  templateUrl: './form-tipificaciones-empresa.component.html',
  styleUrls: ['./form-tipificaciones-empresa.component.sass']
})
export class FormTipificacionesEmpresaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  tipifForm: FormGroup;
  tipificaciones: any;
  tipificacionesAux: any;
  Incidentes: any;
  tipoIncidentes: any;
  tipoIncidentesAux: any;
  tipifTipo: tipificacionTipo={
    id: 0,
    idEmpresa: 0,
    idTipificacion: 0
  }
  tipoTicket: tipoTciket={
    id: 0,
    idEmpresa: 0,
    idTipoIncidencia: 0
  }
  listTipEmpresa: any;
  listTipoTicket: any;
  todo: any;
  listTipoTickets: any;
  

  constructor(public dialogRef: MatDialogRef<FormTipificacionesEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, 
    private seguridadService : SeguridadService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    
    ) {
    super();
    this.tipifForm = this.createContactForm();
  }
  

  ngOnInit(): void {
    this.loadData();
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      search:[''],
      searchTipo:[''],
      
    })
  }
  loadData(){
    this.seguridadService.getParameterDetail(15).subscribe( res => {
      this.tipificacionesAux = res;
      this.tipificaciones = [];
      ////console.log("res",res);
    })
    this.seguridadService.getParameterDetail(10).subscribe( res => {      
      this.Incidentes = res;
      this.tipoIncidentes = this.Incidentes.filter( x => x.idParametroPadre == -1);
      this.tipoIncidentesAux = [];
    })
    this.seguridadService.getListTipificaciones(this.data.id).subscribe(res=>{
      this.listTipEmpresa = res.objModel.listTipificacion;
      this.listTipoTickets = res.objModel.listTipoIncidencias;
      ////console.log("lista",this.todo);
    })
    // this.seguridadService.getListTipoTicket(this.data.id).subscribe(res=>{
    //   this.listTipoTicket = res.objModel;
    //   //console.log("lista",this.listTipEmpresa);
    // })
  }
  addItem(ss){
    this.tipifTipo.id=0;
    this.tipifTipo.idEmpresa= this.data.id
    this.tipifTipo.idTipificacion= ss.id;
    
    let validation = this.listTipEmpresa.filter(x=>x.idTipificacion== this.tipifTipo.idTipificacion)[0];
    if(validation != null || validation!=undefined){
      this.showNotification(
        'snackbar-danger',
        'Ya existe este registro!',
        'bottom',
        'center'
      );
        return
    }
    this.seguridadService.postItemTipif(this.tipifTipo).subscribe(res =>{
      this.loadData();
      this.showNotification(
        'snackbar-success',
        'Se registro con exito!',
        'bottom',
        'center'
      );
    })
    this.tipifForm.get('search').setValue('');
    // Swal.fire({
    //   title: 'OK',
    //   text: "Se agregó tipificación correctamente", 
    //   icon: 'success',
    //   showCancelButton: false,
    //   confirmButtonColor: '#3085d6',          
    //   confirmButtonText: '¡OK!',
    // })

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  desasociar(ss){
    //console.log("desa1",ss);
    this.tipifTipo.id= ss.id;
    this.tipifTipo.idEmpresa= ss.idEmpresa;
    this.tipifTipo.idTipificacion= ss.idTipificacion;
     this.seguridadService.deleteTipificacion(this.tipifTipo).subscribe(res=>{
       this.loadData();
       this.showNotification(
        'snackbar-info',
        'Tipificación desasociada!!!',
        'bottom',
        'center'
      );
     })
  }
  desasociarTipo(ss){
    this.tipoTicket.id= ss.id;
    this.tipoTicket.idEmpresa= ss.idEmpresa;
    this.tipoTicket.idTipoIncidencia= ss.idTipificacion;
     this.seguridadService.deleteTipoTicket(this.tipoTicket).subscribe(res=>{
       this.loadData();
       this.showNotification(
        'snackbar-info',
        'Tipo de ticket desasociado!!!',
        'bottom',
        'center'
      );
     })
  }
  addTipo(ss){
    this.tipoTicket.id=0;
    this.tipoTicket.idEmpresa= this.data.id
    this.tipoTicket.idTipoIncidencia= ss.id;
    //console.log("additem",this.tipifTipo);
    let validation = this.listTipoTickets.filter(x=>x.idTipoIncidencia== this.tipoTicket.idTipoIncidencia)[0];
    if(validation != null || validation!=undefined){
      this.showNotification(
        'snackbar-danger',
        'Ya existe este registro!',
        'bottom',
        'center'
      );
        return
    }
    this.seguridadService.postItemTipo(this.tipoTicket).subscribe(res =>{
      this.loadData();
      this.showNotification(
        'snackbar-success',
        'Se registro con exito!',
        'bottom',
        'center'
      );
    })
    this.tipifForm.get('searchTipo').setValue('');
  }
  filtrarResultados(){
    let filtro= this.tipifForm.get('search')?.value;
    ////console.log("filtro",filtro)
    if(filtro.length>=3){
      this.tipificaciones= this.tipificacionesAux.filter(x=>x.nombre.toLowerCase().includes(filtro.toLowerCase()));
    }else if(filtro.toLowerCase() == 'td'){
      this.tipificaciones = this.tipificacionesAux;
    }else{
      this.tipificaciones = [];
    }
  }
  filtrarResultadosTipo(){
    let filtro= this.tipifForm.get('searchTipo')?.value;
    ////console.log("filtro",filtro)
    if(filtro.length>=3){
      this.tipoIncidentesAux= this.tipoIncidentes.filter(x=>x.nombre.toLowerCase().includes(filtro.toLowerCase()));
    }else if(filtro.toLowerCase() == 'td'){
      this.tipoIncidentesAux = this.tipoIncidentes;
    }else{
      this.tipoIncidentesAux = [];
    }
  }

}
