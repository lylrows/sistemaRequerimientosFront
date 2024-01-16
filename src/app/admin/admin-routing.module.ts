import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tableros',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'soluciones',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
  {
    path: 'incidencias',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./seguridad/seguridad.module').then((m) => m.SeguridadModule),
  },    
  {
    path: 'mantenimiento',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
