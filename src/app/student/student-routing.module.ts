import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'soluciones',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },

  {
    path: 'homework',
    component: HomeworkComponent,
  },

  {
    path: 'mejoras',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'incidencias',
    loadChildren: () =>
      import('./students/students.module').then((m) =>
       m.StudentsModule),
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
