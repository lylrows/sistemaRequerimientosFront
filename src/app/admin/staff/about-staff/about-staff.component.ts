import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { empresaSistemaUsuarios, sistemasByIdUsuario, sistemasPorAsignarUsuario } from 'src/app/system-models/empresaSistena';
import { Staff } from '../all-staff/staff.model';
import { StaffService } from '../all-staff/staff.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormNivelSoporteComponent } from './form-nivel-soporte/form-nivel-soporte.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-about-staff',
  templateUrl: './about-staff.component.html',
  styleUrls: ['./about-staff.component.sass'],
})
export class AboutStaffComponent  extends UnsubscribeOnDestroyAdapter implements OnInit{
  breadscrums = [
    {
      title: 'Usuarios',
      items: ['Asignar'],
      active: 'Empresas',
    },
  ];
  usuario: Staff;
  sistemasByUsuario:sistemasByIdUsuario[]=[];
  sistemasPorAsignar:sistemasPorAsignarUsuario[]=[];
  empresaSistemaObj:empresaSistemaUsuarios={
    id: 0,
    idEmpresaSistemas: 0,
    idUsuario: 0,
    esActivo: 1,
    idNivelSoporte: 0
  }
  deleteObj:  deleteObj ={
    id: 0,
    valor: 0,
    tabla: ''
  }
  constructor(public staffService: StaffService,
    private router: Router,
    public dialog: MatDialog,) {
    super();
    this.usuario = this.staffService.dataRow;
  }

  ngOnInit(): void {
    ////////////console.log("usuario",this.usuario)
    this.LoadSystems();
    this.LoadSystemsUnassigned();
  }
  LoadSystemsUnassigned() {
    this.staffService.getSistemasPorAsignarByIdUsuario(this.usuario.id).subscribe(res =>{
      this.sistemasPorAsignar = res.objModel;
      ////////////console.log("sistemasPorAsignar", this.sistemasPorAsignar)
    })
  }
  LoadSystems() {
    this.staffService.getSistemasByIdUsuario(this.usuario.id).subscribe(res=>{
      ////////////console.log("sistemasByUsuario", res.objModel)
      this.sistemasByUsuario = res.objModel;
    })
  }
  backHome(){
    this.router.navigate(['admin/usuarios/todos']);
  }
  deleteParameter(sis : sistemasByIdUsuario){
    ////////////console.log("sis", sis)
    Swal.fire({
      //imageUrl: 'assets/images/banner/banner_swal.png',
      title: '¿Estas seguro?',
      text: "Se eliminará el registro: " + sis.nombreSistema +" de: "+sis.razonSocial,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.value) {  
        this.deleteObj.id = sis.idSist;
        this.deleteObj.valor = 0;
        this.deleteObj.tabla = '[configuracion].[empresaSistemaUsuarios]';
        this.staffService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.LoadSystems();
          this.LoadSystemsUnassigned();
        })
      }
    }); 
  }
  asignarSistema(sis : sistemasPorAsignarUsuario){
    ////////////console.log("sis", sis)
    const dialogRef = this.dialog.open(FormNivelSoporteComponent, {
      data: {
        sistema: sis,
      },      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1 || result === 2 ){
        //////////console.log("nivel: ",result)
        this.empresaSistemaObj.idEmpresaSistemas = sis.idEmpSist;
        this.empresaSistemaObj.idUsuario = this.usuario.id;
        this.empresaSistemaObj.idNivelSoporte = result;
        ////////////console.log("empresaSistemaObj", this.empresaSistemaObj)
        this.staffService.insertempresaSistemaUsuarios(this.empresaSistemaObj).subscribe(res =>{
          if(res.objModel > 0){
            Swal.fire('Éxito!', 'Su registro ha sido asignado.', 'success');
          }
          this.LoadSystemsUnassigned();
          this.LoadSystems();
        })
      }else{
        Swal.fire('Info!', 'No se realizó la asignación.', 'info');
      }
    })
    
  }
}
