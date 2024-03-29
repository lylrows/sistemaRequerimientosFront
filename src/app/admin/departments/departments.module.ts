import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DeleteDialogComponent } from './all-departments/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-departments/dialogs/form-dialog/form-dialog.component';
import { DepartmentService } from './all-departments/department.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from './../../shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormSistemasComponent } from './all-departments/dialogs/form-sistemas/form-sistemas.component';
import { FromANSComponent } from './all-departments/dialogs/from-ans/from-ans.component';
import { FromHorarioComponent } from './all-departments/dialogs/from-horario/from-horario.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { FormDialogHorasComponent } from './all-departments/dialogs/form-sistemas/form-dialog-horas/form-dialog-horas.component';
import { FormTipificacionesEmpresaComponent } from './all-departments/dialogs/form-tipificaciones-empresa/form-tipificaciones-empresa.component';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    EditDepartmentComponent,
    AllDepartmentsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    FormSistemasComponent,
    FromANSComponent,
    FromHorarioComponent,
    FormDialogHorasComponent,
    FormTipificacionesEmpresaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    DepartmentsRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [DepartmentService, DatePipe],
})
export class DepartmentsModule {}
