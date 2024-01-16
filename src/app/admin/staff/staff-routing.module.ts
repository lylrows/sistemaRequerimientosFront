import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllstaffComponent } from './all-staff/all-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AboutStaffComponent } from './about-staff/about-staff.component';
const routes: Routes = [
  {
    path: 'todos',
    component: AllstaffComponent
  },
  {
    path: 'add-staff',
    component: AddStaffComponent
  },
  {
    path: 'edit-staff',
    component: EditStaffComponent
  },
  {
    path: 'asignar-empresa',
    component: AboutStaffComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
