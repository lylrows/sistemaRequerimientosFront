import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incidenciaAsignaciones, usuariosAsignar } from 'src/app/system-models/incidencia';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-form-asignar',
  templateUrl: './form-asignar.component.html',
  styleUrls: ['./form-asignar.component.sass']
})
export class FormAsignarComponent implements OnInit {
  usuarios : usuariosAsignar[] = []
  escalar:usuariosAsignar;
  asignacionObj:incidenciaAsignaciones={
    id: 0,
    idIncidencia: 0,
    idUsuarioOrigen: 0,
    idUsuaroAsignado: 0,
    idUsuarioEscalar: 0,
    esActivo: 1
  }
  user: any;

  constructor(public dialogRef: MatDialogRef<FormAsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private StudentsService : StudentsService,) { 
      ////////console.log("data:", data)
    }

  ngOnInit(): void {
    this.LoadParameters();
    this.user= JSON.parse(localStorage.getItem('currentUser')); 
  }
  LoadParameters() {
    this.StudentsService.obtenerUsuariosParaAsignar(this.data.idIncidencia).subscribe( res =>{      
      this.usuarios= res.objModel;
      this.escalar = this.usuarios.filter( x => x.idNivelSoporte ==2 )[0];
      //////////console.log("escalar:", this.escalar)
    })
  }
  asignarIncidencia(idUsuario){    
    this.asignacionObj.idIncidencia = this.data.idIncidencia;
    this.asignacionObj.idUsuarioOrigen = this.user.id;
    this.asignacionObj.idUsuaroAsignado = idUsuario;
    this.asignacionObj.idUsuarioEscalar = this.escalar == undefined? 0 : this.escalar.idUsuario;
    //////////console.log("asignacionObj:", this.asignacionObj)
    this.StudentsService.insertAsignaciones(this.asignacionObj).subscribe(res =>{
      if(res.objModel > 0){
        this.dialogRef.close(1);
      }
    })
  }

}
