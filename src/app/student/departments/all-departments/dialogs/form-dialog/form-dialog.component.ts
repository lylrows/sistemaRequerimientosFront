import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incidenciaAsignaciones, incidenciaAsignacionesByMejora, usuariosAsignar } from 'src/app/system-models/incidencia';
import { DepartmentService } from '../../department.service';
//import { StudentsService } from '../../students.service';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent implements OnInit {
  usuarios : usuariosAsignar[] = []
  escalar:usuariosAsignar;
  asignacionObj:incidenciaAsignacionesByMejora={
    id: 0,
    idMejora: 0,
    idUsuariOrigen: 0,
    idUsuarioAsignado: 0,
    esActivo: 0
  }
  user: any;
  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private StudentsService : DepartmentService,) { 
      //console.log("dataAsignar:", data)
    
  }
  ngOnInit(): void {
    this.LoadParameters();
    this.user= JSON.parse(localStorage.getItem('currentUser'));
  }
  LoadParameters() {
    this.StudentsService.obtenerUsuariosParaAsignarByMejora(this.data.idMejora).subscribe( res =>{      
      this.usuarios= res.objModel;
      //this.escalar = this.usuarios.filter( x => x.idNivelSoporte ==2 )[0];
     //console.log("usuarios:", this.usuarios)
    })
  }
  asignarIncidencia(idUsuario){    
    this.asignacionObj.idMejora = this.data.idMejora;
    this.asignacionObj.idUsuariOrigen = this.user.id;
    this.asignacionObj.idUsuarioAsignado = idUsuario;
    this.asignacionObj.esActivo=1;
    
    //console.log("asignacionObj:", this.asignacionObj)    
    this.StudentsService.insertAsignacionesByMejora(this.asignacionObj).subscribe(res =>{
      if(res.objModel > 0){
        this.dialogRef.close(1);
      }
    })
    
  
  }
}
