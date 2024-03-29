import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AboutStudentComponent } from './about-student/about-student.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';

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
    path: 'edit-student',
    component: EditStudentComponent,
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
