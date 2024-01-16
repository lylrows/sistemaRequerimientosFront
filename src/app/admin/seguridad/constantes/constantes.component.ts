import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { constante } from '../../../system-models/constantes'
import { MatDialog } from '@angular/material/dialog';
import { FormDialogConstantesComponent } from './form-dialog-constantes/form-dialog-constantes.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import Swal from 'sweetalert2';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-constantes',
  templateUrl: './constantes.component.html',
  styleUrls: ['./constantes.component.sass']
})
export class ConstantesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  breadscrums = [
    {
      title: 'Todas las Constantes',
      items: ['Constantes'],
      active: 'Todas',
    },
  ];
  constantesList: constante[] = [];
  constanteDetalleLis:constante[] = [];
  boolDetail:boolean=false;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  ListAux: any;
  constructor(private seguridadService : SeguridadService,
     public dialog: MatDialog,) {
      super();
      }
  @ViewChild('filter', { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.LoadConstantes();
  }
  LoadConstantes() {
    this.seguridadService.getConstantes().subscribe(res => {
      this.constantesList = res.objModel;
      this.ListAux = res.objModel;
      ////////////console.log("ctes", res.objModel)
      this.constanteDetalleLis = [];
    })
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        let filter = this.filter.nativeElement.value;
       //////////////console.log("filter",this.filterParameter.nativeElement.value )
       if(filter.length >= 3){
        this.constantesList = this.constantesList.filter(x => x.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || x.codigo.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
       }else{
        this.constantesList = this.ListAux;
       }

      }
    );
  }
  addNew(){
    const dialogRef = this.dialog.open(FormDialogConstantesComponent,{
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
      this.LoadConstantes();
    });
  }
  refresh(){
    this.LoadConstantes();
  }
  editConstante(par:constante){
    ////////console.log(par);
    ////////////console.log("row", par)
    const dialogRef = this.dialog.open(FormDialogConstantesComponent,{
      data:{
        constante:par,
        
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
      this.LoadConstantes();
    });
  }

  deleteConstante(par:constante){
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
        this.deleteObj.tabla='[configuracion].[constantes]';
        this.seguridadService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.LoadConstantes();
        })
        
      }
    }); 


  }  
}

