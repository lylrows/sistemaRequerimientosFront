import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { GaugeModule } from 'angular-gauge';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { DeleteDialogComponent } from './lectures/dialogs/delete/delete.component';
import { FormDialogComponent } from './lectures/dialogs/form-dialog/form-dialog.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SettingsComponent } from './settings/settings.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { LecturesService } from './lectures/lectures.service';
import { LeaveRequestService } from './leave-request/leave-request.service';
import { ExamScheduleService } from './exam-schedule/exam-schedule.service';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormClientePassComponent } from './dashboard/form-cliente-pass/form-cliente-pass.component';
import { StaffService } from '../admin/staff/all-staff/staff.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    LecturesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    LeaveRequestComponent,
    SettingsComponent,
    ExamScheduleComponent,
    FormClientePassComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    GaugeModule.forRoot(),
    FormsModule,
    chartjsModule,
    NgxGaugeModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    //MatIconModule,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
    NgxPaginationModule,
    MatRadioModule,
    
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'es' },LecturesService, LeaveRequestService, ExamScheduleService,StaffService, DatePipe],
})
export class TeacherModule {}
