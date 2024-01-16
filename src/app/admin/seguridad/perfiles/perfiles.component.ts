import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { menu } from '../../../system-models/perfiles'
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormDialogPerfilesComponent } from './form-dialog-perfiles/form-dialog-perfiles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.sass']
})
export class PerfilesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  breadscrums = [
    {
      title: 'Todos los Perfiles',
      items: ['Perfiles'],
      active: 'Todos',
    },
  ];
  perfilesList:menu[] = []
  //parametroDetalleLis:parametroDetalle[] = [];
  boolDetail:boolean=false;
  constructor(private seguridadService : SeguridadService,
    public dialog: MatDialog,) {
     super();
     }

  ngOnInit(): void {
    this.Loadperfiles();
  }
  Loadperfiles() {
    this.seguridadService.getPerfiles().subscribe(res=>{
      this.perfilesList = res.objModel;
      ////////////console.log("perfiles", res.objModel)
    })
  }
  addNew(){
    const dialogRef = this.dialog.open(FormDialogPerfilesComponent,{
      data:{
        menu:null,
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
      this.Loadperfiles();
    });
  }
  refresh(){
    this.Loadperfiles();
  }
  removeSelectedRows(){

  }
  editPerfil(par:menu){
    ////////////console.log("row", par)
    const dialogRef = this.dialog.open(FormDialogPerfilesComponent,{
      data:{
        menu:par,
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
      this.Loadperfiles();
    });
  }
  deleteParameter(par:menu){
    ////////////console.log("row", par)

  }
}
