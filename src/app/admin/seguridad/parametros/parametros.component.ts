import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { parametro, parametroDetalle } from '../../../system-models/parametros'
import { MatDialog } from '@angular/material/dialog';
import { FormDialogParameterComponent } from './form-dialog-parameter/form-dialog-parameter.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import Swal from 'sweetalert2';
import { FormDialogParameterDetailComponent } from './form-dialog-parameter-detail/form-dialog-parameter-detail.component';
import {deleteObj} from '../../../system-models/deleteObj'
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.sass']
})
export class ParametrosComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  breadscrums = [
    {
      title: 'Todos los Parámetros',
      items: ['Parámetros'],
      active: 'Todos',
    },
  ];
  parametrosList:parametro[]=[];
  parametroDetalleLis:parametroDetalle[] = [];
  boolDetail:boolean=false;
  idParametro: number;
  parameter: parametro;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  } 
  ListAux: any;
  ListAuxDet: any;
  constructor(private seguridadService : SeguridadService,
    public dialog: MatDialog,) {
    super();
  }
  @ViewChild('filterParameter', { static: true }) filterParameter: ElementRef;
  @ViewChild('filterDetail', { static: true }) filterDetail: ElementRef;
  ngOnInit(): void {
    this.LoadParameters();
  }
  
  LoadParameters() {
    this.seguridadService.getParameters().subscribe(res =>{
      this.parametrosList = res.objModel;
      this.ListAux = res.objModel;
      ////////////console.log("res", res.objModel)
      this.parametroDetalleLis = [];
    })
    this.boolDetail = false;
    this.subs.sink = fromEvent(this.filterParameter.nativeElement, 'keyup').subscribe(
      () => {
        let filter = this.filterParameter.nativeElement.value;
       //////////////console.log("filter",this.filterParameter.nativeElement.value )
       if(filter.length >= 3){
        this.parametrosList = this.parametrosList.filter(x => x.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || x.codigo.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
       }else{
        this.parametrosList = this.ListAux;
       }

      }
    );
  }
  addNew(){
    const dialogRef = this.dialog.open(FormDialogParameterComponent,{
      data:{
        parametro:null,
        accion:'agregar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se ingresó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.LoadParameters();
    });
  }
  refresh(){
    this.LoadParameters();
  }
  removeSelectedRows(){

  }
  editParameter(par:parametro){
    ////////////console.log("row", par)
    const dialogRef = this.dialog.open(FormDialogParameterComponent,{
      data:{
        parametro:par,
        accion:'editar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.LoadParameters();
    });
  }

    
  deleteParameter(par:parametro){
    Swal.fire({
      //imageUrl: 'assets/images/banner/banner_swal.png',
      title: '¿Estas seguro?',
      text: "Se eliminará el registro: " + par.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.value) {
        ////////////console.log("row", par)
        this.deleteObj.id = par.id;
        this.deleteObj.valor = 0;
        this.deleteObj.tabla='[configuracion].[parametros]';
        this.seguridadService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.LoadParameters();
        })
        
      }
    }); 
  }
  detailParameter(par:parametro){
    this.parameter = par;
    this.boolDetail = true;
    ////////////console.log("row", par)
    this.idParametro = par.id;
    this.seguridadService.getParameterDetails(par.id).subscribe(res =>{
      this.parametroDetalleLis = res.sort();
      this.ListAuxDet = res;
      //////////console.log("ParameterDetails", res)
      
    })
    this.subs.sink = fromEvent(this.filterDetail.nativeElement, 'keyup').subscribe(
      () => {
        let filter = this.filterDetail.nativeElement.value;
       //////////////console.log("filter",this.filterParameter.nativeElement.value )
       if(filter.length >= 3){
        this.parametroDetalleLis = this.parametroDetalleLis.filter(x => x.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || x.codigo.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
       }else{
        this.parametroDetalleLis = this.ListAuxDet;
       }

      }
    );
  }
  addNewDetalle(){
    //////////////console.log("det:", pp)
    const dialogRef = this.dialog.open(FormDialogParameterDetailComponent,{
      data:{
        parametro:this.idParametro,
        accion:'agregar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se ingresó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.detailParameter(this.parameter);
    });
  }
  refreshDetalle(){
    this.detailParameter(this.parameter);
  }
  editParameterDetails(det : parametroDetalle){
    const dialogRef = this.dialog.open(FormDialogParameterDetailComponent,{
      data:{
        parametro:det,
        accion:'editar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.detailParameter(this.parameter);
    });
  }
  deleteParameterDetails(det : parametroDetalle){
    Swal.fire({
      //imageUrl: 'assets/images/banner/banner_swal.png',
      title: '¿Estas seguro?',
      text: "Se eliminará el registro: " + det.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.value) {
        ////////////console.log("row", det)
        this.deleteObj.id = det.id;
        this.deleteObj.valor = 0;
        this.deleteObj.tabla='[configuracion].[parametroDetalles]';
        this.seguridadService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.detailParameter(this.parameter);
        })
        
      }
    }); 
  }
}
