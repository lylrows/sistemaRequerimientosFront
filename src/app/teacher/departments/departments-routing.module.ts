import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';

const routes: Routes = [
  {
    path: 'bandeja',
    component: AllDepartmentsComponent
  },
  {
    path: 'mejoras',
    component: AddDepartmentComponent
  },
  {
    path: 'mejora-detalle',
    component: EditDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {}
