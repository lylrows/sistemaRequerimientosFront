import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DepartmentService } from '../../department.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Department } from '../../department.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  departmentForm: UntypedFormGroup;
  department: Department;
  tiposEmpresas: any;
  tiposServicios: any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentService: DepartmentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.department.razonSocial;
      this.department = data.department;
    } else {
      this.dialogTitle = 'Nueva Empresa';
      this.department = new Department({});
    }
    this.departmentForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.LoadOptions();
  }
  LoadOptions() {
    this.departmentService.getTipoEmpresa(4).subscribe(res =>{
      this.tiposEmpresas = res;
      //////////console.log("tipos:", res)
    })
    this.departmentService.getTipoEmpresa(5).subscribe(res =>{
      this.tiposServicios = res;
      ////////////console.log("serv:", res)
    })
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.department.id],
      tipoEmpresa: [this.department.tipoEmpresa, [Validators.required]],
      tipoServicio: [this.department.tipoServicio, [Validators.required]],
      numeroRUC: [this.department.numeroRUC, [Validators.required]],
      razonSocial: [this.department.razonSocial, [Validators.required]],
      direccion: [this.department.direccion, [Validators.required]],
      urlWeb: [this.department.urlWeb, [Validators.required]],
      nombreContacto: [this.department.nombreContacto, [Validators.required]],
      emailContacto: [
        this.department.emailContacto,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      observacion: [this.department.observacion, [Validators.required]],
      esActivo: [this.department.esActivo, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    //this.departmentService.addDepartment(this.departmentForm.getRawValue());
    this.department = this.departmentForm.getRawValue();
    ////////////console.log("emp:", this.department)
    if (this.action === 'edit'){
      this.departmentService.updateDepartment(this.department).subscribe(res =>{
        if(res){
          this.onNoClick();
        }
      })

    }else{
      this.departmentService.addDepartment(this.department).subscribe(res =>{
        if(res){
          this.onNoClick();
        }
      })
    }
  }
}
