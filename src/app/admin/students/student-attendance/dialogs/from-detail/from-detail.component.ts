import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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
import { StudentsService } from '../../../all-students/students.service';
import { Students } from '../../../all-students/students.model';
import { fromEvent } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-from-detail',
  templateUrl: './from-detail.component.html',
  styleUrls: ['./from-detail.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class FromDetailComponent {
  action: string;
  incidenciaList:Students[]=[];
  studentsDetalleLis:Students[] = [];
  dialogTitle: string;
  ListAux: any;
  studentAttendanceForm: UntypedFormGroup;
  studentAttendance: StudentAttendance;
  reporteDetail: StudentAttendance[]=[];
  boolDetail: boolean;
  constructor(private StudentsService : StudentsService,
    public dialogRef: MatDialogRef<FromDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentAttendanceService: StudentAttendanceService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //////////console.log(data.studentAttendance.date);
      this.dialogTitle = data.studentAttendance.sName;
      this.studentAttendance = data.studentAttendance;
    } else {
      this.dialogTitle = 'New Attendance';
      this.studentAttendance = new StudentAttendance({});
    }
    this.studentAttendanceForm = this.createContactForm();
  }
  @ViewChild('filterStudents', { static: true }) filterStudents: ElementRef;
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
      id: [this.studentAttendance.id],
      img: [this.studentAttendance.img],
      rollNo: [this.studentAttendance.rollNo, [Validators.required]],
      sName: [this.studentAttendance.sName, [Validators.required]],
      class: [this.studentAttendance.class, [Validators.required]],
      date: [
        formatDate(this.studentAttendance.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      status: [this.studentAttendance.status, [Validators.required]],
      note: [this.studentAttendance.note],
    });
  }
  submit() {
    // emppty stuff
  }
  detailParameter(){
    this.StudentsService.getAllStudentss().subscribe(res =>{
      this.incidenciaList = res.objModel;
      this.ListAux = res.objModel;
      ////////////console.log("res", res.objModel)
      this.studentsDetalleLis = [];
    })
    this.boolDetail = false;
    // this.subs.sink = fromEvent(this.filterStudents.nativeElement, 'keyup').subscribe(
    //   () => {
    //     let filter = this.filterStudents.nativeElement.value;
    //    //////////////console.log("filter",this.filterParameter.nativeElement.value )
    //    if(filter.length >= 3){
    //     this.incidenciaList = this.incidenciaList.filter(x => x.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    //    }else{
    //     this.incidenciaList = this.ListAux;
    //    }

    //   }
    // );
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