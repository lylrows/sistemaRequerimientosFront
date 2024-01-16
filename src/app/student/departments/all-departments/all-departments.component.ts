import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from './department.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department } from './department.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
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
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mejoraDTO, tagsIncidenciaDTO } from 'src/app/system-models/mejoras';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
    //'select',
    'id',
    'dName',    
    'phone',
    'nombreContacto',
    'emailContacto',   
    'urlWeb',
    'aprobado',
    'hod',
    'estado',
    //'resgistro',
    'actions',
    'actions2',
    'actions3',
    //'actions4',
  ];
  displayedColumnsTag = [
    //'select',
    'select',
    'id',
    'dName',
    'hod',
    'phone',
    'nombreContacto',
    'emailContacto',   
    'urlWeb',
    'aprobado',
    //'estado',
    //'resgistro',
    'actions',
    //'actions2',
    //'actions3',
    //'actions4',
  ];
  exampleDatabase: DepartmentService | null;
  dataSource: ExampleDataSource | null;
  dataSourceTag: ExampleDataSourceTag | null;
  selection = new SelectionModel<Department>(true, []);
  id: number;
  users = JSON.parse(localStorage.getItem('currentUser'));
  nivelSoporte: any;
  filterForm:FormGroup;
  idEmpresa: number;
  department: Department | null;
  toDay : Date = new Date();
  estadosMejora : any[] = [];
  selectionTag = new SelectionModel<any>(true, []);

  breadscrums = [
    {
      title: 'Todas las mejoras',
      items: ['Mejoras'],
      active: 'Todas las mejoras',
    },
  ];
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  tiposServicios: any;
  listaEmpresas: any;
  sistemaEmpresas: any;  
  estados: any;
  items: any;
  selectedItems = [];
  empresas: { idEmpresa: any; razonSocial: any; }[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();   
    this.toDay.setDate(this.toDay.getDate() + 1);
    let users= JSON.parse(localStorage.getItem('currentUser')); 
    this.departmentService.getEmpresas(users.id).subscribe( res => {
      this.departmentService.getParameterDetail(17).subscribe( estados =>{   
        this.estadosMejora = estados.map(estado => ({
          value: estado.valorEntero,
          label: estado.nombre,
          select: false
        }));
        
        const uniqueCompanies = Array.from(new Set(res.objModel.map(item => item.idEmpresa)))
        .map(idEmpresa => {
          return res.objModel.find(item => item.idEmpresa === idEmpresa);
        })
        .map(item => ({ idEmpresa: item.idEmpresa, razonSocial: item.razonSocial }));      
      this.empresas =uniqueCompanies;
      this.filterForm = this.createFilterForms();
      this.loadData();
      this.loadDataTag();
      //console.log("estadosMejora",this.estadosMejora);
      })
    
    })
    this.filterForm = this.createFilterForms();
  }
 
  createFilterForms(): FormGroup<any> {
    let fechaInicio = new Date(this.toDay.getFullYear(), this.toDay.getMonth(), 1);
    return this.fb.group({
      fechaInicio: [fechaInicio],
      fechaFin: [this.toDay],
      idEmpresa:[this.empresas.length == 0?0:this.empresas[0].idEmpresa],
      estados:[[]],
      solucionRaiz : -1
    })
  }
  @ViewChild('picker2') picker2: MatDatepicker<Date>;
  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)  
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatSelect) matSelect: MatSelect;
  ngOnInit() {
    this.loadParameters();
    //this.loadData();
    
  }
  loadParameters() {
    this.departmentService.getParameterDetail(17).subscribe( res => {
      this.estados = res;
      this.items = this.estados.map(estado => ({
        name: estado.nombre,
        value: estado.valorEntero,
        selected: false,
      }));
      //console.log("estados", this.items)
    })
  }
  refresh() {
    let fechaF = this.filterForm.get('fechaFin').value;
    const fechaFin = new Date(fechaF);
    fechaFin.setDate(fechaFin.getDate() + 1);
    this.filterForm.get('fechaFin').setValue(fechaFin);
    this.loadData();
    this.filterForm.get('fechaFin').setValue(fechaF);
  }
  refreshTag(){
    let fechaF = this.filterForm.get('fechaFin').value;
    const fechaFin = new Date(fechaF);
    fechaFin.setDate(fechaFin.getDate() + 1);
    this.filterForm.get('fechaFin').setValue(fechaFin);
    this.loadDataTag();
    this.filterForm.get('fechaFin').setValue(fechaF);
  }
  addNew() {
    this.departmentService.Incidenciadetalle = null;
    this.router.navigate(['/soporte/mejoras/mejoras']);
    
  }
  editCall(row) {
    //console.log("row", row)
    this.departmentService.getMejoraById(row.idMejora).subscribe( res =>{  
      //console.log("mejora", res.objModel)    
      this.departmentService.mejoraDTO = res.objModel;
      this.router.navigate(['/soporte/mejoras/mejora-detalle']);
    })
    /*this.departmentService.Incidenciadetalle = row;
    this.router.navigate(['/soporte/mejoras/mejoras']);*/
    
  }
  onCheckChange(event: MatSelectChange, matSelect: MatSelect) {
    if (event.value.includes("-1")) {
      this.estadosMejora.forEach(estado => estado.select = false);
      this.filterForm.get('estados').setValue([]);
      setTimeout(() => matSelect.close(), 0);
      this.loadData();
    }else{
      const selectedValues = event.value;
      this.estadosMejora.forEach(estado => {
        estado.select = selectedValues.includes(estado.value);
      });
    } 
   
    //console.log("form", this.filterForm.value);
    //console.log("event", event);
  }
  onTabChanged(event: MatTabChangeEvent){
    console.log('Tab index: ' + event.index);
    if(event.index == 0){
      this.breadscrums = [
        {
          title: 'Todas las mejoras',
          items: ['Mejoras'],
          active: 'Todas las mejoras',
        },
      ];
    }else if(event.index == 1){
      this.breadscrums = [
        {
          title: 'Soluciones raiz',
          items: ['Mejoras'],
          active: 'Análisis',
        },
      ];
    }
  }
  typeBtnClick(value : string){
    console.log("value", value)
  }
  detalleTicket(row){
    console.log("selectionTag", this.selectionTag.selected)
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
  addSystems(row){
    ////console.log("row",row);
    /*if(row.usuarioAsignado == null ||row.usuarioAsignado == undefined){
      Swal.fire('Advertencia', 'La mejora no se le ha sido asingada.', 'warning');
      return;
     }*/
     if(row.estadoMejora == 'Pendiente' || row.estadoMejora == 'Rechazado' ){
      Swal.fire('Advertencia', 'Cuando la mejora sea aprobada  o en curso, podrá registrar actividades.', 'warning');
      return;
     }
    const dialogRef = this.dialog.open(FormSistemasComponent, {
      data: row
      
    });
  }
  onSelectionChange(event: MatSelectChange) {
    ////console.log("selectedItems", this.selectedItems)
    //console.log("event", event)
    const lastSelectedValue = event.value[0];
    if (lastSelectedValue === "-1") {
      this.selectedItems = [];
      this.matSelect.close();
    }
  }
  addSoporte(row){
    //console.log("aprobado",row);
    if(row.estadoMejora == 'Pendiente' || row.estadoMejora == 'Rechazado' || row.estadoMejora == 'Culminado'){
      Swal.fire('Advertencia', 'Cuando la mejora sea aprobada o en curso, podrá asignar al soporte.', 'warning');
      return;
     }
     const dialogRef = this.dialog.open(FormDialogComponent, {
      data: row
    })   
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se asignó la incidencia con éxito.',
          showConfirmButton: true,
        });
        this.refresh();
      }

    })
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
      // ////////////console.log(this.dataSource.renderedData.findIndex((d) => d === item));
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
  public  loadDataTag() {
    this.exampleDatabase = new DepartmentService(this.httpClient);
    this.dataSourceTag = new ExampleDataSourceTag(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.filterForm.value
    );
  }
  public loadData() {
    this.exampleDatabase = new DepartmentService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.filterForm.value
    );
    /*this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );*/
    /*this.departmentService.getNivelSoporteById(this.users.id).subscribe(res =>{
      //console.log("soporteEmp", res.objModel)
      let listaFiltrada = res.objModel.filter((item, index, self) => 
        index === self.findIndex((t) => (
            t.idEmpresa === item.idEmpresa && t.razonSocial === item.razonSocial
        ))
      );
      this.listaEmpresas = listaFiltrada.map(item => ({id: item.idEmpresa, razonSocial: item.razonSocial}));
    this.sistemaEmpresas = res.objModel;    
    //console.log("sistemas",this.sistemaEmpresas);    
  })
  let nivel = this.sistemaEmpresas.filter(x =>x.idEmpresa == this.idEmpresa)
      this.nivelSoporte=nivel[0].idNivelSoporte;
      //console.log("nivel soporte",this.nivelSoporte);*/
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
export class ExampleDataSourceTag extends DataSource<tagsIncidenciaDTO>{
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredDataTag: tagsIncidenciaDTO[] = [];
  renderedDataTag: tagsIncidenciaDTO[] = [];
  constructor(
    public exampleDatabase: DepartmentService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public filterForm: any
  ){
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(): Observable<tagsIncidenciaDTO[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeTag,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.postAllTagIncidencias(this.filterForm);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredDataTag = this.exampleDatabase.dataTag
          .slice()
          .filter((tag: tagsIncidenciaDTO) => {
            const searchStr = (
              tag.idIncidencia +
              tag.incidenciaNombre +
              tag.ticketId +
              tag.soporte
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredDataTag.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedDataTag = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedDataTag;
      })
    );
  }
  disconnect(): void { }
  sortData(data: tagsIncidenciaDTO[]): tagsIncidenciaDTO[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.idIncidencia, b.idIncidencia];
          break;
        case 'dName':
          [propertyA, propertyB] = [a.incidenciaNombre, b.incidenciaNombre];
          break;
        case 'hod':
          [propertyA, propertyB] = [a.ticketId, b.ticketId];
          break;
        // case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
        case 'phone':
          [propertyA, propertyB] = [a.soporte, b.soporte];
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
    public _sort: MatSort,
    public filterForm: any
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
    this.exampleDatabase.postAllMejorasById(this.filterForm);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((department: Department) => {
            const searchStr = (
              department.titulo +
              department.descripcion +
              department.idEstado +
              department.prioridad
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
          [propertyA, propertyB] = [a.id_mejora, b.id_mejora];
          break;
        case 'dName':
          [propertyA, propertyB] = [a.descripcion, b.descripcion];
          break;
        case 'hod':
          [propertyA, propertyB] = [a.idEstado, b.idEstado];
          break;
        // case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
        case 'phone':
          [propertyA, propertyB] = [a.titulo, b.titulo];
          break;
        case 'email':
          [propertyA, propertyB] = [a.prioridad, b.prioridad];
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
