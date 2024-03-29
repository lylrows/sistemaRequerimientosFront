import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentsRoutingModule } from './students-routing.module';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { DeleteDialogComponent } from './all-students/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-students/dialogs/form-dialog/form-dialog.component';
import { StudentsService } from './all-students/students.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { DeleteDialogComponent as StdDeleteDialogComponent } from './student-attendance/dialogs/delete/delete.component';
import { FormDialogComponent as StdFormDialogComponent } from './student-attendance/dialogs/form-dialog/form-dialog.component';
import { StudentAttendanceService } from './student-attendance/attendance.service';
import { DepartmentService } from '../departments/all-departments/department.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddArchivoComponent } from './add-student/add-archivo/add-archivo.component';
import { FromDetailComponent } from './student-attendance/dialogs/from-detail/from-detail.component';
import { StaffModule } from '../staff/staff.module';
import { FormSolutionsComponent } from './form-solutions/form-solutions.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormImagenDetailComponent } from './about-student/form-imagen-detail/form-imagen-detail.component';
import { IncideciaService } from './about-student/incidencia.service';
import { FormAsignarComponent } from './all-students/dialogs/form-asignar/form-asignar.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormSolutionsIncidenciaComponent } from './about-student/form-solutions-incidencia/form-solutions-incidencia.component';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

@NgModule({
  declarations: [
    AboutStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    AllStudentsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    StudentAttendanceComponent,
    StdDeleteDialogComponent,
    StdFormDialogComponent,
    AddArchivoComponent,
    FromDetailComponent,
    FormSolutionsComponent,
    FormImagenDetailComponent,
    FormAsignarComponent,
    FormSolutionsIncidenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    StudentsRoutingModule,
    ComponentsModule,
    SharedModule,
    StaffModule,
    //Base64UploadAdapter
  ],
  providers: [StudentsService, StudentAttendanceService, DepartmentService, IncideciaService,]
})
export class StudentsModule {}
