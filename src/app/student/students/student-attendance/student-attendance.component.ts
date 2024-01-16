import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentAttendanceService } from './attendance.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentAttendance } from './student-attendance.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Department } from '../../departments/all-departments/department.model';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { DepartmentService } from '../../departments/all-departments/department.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentAttendanceComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    //'select',
    'idTicket',
    'solicitante',
    'fechaRegistro',
    'tituloTicket',
    'estado',   
    'razonSocial',
    'sistema',
    'prioridad',
    'responsable',
    'fechaAtencion',
    'tipificacion',
    'tipo',
    'horasEstimadas',
    'horasEjecutadas',
    'ANS',
    'actions'
   ];
   filterForm : FormGroup;
   contextMenuPosition = { x: '0px', y: '0px' };
  exampleDatabase: StudentAttendanceService | null ;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<StudentAttendance>(true, []);
  id: number;
  studentAttendance: StudentAttendance | null;
  prueba: any []=[];
  prueba1: any []=[];
  prueba2: any []=[];
  breadscrums = [
    {
      title: 'Reporte',
      items: ['Incidencias'],
      active: 'Reportes',
    },
  ];
    
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;  
  @ViewChild('picker2') picker2: MatDatepicker<Date>;
  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  toDay : Date = new Date();
  empresas: { idEmpresa: any; razonSocial: any; }[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentAttendanceService: StudentAttendanceService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    super();
    let users= JSON.parse(localStorage.getItem('currentUser')); 
    this.studentAttendanceService.getEmpresas(users.id).subscribe( res =>{
      ////console.log("res", res.objModel);
      const uniqueCompanies = Array.from(new Set(res.objModel.map(item => item.idEmpresa)))
        .map(idEmpresa => {
          return res.objModel.find(item => item.idEmpresa === idEmpresa);
        })
        .map(item => ({ idEmpresa: item.idEmpresa, razonSocial: item.razonSocial }));

      ////console.log("list",uniqueCompanies);
      this.empresas =uniqueCompanies;
      this.filterForm = this.createFilterForm();
      this.loadData();
    })
    this.filterForm = this.createFilterForm();
  }
  createFilterForm(): FormGroup<any> {
    let fechaInicio = new Date(this.toDay.getFullYear(), this.toDay.getMonth(), 1);
    //fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  
    return this.fb.group({
      fechaInicio: [fechaInicio],
      fechaFin: [this.toDay],
      idEmpresa:[this.empresas.length == 0?0:this.empresas[0].idEmpresa]
    });
  }
  ngOnInit() {
    
   
  }
    
  editCall(id : number){
    this.studentAttendanceService.getComentarios(id).subscribe( res =>{
      //console.log("comentarios", res.objModel)
      const dialogRef = this.dialog.open(FormDialogComponent, {
        data: {
          comentarios: res.objModel
        }       
      });
    })
  }

  refresh() {
    this.loadData();
  }
  

  exportarReporte(){

  }
  validateDates() {
    const fechaInicio = this.filterForm.get('fechaInicio').value;
    const fechaFin = this.filterForm.get('fechaFin').value;
    if (fechaInicio && fechaFin) {
      if (fechaFin < fechaInicio) {
        this.picker2.close();
        this.picker1.close();
        Swal.fire('Error', 'La fecha final no puede ser menor a la fecha inicial', 'error');
        //alert('La fecha final no puede ser menor a la fecha inicial');
        this.filterForm.get('fechaInicio').setValue('');
        this.filterForm.get('fechaFin').setValue('');
      }
    }
  }
  

  public loadData() {
    
       this.exampleDatabase = new StudentAttendanceService(this.httpClient);
      this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort,
        this.filterForm.value
      );
    
   
  }
 
  
}

export class ExampleDataSource extends DataSource<StudentAttendance> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: StudentAttendance[] = [];
  renderedData: StudentAttendance[] = [];
  constructor(
    public exampleDatabase: StudentAttendanceService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public filterForm: any
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<StudentAttendance[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllStudentAttendances(this.filterForm);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((student: StudentAttendance) => {
            const searchStr = (
              student.idTicket +
              student.solicitante +
              student.fechaRegistro +
              student.tituloTicket
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: StudentAttendance[]): StudentAttendance[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.idTicket, b.idTicket];
          break;
        case 'rollNo':
          [propertyA, propertyB] = [a.solicitante, b.solicitante];
          break;
        case 'sName':
          [propertyA, propertyB] = [a.fechaRegistro, b.fechaRegistro];
          break;
        // case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
        case 'class':
          [propertyA, propertyB] = [a.tituloTicket, b.tituloTicket];
          break;
        case 'status':
          [propertyA, propertyB] = [a.estado, b.estado];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }  
}




