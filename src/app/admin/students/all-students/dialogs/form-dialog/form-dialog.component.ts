import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Students } from '../../students.model';
import { formatDate } from '@angular/common';
import { DepartmentService } from 'src/app/admin/departments/all-departments/department.service';
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
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    public empresa: DepartmentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.accion = data.accion;
    if (this.accion === 'editar') {
      ////////////console.log("si entra");
      //this.dialogTitle = data.students.nombre;
      this.students = data.students;
    } else {
      this.dialogTitle = 'Editar Incidencia';
      this.students = new Students({});
    }
    this.stdForm = this.createContactForm();
  }
  // formControl = new UntypedFormControl('', [
  //   Validators.required
  //   // Validators.email,
  // ]);
  // getErrorMessage() {
  //   return this.formControl.hasError('required')
  //     ? 'Required field'
  //     : this.formControl.hasError('email')
  //     ? 'Not a valid email'
  //     : '';
  // }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.students.id],
      razonSocial: [this.department.razonSocial],
      servicio: [this.department.servicio],
      numIncidente: [this.students.nombre],
      nombre: [this.students.nombre],
      fechaRegistro: [this.students.fechaRegistro],
      // fechaRegistro: [
      //   formatDate(this.students.fechaRegistro, 'yyyy-MM-dd', 'en'),
      //   [Validators.required]
      // ],
      idPrioridad: [this.students.idPrioridad],
      idEstado: [this.students.idEstado],
      fechaAtencion: [this.students.fechaAtencion],
      // fechaAtencion: [
      //   formatDate(this.students.fechaAtencion, 'yyyy-MM-dd', 'en'),
      //   [Validators.required]
      // ],
      esActivo: [this.students.esActivo]
    });
  }
  ngOnInit(): void {
    this.LoadIncidencia();
    this.LoadEmpresa();
    ////////////console.log("data: ", this.data)
  }
  LoadIncidencia() {
    this.studentsService.getAllStudentss().subscribe(res =>{
      this.Incidencia = res;
    })
  }
  LoadEmpresa() {  
    this.empresa.getTipoEmpresa(5).subscribe(ras =>{
      this.empresa_ = ras;
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    ////////////console.log("par: ",this.stdForm.getRawValue());
    let incidencia :Students= this.stdForm.getRawValue();
    incidencia.esActivo = Number(this.stdForm.getRawValue().esActivo)
    ////////////console.log("dudas: ",this.stdForm.getRawValue());
     if(this.accion == 'editar'){
      ////////////console.log("ingresa");
       this.studentsService.updateStudents(incidencia).subscribe(res =>{
         this.onNoClick();
       })
     }else{
       this.studentsService.addStudents(incidencia).subscribe(res =>{
         this.onNoClick();
       })
     }
    

  }
}
