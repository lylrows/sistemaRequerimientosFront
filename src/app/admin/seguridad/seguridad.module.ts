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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {SeguridadRoutingModule} from './seguridad-routing.module'
import {SeguridadService} from './seguridad.service'
import { ParametrosComponent } from './parametros/parametros.component';
import { FormDialogParameterComponent } from './parametros/form-dialog-parameter/form-dialog-parameter.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { ConstantesComponent } from './constantes/constantes.component';
import { FormDialogConstantesComponent } from './constantes/form-dialog-constantes/form-dialog-constantes.component';
import { FormDialogPerfilesComponent } from './perfiles/form-dialog-perfiles/form-dialog-perfiles.component';
import { FormDialogParameterDetailComponent } from './parametros/form-dialog-parameter-detail/form-dialog-parameter-detail.component';



@NgModule({
  declarations: [
    ParametrosComponent,
    FormDialogParameterComponent,
    PerfilesComponent,
    ConstantesComponent,
    FormDialogConstantesComponent,
    FormDialogPerfilesComponent,
    FormDialogParameterDetailComponent,
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
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    SeguridadRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
  ],
  providers:[SeguridadService]
})
export class SeguridadModule { }
