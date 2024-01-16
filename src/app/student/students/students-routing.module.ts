import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { AboutStudentComponent } from 'src/app/student/students/about-student/about-student.component';

const routes: Routes = [
  {
    path: 'incidencias',
    component: AllStudentsComponent,
  },
  {
    path: 'agregar-incidencia',
    component: AddStudentComponent,
  },
  {
    path: 'indicadores',
    component: EditStudentComponent,
  },
  {
    path: 'incidencia-detalle',
    component: AboutStudentComponent,
  },
  {
    path: 'incidencia-detalle',
    component: AboutStudentComponent,
  },
  {
    path: 'reportes',
    component: StudentAttendanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
