import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentAttendanceService } from '../../attendance.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { StudentAttendance } from '../../student-Attendance.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  studentAttendanceForm: UntypedFormGroup;
  studentAttendance: StudentAttendance;
  comentariosDTO: any;
  public Editor2 = ClassicEditor;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentAttendanceService: StudentAttendanceService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    /*this.action = data.action;
    if (this.action === 'edit') {
      //////////console.log(data.studentAttendance.date);
      this.dialogTitle = data.studentAttendance.sName;
      this.studentAttendance = data.studentAttendance;
    } else {
      this.dialogTitle = 'New Attendance';
      this.studentAttendance = new StudentAttendance({});
    }
    this.studentAttendanceForm = this.createContactForm();*/
    this.comentariosDTO = this.data.comentarios
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
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
    //////////console.log(this.studentAttendance.id);
    return this.fb.group({
      id: [this.studentAttendance.idTicket],
      img: [this.studentAttendance.solicitante],
      rollNo: [this.studentAttendance.fechaRegistro, [Validators.required]],
      sName: [this.studentAttendance.tituloTicket, [Validators.required]],
      class: [this.studentAttendance.estado, [Validators.required]],
      date: [this.studentAttendance.estado, [Validators.required]],
      status: [this.studentAttendance.razonSocial, [Validators.required]],
      note: [this.studentAttendance.sistema],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.studentAttendanceService.addStudentAttendance(
      this.studentAttendanceForm.getRawValue()
    );
  }
}
