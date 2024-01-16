import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { emissionOrdersGrid, Students } from './students.model';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { FormPedidoComponent } from './dialogs/form-pedido/form-pedido.component'
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { deleteObj } from 'src/app/system-models/deleteObj';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { pedidos } from 'src/app/system-models/emision';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  title = 'Tickets'
  itemsB = ['Tickets']
  active = 'Todos los Tickets'

  breadscrums = [
    {
      title:this.title,
      items: this.itemsB,
      active: this.active,
    },
  ];
  incidenciaList:Students[]=[];
  studentsDetalleLis:Students[] = [];
  boolDetail:boolean=false;
  idStudents: number;
  incidenciaLista: any []=[];
  incidenciaListaAux: any []=[];
  showEmisionTab: boolean = false;
  gridList : emissionOrdersGrid[] = [];
idEmpresa: any;
sistemaEmpresas: any;
nivelSoporte: string='';
sistemas: any;

  Incidenciadetalle: any;
  Students: Students;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  ListAux: any;
  ListAuxDet: any;
  users: any;
  page:number;
  items:number=10;
  filterForms: FormGroup;
  estados: any;
  items2: number;
  page2: number;
  gridListAux: any;
  idTipoEmision: boolean = false ;
  constructor(private StudentsService : StudentsService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder) {
    super();
    this.idTipoEmision = Number(JSON.parse(localStorage.getItem('currentUser')).idTipoEmision) == 1? false : true;
    this.users= JSON.parse(localStorage.getItem('currentUser'));
    //////console.log("user_ticket",this.users);
    this.filterForms = this.createFilterForms();
    if(this.users.idTipoEmision == 1 || this.users.idTipoEmision == 2){
      this.showEmisionTab = true;
    }
  }
  createFilterForms(): FormGroup<any> {
    return this.fb.group({
      idEmpresa: [''],
      idEstado: [-1],
      idSistema: [-1]
    })
  }
  @ViewChild('filterStudents', { static: true }) filterStudents: ElementRef;
  @ViewChild('filterDetail', { static: true }) filterDetail: ElementRef;
  ngOnInit(): void {
    this.selectSistema();
    this.LoadParameters();
    // this.selectEmpresa(event);
    // this.selectSistema(event);
  }
  selectSistema(){
    let users= JSON.parse(localStorage.getItem('currentUser'));
    // if(this.users.isGerente){
      this.StudentsService.getSistemasByEmpresa(users.idEmpresa).subscribe(res=>{
        //////console.log("sistema",res.objModel)
        this.sistemas = res.objModel
      })
  }
  selectEmpresa(event){
    //console.log("evento",event.value);     
    let sistema = event.value;    
    let estado = this.filterForms.get('idEstado')?.value;
    this.incidenciaListaAux=[];
    if(event.value == -1 && estado == -1){
      this.incidenciaListaAux=this.incidenciaLista;
    }else if(event.value != -1 && estado == -1){
      this.incidenciaListaAux=this.incidenciaLista.filter(x => x.nombreSistema == sistema);
    }else if(event.value == -1 && estado != -1){
      this.incidenciaListaAux=this.incidenciaLista.filter(x => x.estado == estado);
    }else{
      this.incidenciaListaAux=this.incidenciaLista.filter(x => x.nombreSistema == sistema && x.estado == estado);
    }    
    this.nivelSoporte='';    
    if(this.incidenciaListaAux.length<10){
      this.items = this.incidenciaListaAux.length;
      this.page=1;
    }else{
      this.items = 10;
      this.page=1;
    }
  }
  onTabChange(event: MatTabChangeEvent): void{
    if (event.index === 0){
      this.title = 'Tickets'
      this.itemsB = ['Tickets']
      this.active = 'Todos los Tickets'
    
    }else{
      this.title = 'Emisión'
      this.itemsB = ['Pedido']
      this.active = 'Todos los Pedidos'
      this.loadPedidos();
    }    
    this.breadscrums = [
      {
        title:this.title,
        items: this.itemsB,
        active: this.active,
      },
    ];
  }
  loadPedidos() {
    this.StudentsService.getEmissionOrdersGrid().subscribe( res => {
      //console.log("pedidos", res.objModel)    
      if(this.users.idTipoEmision == 2){
        this.gridList  = res.objModel.filter( x => x.idUsuarioRegistro == this.users.id);
        this.gridListAux  = res.objModel.filter( x => x.idUsuarioRegistro == this.users.id);
      }else{
        this.gridList  = res.objModel
        this.gridListAux  = res.objModel
      }
      
      if(this.gridList.length<10){
        this.items2 = this.gridList.length;
        this.page2=1;
      }else{
        this.items2 = 10;
        this.page2=1;
      }
    })
  }
  asignarPerido(pp){
    //console.log("asignarPerido", pp)
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data:{
        pedido:pp
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se asignó el registro con éxito.',
          showConfirmButton: true,
        });
      }
      this.loadPedidos();
    });
  }
  buscarPedido(event){
    if(event.length >= 3){
      //console.log("event", event)
      this.gridList = this.gridListAux.filter( x => x.usuarioAtendido.toLowerCase().includes(event.toLowerCase()) || x.usuarioRegistro.toLowerCase().includes(event.toLowerCase()) );
    }else{
      this.gridList = this.gridListAux
    }
  }
  refreshPedidos(){
    this.loadPedidos();
  }
  buscar(event : any){
    //////////console.log("event",event.target.value);
    let filter = event.target.value;
     
      if(filter.length >=2){
        this.incidenciaListaAux = this.incidenciaLista.filter(x => x.incidente.toLowerCase().includes(filter.toLowerCase())
        || x.usuarioReg.toLowerCase().includes(filter.toLowerCase())||x.prioridad.toLowerCase().includes(filter.toLowerCase())
        || x.estado.toLowerCase().includes(filter.toLowerCase()) || x.nombreSistema.toLowerCase().includes(filter.toLowerCase())); 
       
      }else {
          this.incidenciaListaAux = this.incidenciaLista;
         }
      
  }
  LoadParameters() {
    if(this.users.isGerente){
      this.StudentsService.getTicketsGerenteCliente(this.users.id).subscribe( res =>{
        //////console.log("TicketsGerente",res.objModel);
        this.incidenciaLista=res.objModel;
        this.incidenciaListaAux=res.objModel;
        //console.log("incidencia",this.incidenciaListaAux);
      })
    }else{
      this.StudentsService.getAllStudentss(this.users.role, this.users.id,0).subscribe(res =>{
        this.incidenciaLista=res.objModel;
        this.incidenciaListaAux=res.objModel;
        //console.log("incidencia",this.incidenciaListaAux);
      })
    }
    this.StudentsService.getParameterDetail(11).subscribe( res => {
      this.estados = res;
      //////console.log("estados",this.estados)
    })
  }

  addNew(){
    this.router.navigate(['/cliente/incidencias/agregar-incidencia']);
  }
  addNewPedido(){
    this.router.navigate(['/cliente/incidencias/agregar-incidencia']);
  }
  refresh(){
    this.LoadParameters();
  }
  removeSelectedRows(){

  }
  editParameter(par:Students){
    ////////////console.log("row", par)
    
  }

  selectEstado(event){
    let estados = event.value
    let sistema = this.filterForms.get('idSistema')?.value;
    if(sistema == -1 && event.value != -1){
      this.incidenciaListaAux= this.incidenciaLista.filter(x => x.estado == estados)
    }else if(sistema == -1 && event.value == -1){
      this.incidenciaListaAux= this.incidenciaLista
    }else if(sistema != -1 && event.value == -1){
      this.incidenciaListaAux= this.incidenciaLista.filter(x => x.nombreSistema == sistema)
    }else{
      this.incidenciaListaAux= this.incidenciaLista.filter(x => x.nombreSistema == sistema  && x.estado == estados)
    }
    
    if(this.incidenciaListaAux.length<10){
      this.items = this.incidenciaListaAux.length;
      this.page=1;
    }else{
      this.items = 10;
      this.page=1;
    }
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
  detailParameter(par:any){
     //console.log("inc", par);
     /*if(par.estado == 'Pendiente'){
      Swal.fire('Advertencia', 'Cuando el ticket cambie a estado "Atendido", podrá ingresar al detalle.', 'warning');
      return;
     }*/
      this.StudentsService.Incidenciadetalle = par;
      this.router.navigate(['/cliente/incidencias/incidencia-detalle']);
     
  }
  solicitarAprobacion(pp : pedidos){
    const dialogRef = this.dialog.open(FormPedidoComponent, {
      data:{
        pedidos:pp,
        action:'aprobar'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        
      }     
    });
  }
  respuestaEmision(pp : pedidos){
    const dialogRef = this.dialog.open(FormPedidoComponent, {
      data:{
        pedidos:pp,
        action:'respuesta'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        Swal.fire('¡Éxito!', 'Su respuesta fue enviada.', 'success');
        this.refreshPedidos();
      }     
    });
  }
  detailPedido(pp : pedidos){
    const dialogRef = this.dialog.open(FormPedidoComponent, {
      data:{
        pedidos:pp,
        action:'detail'
      }
    })
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1) {
        
      }     
    });
  }
  addNewDetalle(){
    //////////////console.log("det:", pp)
    // const dialogRef = this.dialog.open(FormDialogParameterDetailComponent,{
    //   data:{
    //     parametro:this.idParametro,
    //     accion:'agregar'
    //   }
    // })
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
    //   if (result === 1) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Éxito',
    //       text:'Se ingresó el registro con éxito.',
    //       showConfirmButton: true,
    //     });
    //   }
    //   this.detailParameter(this.parameter);
    // });
  }
  refreshDetalle(){
    this.detailParameter(this.Students);
  }
 


}