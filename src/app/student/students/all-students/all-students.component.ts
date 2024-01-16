import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { Students } from './students.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { deleteObj } from 'src/app/system-models/deleteObj';
import Swal from 'sweetalert2';
import { FormAsignarComponent } from './dialogs/form-asignar/form-asignar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHorasComponent } from './dialogs/form-horas/form-horas.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  breadscrums = [
    {
      title: 'Tickets',
      items: ['Tickets'],
      active: 'Todos los Tickets',
    },  
  ];  
  incidenciaLista: any []=[];
  incidenciaListaAux: any []=[];
  listaEmpresas: any[]=[];
  Students: Students;
  deleteObj:  deleteObj = {
    id: 0,
    valor: 0,
    tabla: ''
  }
  idEmpresa: number;
  filterForms:FormGroup;
  filterAdvancedSearch:FormGroup;
  sistemaEmpresas: any;
  sistemas: any;
  nivelSoporte: string='';
  page:number;
  items:number=10;
  users = JSON.parse(localStorage.getItem('currentUser'));
  estados: any;
  idEmp: any[]=[];
  advancedSearchVisible = false;
  maxDateInicio = new Date;
  usuariosByEmpresa: any[] = [];
  constructor(private StudentsService : StudentsService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,) {
    super();    
    this.filterForms = this.createFilterForms();    
    this.filterAdvancedSearch = this.createfilterAdvancedSearch(); 
  }
  createfilterAdvancedSearch(): FormGroup<any> {
    return this.fb.group({
      fechaInicio: [''],
      fechaFin:[''],
      idUsuarioRegistro:[''],
    })
  }
  createFilterForms(): FormGroup<any> {
    return this.fb.group({
      idEmpresa: [''],
      idEstado: [''],
      idSistema: ['']
    })
  }
  @ViewChild('filterStudents', { static: true }) filterStudents: ElementRef;
  @ViewChild('filterDetail', { static: true }) filterDetail: ElementRef;
  @ViewChild('filterParameter') filterParameter: ElementRef;
  ngOnInit(): void {
    this.LoadParameters();
  }  
  LoadParameters() {      
    if(this.users.isGerente){
      this.StudentsService.getTicketsGerenteSoporte(this.users.id).subscribe( res =>{
        this.incidenciaLista=res.objModel;
        this.incidenciaListaAux=res.objModel;
        this.paginatoritems(this.incidenciaListaAux.length);
      })
      this.StudentsService.obtenerEmpresa().subscribe(resEmpre=>{
        this.listaEmpresas = resEmpre.objModel;
      })
    }else{
        this.StudentsService.getNivelSoporteById(this.users.id).subscribe(res =>{
          //console.log("soporteEmp", res.objModel)
          let listaFiltrada = res.objModel.filter((item, index, self) => 
            index === self.findIndex((t) => (
                t.idEmpresa === item.idEmpresa && t.razonSocial === item.razonSocial
            ))
          );
          this.listaEmpresas = listaFiltrada.map(item => ({id: item.idEmpresa, razonSocial: item.razonSocial}));
        this.sistemaEmpresas = res.objModel;     
        const empresaSeleccionada = localStorage.getItem('empresaSeleccionada');
        if (empresaSeleccionada) {
          // Crear objetos de evento personalizados
          const eventoEmpresa = { value: Number(empresaSeleccionada) };
      
          // Llamar a los métodos con los valores guardados
          this.selectEmpresa(eventoEmpresa);
          this.filterForms.get('idEmpresa')?.setValue(Number(empresaSeleccionada));
        }
      })
    }    
    this.StudentsService.getParameterDetail(11).subscribe( res => {
      this.estados = res;
    })
  }
  paginatoritems(items: number) {
    if(items<10){
      this.items = items;      
    }else{
      this.items = 10;      
    }
    this.page=1;
  }
  addNew(){
    this.router.navigate(['/soporte/incidencias/agregar-incidencia']);   
  }
  toggleAdvancedSearch() {
    this.advancedSearchVisible = !this.advancedSearchVisible;
    if(this.advancedSearchVisible){
      this.limpiarFiltro();
    }else{
      this.filterAdvancedSearch.get('fechaInicio')?.setValue('');
      this.filterAdvancedSearch.get('fechaFin')?.setValue('');
      this.filterAdvancedSearch.get('idUsuarioRegistro')?.setValue('');
      this.refresh();
    }
  }
  onChangeFechaInicio(control: any){
    let fecha = this.filterAdvancedSearch.get(control)?.value;
    //console.log(control, fecha)
    if(control == 'fechaInicio'){
      this.filterAdvancedSearch.get('fechaFin')?.setValue('');
    }else{
      let fechaInicio = this.filterAdvancedSearch.get('fechaInicio')?.value;
      if(fechaInicio > fecha){
        this.filterAdvancedSearch.get('fechaFin')?.setValue('');
        Swal.fire('Error', 'La fecha de inicio es mayor a la final', 'error');
      }
    }
  }
  advancedSearch(){
    //console.log("filterForm", this.filterAdvancedSearch.value)
    let form = this.filterAdvancedSearch.value
    if(form.fechaInicio == ''){
      Swal.fire('Error', 'Seleccionar fecha de inicio', 'error');
      return;
    }
    if(form.fechaFin == ''){
      Swal.fire('Error', 'Seleccionar fecha de fin', 'error');
      return;
    }
    const start = new Date(form.fechaInicio);
    start.setHours(0, 0, 0, 0);
    const end = new Date(form.fechaFin);
    end.setHours(23, 59, 59, 999);
    //console.log("start", start)
    //console.log("end", end)
    this.incidenciaListaAux = this.incidenciaLista.filter(incidencia => {
      const fechaRegistro = new Date(incidencia.fechaRegistro);
      const isDateInRange = fechaRegistro >= start && fechaRegistro <= end;
    
      const isUserMatch = form.idUsuarioRegistro === "" || form.idUsuarioRegistro === incidencia.usuarioReg;
      this.showNotification(
        'snackbar-success',
        'Filtro realizado!!!',
        'bottom',
        'center'
      );
      return isDateInRange && isUserMatch;

    });
    
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  selectEstado(event){
    //console.log("event", event)
    //console.log("idEmpresa", this.filterForms.get('idEmpresa')?.value )
    //console.log("idSistema", this.filterForms.get('idSistema')?.value )
    //console.log("incidenciaLista", this.incidenciaLista)
    let estados = event.value
    this.incidenciaListaAux= this.incidenciaLista.filter(x =>x.idEmpresa ==  this.filterForms.get('idEmpresa')?.value 
                                                          && x.idSistema == this.filterForms.get('idSistema')?.value 
                                                          && x.estado == estados )
    this.paginatoritems(this.incidenciaListaAux.length);
    this.filterParameter.nativeElement.value = '';
  }
  limpiarFiltro() {
    this.filterParameter.nativeElement.value = '';
    this.buscar({ target: { value: '' } }); // Llama al método buscar con un evento vacío para actualizar la grilla
  }
  refresh(){
    this.LoadParameters();
    if(this.users.isGerente){
      this.incidenciaListaAux = this.incidenciaLista;
      this.filterForms.get('idEmpresa')?.setValue('');
      this.filterForms.get('idSistema')?.setValue('');
      this.filterForms.get('idEstado')?.setValue('');
    }else{
    let empresa = this.filterForms.get('idEmpresa')?.value;
    let sistemaId= this.filterForms.get('idSistema')?.value;
    if(empresa != null && empresa != '' && sistemaId != null && sistemaId != ''){
        let nivel = this.sistemaEmpresas.filter(x =>x.idEmpresa == this.idEmpresa && x.idSistema == sistemaId)
        this.nivelSoporte=nivel[0].idNivelSoporte;
        this.StudentsService.getAllIncidencias(this.users.role, this.users.id,nivel[0].idNivelSoporte).subscribe(res =>{ 
          this.incidenciaLista=res.objModel.filter(x => x.idEmpresa == this.filterForms.get('idEmpresa')?.value && x.idSistema == this.filterForms.get('idSistema')?.value);
          this.incidenciaListaAux=res.objModel.filter(x => x.idEmpresa == this.filterForms.get('idEmpresa')?.value && x.idSistema == this.filterForms.get('idSistema')?.value);
          this.filterForms.get('idEstado')?.setValue('');
          this.paginatoritems(this.incidenciaListaAux.length);
        })
      }
    }
    this.limpiarFiltro();
  }
  buscar(event : any){
    let filter = event.target.value;
    var valoresAceptados = /^[0-9]+$/;
      if(filter.length >=3){
        if(filter.match(valoresAceptados)){
          //console.log("filterID", filter)
          this.incidenciaListaAux= this.incidenciaLista.filter(x=>x.idTicket == Number(filter));
        }else{
        this.incidenciaListaAux = this.incidenciaLista.filter(x => x.incidente.toLowerCase().includes(filter.toLowerCase())
        || x.usuarioReg.toLowerCase().includes(filter.toLowerCase())||x.prioridad.toLowerCase().includes(filter.toLowerCase())
        || x.estado.toLowerCase().includes(filter.toLowerCase()) ); 
      }
      this.paginatoritems(this.incidenciaListaAux.length);
    }else {
          this.incidenciaListaAux = this.incidenciaLista;
          this.paginatoritems(this.incidenciaListaAux.length);
         }     
         this.filterForms.get('idEstado')?.setValue('');
  }  
   asignarIncidencia(pp){
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
        this.refresh();
      }

    })
   }
   registrarHoras(pp){ 
    const dialogRef = this.dialog.open(FormHorasComponent, {
      data: pp
    })   
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      if (result === 1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se registraron las horas con éxito.',
          showConfirmButton: true,
        });
        this.refresh();
      }

    })
   }   
  detailParameter(par){     
   this.StudentsService.Incidenciadetalle = par;
   this.router.navigate(['/soporte/incidencias/incidencia-detalle']);
  }  
  selectEmpresa(event){   
    this.idEmpresa = Number(event.value);
    //console.log("eventEmpresa", event) 
    if(this.users.isGerente){
      this.StudentsService.getSistemasByEmpresa(event.value).subscribe(res=>{
        this.sistemas = res.objModel
      })
      if(event.value == -1){
        this.incidenciaListaAux = this.incidenciaLista
      }else{
        this.incidenciaListaAux = this.incidenciaLista.filter( x => x.idEmpresa == event.value)
        this.filterForms.get('idSistema')?.setValue('');
      }     
      this.paginatoritems(this.incidenciaListaAux.length);
    }else{
      this.filterForms.get('idSistema')?.setValue('');
      this.idEmpresa = Number(event.value);
      this.sistemas = this.sistemaEmpresas.filter(x =>x.idEmpresa == event.value)
      this.nivelSoporte='';
      this.incidenciaLista=[];
      this.incidenciaListaAux=[];
      this.filterForms.get('idEstado')?.setValue('');
      localStorage.setItem('empresaSeleccionada', event.value);
      const sistemaSeleccionado = localStorage.getItem('sistemaSeleccionado');   
      if (sistemaSeleccionado) {
        // Crear objetos de evento personalizados
        const eventoSistema = { value: Number(sistemaSeleccionado) };
    
        // Llamar a los métodos con los valores guardados
        this.selectSistema(eventoSistema);
        this.filterForms.get('idSistema')?.setValue(Number(sistemaSeleccionado));
      }
    }
    this.limpiarFiltro();
    this.LoadUsuarios(this.idEmpresa);    
  }
  LoadUsuarios(idEmpresa: number) {
    this.StudentsService.getUsuariosByEmpresa(idEmpresa).subscribe(res =>{
      //console.log("usuarios", res.objModel)
      this.usuariosByEmpresa = res.objModel;
    })
  }
  selectSistema(event){
    //console.log("eventSistemaidSistema", event)
    if(this.users.isGerente){
      this.incidenciaListaAux= this.incidenciaLista.filter(x=>x.idSistema == event.value &&  x.idEmpresa ==  this.filterForms.get('idEmpresa')?.value);
      this.paginatoritems(this.incidenciaListaAux.length);
      this.filterForms.get('idEstado')?.setValue('');
    }else{
      let nivel = this.sistemaEmpresas.filter(x =>x.idEmpresa == this.idEmpresa && x.idSistema == event.value )
      this.nivelSoporte=nivel[0].idNivelSoporte;
      this.StudentsService.getAllIncidencias(this.users.role, this.users.id,nivel[0].idNivelSoporte).subscribe(res =>{           
        this.incidenciaLista=res.objModel.filter(x => x.idEmpresa == this.filterForms.get('idEmpresa')?.value 
                                                  && x.idSistema == this.filterForms.get('idSistema')?.value );
        this.incidenciaListaAux=res.objModel.filter(x => x.idEmpresa == this.filterForms.get('idEmpresa')?.value 
                                                      && x.idSistema == this.filterForms.get('idSistema')?.value);
        this.paginatoritems(this.incidenciaListaAux.length);
        //console.log("list", res.objModel)
      })
      this.filterForms.get('idEstado')?.setValue('');
    }
    localStorage.setItem('sistemaSeleccionado', event.value);
    this.limpiarFiltro();    
    if(this.advancedSearchVisible){
      this.toggleAdvancedSearch()
    }
  }
  
  isMaxDateReached(pp: any): boolean {
    const currentDate = new Date();
    const maxDate = new Date(pp.fechaMaximaAtencion);
    maxDate.setHours(0, 0, 0, 0); // establecer la hora a cero para comparar solo la fecha
    return (pp.estado === 'Pendiente') && (maxDate.getTime() <= currentDate.getTime());
  }
  descartarAns(pp){
    //console.log("pp", pp)
    Swal.fire({      
      title: 'Cambio de ANS',
      text: 'Se cambiará el ANS del ticket: ' + pp.idTicket + '  a "descartado", ¿Está seguro? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, cámbialo!',
    }).then((result) => {
      if (result.value) {        
        this.StudentsService.cambioAnsDescartado(pp.idIncidencia).subscribe(res =>{
          if(res.objModel){
            Swal.fire('¡Éxito!', 'Su registro ha sido actualizado.', 'success');
          }else{
            Swal.fire('Error', res.description, 'error');
          }          
        })
        
      }
    }); 
  }
  
}