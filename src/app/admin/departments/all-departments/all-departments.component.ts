import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from './department.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department } from './department.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from './../../../shared/UnsubscribeOnDestroyAdapter';
import { FormSistemasComponent } from './dialogs/form-sistemas/form-sistemas.component';
import Swal from 'sweetalert2';
import { deleteObj } from 'src/app/system-models/deleteObj';
import { FromANSComponent } from './dialogs/from-ans/from-ans.component';
import { FromHorarioComponent } from './dialogs/from-horario/from-horario.component';
import { FormTipificacionesEmpresaComponent } from './dialogs/form-tipificaciones-empresa/form-tipificaciones-empresa.component';

@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.sass'],
})
export class AllDepartmentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'dName',
    'hod',
    'phone',
    'nombreContacto',
    'emailContacto',   
    'urlWeb',
    'actions',
    'actions2',
    'actions3',
    'actions4',
    'actions5',
  ];
  exampleDatabase: DepartmentService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Department>(true, []);
  id: number;
  department: Department | null;
  breadscrums = [
    {
      title: 'Todas las Empresas',
      items: ['Empresas'],
      active: 'Todas',
    },
  ];
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  tiposServicios: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    super();
    this.departmentService.getTipoEmpresa(5).subscribe(res =>{
      this.tiposServicios = res;
      ////////////console.log("serv:", res)
    })
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        department: this.department,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se ingresó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadData();
    });
  }
  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        department: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {      
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó la contraseña con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadData();
    });
  }
  addSystems(row){
    const dialogRef = this.dialog.open(FormSistemasComponent, {
      data: row
      
    });
  }
  addSystems1(row){
    const dialogRef = this.dialog.open(FromANSComponent, {
      data: row
      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadData();
    });
  }
  addSystems2(row){
    const dialogRef = this.dialog.open(FromHorarioComponent, {
      data: row
      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadData();
    });
  }
  addTipificaciones(row){
    //console.log("row",row);
    const dialogRef = this.dialog.open(FormTipificacionesEmpresaComponent, {
      data: row
      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadData();
    });
  }
  deleteItem(row) {
    Swal.fire({
      //imageUrl: 'assets/images/banner/banner_swal.png',
      title: '¿Estas seguro?',
      text: "Se eliminará el registro: " + row.razonSocial,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.value) {        
        this.deleteObj.id = row.id;
        this.deleteObj.valor = 0;
        this.deleteObj.tabla='[persona].[empresas]';
        this.departmentService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.loadData();
        })
        
      }
    }); 
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // //////////console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Department>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new DepartmentService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Department) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<Department> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Department[] = [];
  renderedData: Department[] = [];
  constructor(
    public exampleDatabase: DepartmentService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Department[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllDepartments();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((department: Department) => {
            const searchStr = (
              department.numeroRUC +
              department.razonSocial +
              department.direccion +
              department.urlWeb
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
  sortData(data: Department[]): Department[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'dName':
          [propertyA, propertyB] = [a.numeroRUC, b.numeroRUC];
          break;
        case 'hod':
          [propertyA, propertyB] = [a.razonSocial, b.razonSocial];
          break;
        // case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
        case 'phone':
          [propertyA, propertyB] = [a.direccion, b.direccion];
          break;
        case 'email':
          [propertyA, propertyB] = [a.urlWeb, b.urlWeb];
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
