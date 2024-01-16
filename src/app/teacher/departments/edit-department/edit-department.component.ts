import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../all-departments/department.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.sass'],
})
export class EditDepartmentComponent   implements OnInit {
  departmentForm: UntypedFormGroup;
  public Editor2 = ClassicEditor;
  columnas: string[] = ['descripcion', 'horasActividad', 'fechaActividad'];
  formdata = {
    dName: 'mathematics',
    hod: 'Sanjay Shah',
    phone: '123456789',
    email: 'test@example.com',
    sYear: '1987-02-17T14:22:18Z',
    sCapacity: '230',
    details: 'Learn fashion designing course with proper guideline.',
  };
  breadscrums = [
    {
      title: 'Mejoras',
      items: ['Inicio'],
      active: 'Detalle',
    },
  ];
  sistemaEmpresas: any;
  usuariosByEmpresa: any[] = [];
  sistemas: any;
  prioridades: any;
  estados: any;
  tipoMejora: any;
  sistemasList: any[]=[];
  editBool:boolean=true;
  actividades: any[]
  dataSource: MatTableDataSource<any>;
  constructor(private fb: UntypedFormBuilder,
    public departmentService: DepartmentService,
    public dialog: MatDialog, private router: Router,) {
    this.departmentForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.LoadParameters();
    //console.log("mejoraDetalleOnDetail", this.departmentService.mejoraDTO)  
    this.actividades = this.departmentService.mejoraDTO.mejoraActividades;
    this.dataSource = new MatTableDataSource<any>(this.departmentService.mejoraDTO.mejoraActividades);  
  }
  onSubmit() {
    
  }
  LoadParameters() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.departmentService.getParameterDetail(9).subscribe( res => {
      this.prioridades = res;
    })
    this.departmentService.getParameterDetail(17).subscribe( res => {
      this.estados = res;
      //console.log("estados", this.estados)
    })
    this.departmentService.getParameterDetail(16).subscribe( res => {
      this.tipoMejora = res;
    })
    this.departmentService.getNivelSoporteById(user.id).subscribe(res =>{
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
      this.selectEmpresa(this.departmentService.mejoraDTO.mejora.idEmpresa);
    })    
    
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      empresa: [this.departmentService.mejoraDTO.mejora.idEmpresa],      
      tipo: [this.departmentService.mejoraDTO.mejora.idTipo],
      prioridad: [this.departmentService.mejoraDTO.mejora.prioridad],
      usuarioReg: [''],
      titulo: [this.departmentService.mejoraDTO.mejora.titulo],
      estado: [this.departmentService.mejoraDTO.mejora.idEstado],
      comentario:[''],
      descripcion:[this.departmentService.mejoraDTO.mejora.descripcion],
      uploadFile:[''],      
      horasEstimadas: [this.departmentService.mejoraDTO.mejora.horasEstimadas],
      horasConsumidas: [this.departmentService.mejoraDTO.mejora.horasConsumidas],
      idUsuarioAsignado: [this.departmentService.mejoraDTO.mejora.idUsuarioAsignado],
      aprobado: [''],
      sistema: [this.departmentService.mejoraDTO.mejora.idSistema],
    });
  }
  selectEmpresa(event){
    //console.log("event", event)
    //console.log("sistemaEmpresas", this.sistemaEmpresas)
    this.sistemas = this.sistemaEmpresas.filter(x =>x.idEmpresa == event)
    this.LoadUsuarios(event);
  }
  LoadUsuarios(idEmpresa: number) {
    this.departmentService.getUsuariosByEmpresa(idEmpresa).subscribe(res =>{
      //console.log("usuarios", res.objModel)
      this.usuariosByEmpresa = res.objModel;
    })
  }
  editar(){
    this.editBool = false;
  }
  cancelar(){
    this.editBool = true;
    this.router.navigate(['cliente/mejoras/bandeja']);
  }
  editarMejora(){
    
    /*if(this.departmentForm.value.estado != 4 && this.departmentForm.value.estado != 5 && this.departmentForm.value.estado != 1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text:'Solo puede cambiar al estado a: "Pendiente", "En curso" ó "Culminado".',
        showConfirmButton: true,
      });
      return;
    }*/
    if(this.departmentForm.value.estado == 2){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      this.departmentService.mejoraDTO.mejora.idUsuarioCliente = user.id;
    }    
    this.departmentService.mejoraDTO.mejora.idUsuarioAsignado =  this.departmentForm.value.idUsuarioAsignado;
    this.departmentService.mejoraDTO.mejora.idSistema = this.departmentForm.value.sistema;
    this.departmentService.mejoraDTO.mejora.idTipo = this.departmentForm.value.tipo;
    this.departmentService.mejoraDTO.mejora.titulo = this.departmentForm.value.titulo;
    this.departmentService.mejoraDTO.mejora.idEstado = this.departmentForm.value.estado;
    this.departmentService.mejoraDTO.mejora.descripcion = this.departmentForm.value.descripcion;
    this.departmentService.UpdateMejora(this.departmentService.mejoraDTO.mejora).subscribe( res =>{
      if(res.objModel){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Éxito',
          text:'Se actualizó el registro con éxito.',
          showConfirmButton: true,
        });
        this.editBool = true;
        this.router.navigate(['cliente/mejoras/bandeja']);
      }
    })
  }
  editActividad(actividad : any){
    //console.log("actividad", actividad)
  }
  deleteImage(image : any){
    //console.log("image", image)
  }
  openModal(image){
    this.dialog.open(ImagenesComponent, {
      data: {
        urlArchivo:image.urlArchivo,
        nombreArchivo:image.nombreArchivo
      }
    });
  }
  onChangeEstado(event){
    //console.log("event", event.value)
    if(event.value == 4 || event.value == 5 ){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Atención',
        text:'Solo puede cambiar al estado a: "Aprobado" ó "Rechazado".',
        showConfirmButton: true,
      });
      this.departmentForm.get('estado').setValue(this.departmentService.mejoraDTO.mejora.idEstado);
    }
  }
}
