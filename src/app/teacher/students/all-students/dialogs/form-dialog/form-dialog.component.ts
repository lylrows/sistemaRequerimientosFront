import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Students } from '../../students.model';
import { Department } from 'src/app/admin/departments/all-departments/department.model';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  accion: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  department: Department;
  Incidencia: any;
  empresa_: any;
  usuarios: any = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    this.studentsService.getPboUsers(data.pedido.id).subscribe( res => {
      this.usuarios = res.objModel;
    })
  } 
  
  ngOnInit(): void {
    this.LoadIncidencia();
    this.LoadEmpresa();   
  }
  LoadIncidencia() { 
  }
  LoadEmpresa() {    
  }
  submit() {   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  }
  asignarPedido(idUsuario){
    //console.log("usuario", idUsuario);
    //console.log("idPedido", this.data.pedido.id);
    this.studentsService.asignarPedido(idUsuario,this.data.pedido.id).subscribe( res => {
      if(res.objModel){
        this.dialogRef.close(1);
      }
    })
  }
}
