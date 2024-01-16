import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { Students } from './students.model';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { deleteObj } from 'src/app/system-models/deleteObj';
import Swal from 'sweetalert2';
import { FormSolutionsComponent } from '../form-solutions/form-solutions.component';
import { FormAsignarComponent } from './dialogs/form-asignar/form-asignar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseDTO } from 'src/app/system-models/responseApi';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  breadscrums = [
    {
      title: 'Tickets',
      items: ['Tickets'],
      active: 'Todos los Tickets',
    },
  ];
  
  incidenciaList:Students[]=[];
  incidenciaLista: any []=[];
  incidenciaListaAux: any []=[];
  studentsDetalleLis:Students[] = [];
  boolDetail:boolean=false;
  idStudents: number;
  Students: Students;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  ListAux: any;
  ListAuxDet: any;
  sistemasList: any[]=[];
  filterForms:FormGroup;
  filterForms2:FormGroup;
  sistemaEmpresas: any;
  sistemas: any;
  idEmpresa: number;
  nivelSoporte: string='';
  constructor(private StudentsService : StudentsService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder) {
    super();
    this.filterForms = this.filterFormCreate();
    this.filterForms2 = this.filterFormCreate2();

  }
  filterFormCreate2(): FormGroup<any> {
    return this.fb.group({
      idSistema:['']
    })
  }
  filterFormCreate(): FormGroup<any> {
    return this.fb.group({
      idEmpresa:['']
    })
  }
  
  @ViewChild('filterStudents', { static: true }) filterStudents: ElementRef;
  @ViewChild('filterDetail', { static: true }) filterDetail: ElementRef;
  ngOnInit(): void {
    let users= JSON.parse(localStorage.getItem('currentUser'));
    ////////////console.log("user",users);
    this.LoadParameters();
    
  }
  
  LoadParameters() {  
    let users= JSON.parse(localStorage.getItem('currentUser'));
    //////////console.log("users", users)
    if(users.role == 'Cliente'){
      this.StudentsService.getAllIncidencias(users.role, users.id,0).subscribe(res =>{
        //////////console.log("incidencias", res.objModel)
        this.incidenciaLista=res.objModel;
      })
    }else{
      this.StudentsService.getNivelSoporteById(users.id).subscribe(res =>{
        let sistemas =res.objModel;
        this.sistemaEmpresas = res.objModel;
        sistemas.forEach(element => {
         if(this.sistemasList.length == 0){
          this.sistemasList.push(element);
         }else{
         let content = this.sistemasList.filter( x => x.idEmpresa == element.idEmpresa);        
         if(content.length == 0){
          this.sistemasList.push(element);
         }
         }
        }); 
        //////////console.log("empresas",this.sistemasList)
      })
    }
  }
  addNew(){
    this.router.navigate(['/admin/incidencias/agregar-incidencia']);   
  }
  refresh(){
    this.LoadParameters();
  }
  stringToHTML(str) {
    
    //var tempDivElement = document.createElement("@efitec-corp.com");
    //tempDivElement.innerHTML = str; 
    //return tempDivElement.textContent || tempDivElement.innerText || "";
    //str.replace(/^([^]+)@(\w+).(\w+)$/, '');//<[^@>]+>/g
    ////////////console.log("str",str)
 }
  removeSelectedRows(){

  }
  buscar(event : any){
    //////////console.log("event",event.target.value);
    let filter = event.target.value;
     
      if(filter.length >=2){
        this.incidenciaListaAux = this.incidenciaLista.filter(x => x.incidente.toLowerCase().includes(filter.toLowerCase())
        || x.usuarioReg.toLowerCase().includes(filter.toLowerCase())||x.prioridad.toLowerCase().includes(filter.toLowerCase())
        || x.estado.toLowerCase().includes(filter.toLowerCase()) ); 
       
      }else {
          this.incidenciaListaAux = this.incidenciaLista;
         }
      
  }
  editParameter(par:Students){
    ////////////console.log("row", par)
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data:{
        Students:par,
        accion:'editar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.LoadParameters();
    });
  }
  solucion(pp){
    const dialogRef = this.dialog.open(FormSolutionsComponent,{
      data:{
        incidencia:pp        
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se ingresó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.LoadParameters();
    });
  }
  asignarIncidencia(pp){
    ////////////console.log("inc", pp) 
    const dialogRef = this.dialog.open(FormAsignarComponent, {
      data: pp
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
      }
    })
  }
    
  deleteParameter(par:Students){
    Swal.fire({
      //imageUrl: 'assets/images/banner/banner_swal.png',
      title: '¿Estas seguro?',
      text: "Se eliminará el registro: " + par.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.value) {
        ////////////console.log("row", par)
        this.deleteObj.id = par.id;
        this.deleteObj.valor = 0;
        this.deleteObj.tabla='[configuracion].[parametros]';
        this.StudentsService.esActivo(this.deleteObj).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Eliminado!', 'Su registro ha sido eliminado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }
          this.LoadParameters();
        })
        
      }
    }); 
  }
  detailParameter(par:Students){ 
   this.StudentsService.Incidenciadetalle = par;
   this.router.navigate(['/admin/incidencias/incidencia-detalle']);
  }
  addNewDetalle(){
   
  }
  refreshDetalle(){
    this.detailParameter(this.Students);
  }
  selectEmpresa(event){
    //////////console.log("idEmpresa",event.value)
    this.idEmpresa = Number(event.value);
    //////////console.log("sistemaEmpresas",this.sistemaEmpresas)
    this.sistemas = this.sistemaEmpresas.filter(x =>x.idEmpresa == event.value)
    this.nivelSoporte='';
    this.incidenciaLista=[];
    this.incidenciaListaAux=[];
  }
  selectSistema(event){
    //////////console.log("idSistema",event.value)
    let nivel = this.sistemaEmpresas.filter(x =>x.idEmpresa == this.idEmpresa && x.idSistema == event.value)
    //////////console.log("nivel", nivel[0])
    this.nivelSoporte=nivel[0].idNivelSoporte;
    let sistema = nivel[0].nombreSistema;
    let users= JSON.parse(localStorage.getItem('currentUser'));
    this.StudentsService.getAllIncidencias(users.role, users.id,nivel[0].idNivelSoporte).subscribe(res =>{
      //////////console.log("incidencias", res.objModel)
      this.incidenciaLista=res.objModel.filter(x => x.nombreSistema == sistema);
      //////////console.log("incidencialista",this.incidenciaLista)
      this.incidenciaListaAux=res.objModel.filter(x => x.nombreSistema == sistema);
    })
  }
}