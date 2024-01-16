import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TeachersService } from './teachers.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Teachers } from './teachers.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { incidenciaSolucion, incidenciaSolucionPalabrasClave, objectTag, tag } from 'src/app/system-models/incidencia';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../admin/seguridad/seguridad.service';
import { parametroDetalle } from 'src/app/system-models/parametros';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER,COMMA } from '@angular/cdk/keycodes';
import { StudentsService } from '../../students/all-students/students.service';
import { AboutStudentComponent } from '../../students/about-student/about-student.component';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.sass'],
})
export class AllTeachersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    //'select',
    //'img',
    'idIncidencia',
    'nombreIncidencia',
    'comentario',
    // 'tipificacion',
    'solucion',
    //'email',
    //'date',
    'actions',
    'actions1',
  ];
  exampleDatabase: TeachersService | null;
  //dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Teachers>(true, []);
  id: number;
  removable = true;
  lista: any[];
  changeList: boolean=false;
  busqueda: any [];
  tagsCtrl = new UntypedFormControl();
  tagList: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<any[]>;
  menuForm: FormGroup;
  tagInput: ElementRef<HTMLInputElement>;
  AllTags: string[] = [];
  tagListBD: parametroDetalle[]=[];
  parDetalle:parametroDetalle = {
    id: 0,
    idParametro: 0,
    codigo: '',
    nombre: '',
    valor: '',
    valorEntero: 0,
    valorAuxiliar: '',
    idParametroPadre: 0,
    esActivo: 0
  };
  Soluciones: any;
  listSoluciones : any []=[];
  listaSoluciones: any []=[];
  listadeSoluciones: any []=[];
  teachers: Teachers | null;
  breadscrums = [
    {
      title: 'Todas las soluciones',
      items: ['Soluciones'],
      active: 'Todas las soluciones',
    },
  ];
  listTag: objectTag[]=[];
  listagadd: objectTag={
    tag: ''
  }
  tagSoluciones:tag[]=[]
  tagAdd:tag={
    id: 0,
    nombre: ''
  }
  tagsObj:incidenciaSolucionPalabrasClave={
    id: 0,
    idIncidenciaSolucion: 0,
    palabraClave: '',
    //tags: this.tagSoluciones
  }
  tipificaciones: any;
  classStar1:any ='material-icons';
  classStar2:any ='material-icons';
  classStar3:any ='material-icons';
  classStar4:any ='material-icons';
  classStar5:any ='material-icons';
  iconStar1:any='star_border'
  iconStar2:any='star_border'
  iconStar3:any='star_border'
  iconStar4:any='star_border'
  iconStar5:any='star_border'
  solucionObj: any;
  solucionImg: any;
 

  constructor(
    private studentsServ : StudentsService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private seguridadService : SeguridadService,
    private fb: FormBuilder,
    //public about:AboutStudentComponent
    
  ) {
    super();
    this.menuForm = this.createContactForm();
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.AllTags.slice()
      )
    ); 
    
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      tipoSolucion : [""],
      
    });
    
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
  add(event: MatChipInputEvent): void {
    this.listagadd ={
      tag: ''
    }
    const input = event.input;
    const value = event.value;
    // Agregar Tags
    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      
      this.listagadd.tag = value.trim();
      if(this.listagadd==undefined){
        this.loadData();
      }else{
      this.listTag.push(this.listagadd);}
    }
    // Resetear el input
    if (input) {
      input.value = '';
    }
    this.tagsCtrl.setValue(null);
    
    // this.tagAdd ={
    //   id: 0,
    //   nombre: ''
    // }
    // const input = event.input;
    // const value = event.value;
    // // Agregar Tags
    // if ((value || '').trim()) {
    //   this.tagList.push(value.trim());
    //   ////////////console.log("value:", value.trim())
    //   this.tagAdd.id=0;
    //   this.tagAdd.nombre = value.trim();
    //   this.tagSoluciones.push(this.tagAdd);
    // }
    // // Resetear el input
    // if (input) {
    //   input.value = '';
    // }
    // this.tagsCtrl.setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void { 
    this.listagadd ={
      tag: ''
    }
    let nombre_ =event.option.viewValue;
    this.parDetalle = this.tagListBD.filter( x => x.nombre == nombre_)[0];
    this.listagadd.tag = nombre_;
    this.listTag.push(this.listagadd); 
    ////////////console.log("listtag",this.listTag);
    this.tagAdd ={
      id: 0,
      nombre: ''
    }
    let _nombre =event.option.viewValue;
    this.parDetalle = this.tagListBD.filter( x => x.nombre == _nombre)[0];
    
    this.tagAdd.id=this.parDetalle.id;
    this.tagAdd.nombre = _nombre;
    this.tagSoluciones.push(this.tagAdd);
    
  ////////////console.log("tagSoluciones:", this.tagSoluciones)
    this.tagList.push(event.option.viewValue);
   // this.tagInput.nativeElement.value = '';
    ////////////console.log("tagList",this.tagList);
    this.tagsCtrl.setValue(null);
    
    
  }
  verIncidencia(par){
    
    this.teachersService.Incidenciadetalle = par;

    this.router.navigate(['/soporte/soluciones/about-teacher']);
  }
  verSolucion(){
    const dialogRef = this.dialog.open(FormDialogComponent, {
           
    });
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
  remove(tag: string): void {
    //////////console.log("tag",tag);
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this.tagList.splice(index, 1);
      
    }
    //////////console.log("listaremove",this.tagList);
    

    //this.listTag=this.listTag[''];
    this.listadeSoluciones = this.listaSoluciones;
  }
  search() {
    if(this.listTag == undefined){
      this.loadData();
    }else{
  //console.log("busqueda",this.listTag);
  this.teachersService.obtenerLista(this.listTag).subscribe(res=>{
    
    this.listSoluciones=res.objModel;
    //console.log("lista de soluciones",this.listSoluciones);
    if(this.listTag.length==null){
      this.changeList= false;
    }else{
    this.changeList= true;
    }
    this.loadData();

  })
}
  this.listTag=[];
  
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
        teachers: this.teachers,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.teachersService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editCall(row) {
    //console.log("dato",row);
    this.teachersService.getSolutionById(row.idSolucion).subscribe(res =>{
      this.solucionObj = res.objModel;
      this.teachersService.getSolutionImg(row.idSolucion).subscribe(res=>{
        this.solucionImg = res.objModel;
        const dialogRef = this.dialog.open(FormDialogComponent, {
          data: {
            solucionObj: this.solucionObj,
            solucionImg: this.solucionImg,
          }
         
        });
        this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
          if (result === 1) {
            
          }
        });
      })
    
    })
    
    
  }
  deleteItem() {
    
    //this.StudentsService.Incidenciadetalle = par;
    this.router.navigate(['/admin/incidencias/incidencia-detalle']);
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    
  }
  removeSelectedRows() {
   
  }
  public loadData() { 
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.studentsServ.getlistSoluciones(user.id).subscribe(res=>{
      ////console.log("ressoluciones",res.objModel);
      this.listaSoluciones = res.objModel;
      //console.log("soluciones",this.listaSoluciones);
      if(this.changeList==false){

        this.listadeSoluciones = this.listaSoluciones;
       }else {
        this.listadeSoluciones = this.listSoluciones;
       }
    })
     

    

    //this.teachersService.getAllSolutions().
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      
      this.tipificaciones = res;
    })
    this.exampleDatabase = new TeachersService(this.httpClient);
    ////////////console.log("exampledatabase",this.exampleDatabase);
    //if(this.exampleDatabase.value){}
    
    
    
    
    this.seguridadService.getParameterDetails(13).subscribe(res =>{
      this.Soluciones = res;
      
      let a = this.Soluciones.nombre;
      
    })
    this.seguridadService.getParameterDetails(14).subscribe(res =>{
      this.tagListBD = res;
      this.tagListBD.forEach(element => {
        this.AllTags.push(element.nombre);
        
      });
      ////////////console.log("PalabraClave",this.AllTags);
    })
    
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
  onContextMenu(event: MouseEvent, item: Teachers) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

