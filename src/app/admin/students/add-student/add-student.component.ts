import { Component } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Department } from '../../departments/all-departments/department.model';
import { DepartmentService } from '../../departments/all-departments/department.service';
import { Students } from '../all-students/students.model';
import {incidencia, incidenciaArchivo, incidenciaComentario, incidenciaObj} from '../../../system-models/incidencia'
import { StudentsService } from '../all-students/students.service';
import { AddArchivoComponent } from './add-archivo/add-archivo.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {
  public Editor = ClassicEditor;
  
  public config = {
    //plugins: [Base64UploadAdapter]
    // Configura el adaptador de carga
    simpleUpload: {
      uploadUrl: 'https://aplicaciones.efitec.pe/PlataformaSGRBack/api/configuracion/ckeditorUpload/UploadImage'
    },
    // ...
  };
  stdForm: UntypedFormGroup;
  incidencia: any;
  sistema: any;
  listaComentarios: incidenciaComentario []=[];
  listImg: File[] = [];
  previzualizacion: string;
  listpre: any=[];
  incidencia_: incidencia;
  getincidencia_: Students;
  getempresa: Department;
  breadscrums = [
    {
      title: 'Agregar Ticket',
      items: ['Ticket'],
      active: 'Agregar Ticket',
    },
  ];
  incidenciaList:Students[]=[];
  empresaList:Department[]=[];
  EditorForm: FormGroup;
  ImgForm: FormGroup;
  Incidentes: any;
  tipoIncidentes: any;
  prioridades: any;
  estados: any;
  subTipo: any;
  _incidencia:incidenciaObj = {
    id: 0,
    idTicket:0,
    idEmpSist: 0,
    idUsuarioRegistro: 0,
    idTipoIncidencia: 0,
    idSubtipoIncidencia: 0,
    nombre: '',
    fechaRegistro: new Date(),
    idPrioridad: 0,
    idEstado: 0,
    fechaAtencion: new Date(),
    esActivo: 0,
    idTipificacion: -1,
    calificacionIncidente: 0,
    cumplioANS: 0,
    idUsuarioActualiza: 0,
    fechaActualiza: new Date(),
    horasEstimadas: 0,
    horasEjecutadas: 0
  }// para agregar comentario
  _comentario:incidenciaComentario={
    id: 0,
    idIncidencia: 0,
    idUsuario: 0,
    comentario: '',
    fechaRegistro: new Date()
  }
  _incidenciaArchivo:incidenciaArchivo={
    id: 0,
    idIncidencia: 0,
    idUsuario: 0,
    urlArchivo: '',
    nombreArchivo: '',
    fechaRegistro: new Date(),
    img: ''
  }
  idIncidencia: number;
  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    public empresa: DepartmentService,
    private sanitizer: DomSanitizer,
    private router: Router) {      
    this.stdForm = this.fb.group({
      id: [0],     
      idEmpSist: ['', [Validators.required]],
      idUsuarioRegistro: [JSON.parse(localStorage.getItem('currentUser')).id],
      idTipoIncidencia:[''], //[Validators.required]],
      idSubtipoIncidencia:[''],// [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaRegistro: [new Date()],
      idPrioridad: [''],
      idEstado: [1],
      fechaAtencion: [new Date()],
      esActivo: [1]
    });
    this.EditorForm = this.fb.group({
      comentario:['', [Validators.required]]
     });
    this.ImgForm = this.fb.group({
      uploadFile:['']
     });
  }
  ngOnInit(): void {
    //Sacar info de usuario
    let users= JSON.parse(localStorage.getItem('currentUser'));   
    this.LoadIncidencia();
    this.LoadSistemas(users.id);    
  }
  LoadIncidencia() {
    this.studentsService.getParameterDetail(10).subscribe( res => {      
      this.Incidentes = res;
      this.tipoIncidentes = this.Incidentes.filter( x => x.idParametroPadre == -1);
    })
    this.studentsService.getParameterDetail(9).subscribe( res => {
      this.prioridades = res;
    })
    this.studentsService.getParameterDetail(11).subscribe( res => {
      this.estados = res;
    })
  }
  LoadSistemas(id:number) {
    this.studentsService.getSistemas(id).subscribe(res =>{
      this.sistema=res.objModel;
    })
  }  
 
  capturarFile(event){
    const archivonuevo=event.target.files[0];
    this.listImg.push(event.target.files[0]);
    this.extraerBase64(archivonuevo).then((imagen: any)=>{
      this.previzualizacion = imagen.base;
      this.listpre.push(imagen.base);
     
      if(this.listpre.length>3){        
        Swal.fire('Error', 'Maximo de archivos: 3', 'error');
        var index= this.listpre.indexOf(event);
          this.listpre.splice(index ,1);
       }
    })
    this.ImgForm.get('uploadFile').setValue('');
  }
  addincidencia(){    
    this._incidencia =  this.stdForm.value; 
    
    //this._incidencia.idEmpSist=-1;
    this._incidencia.idTipificacion =0;
    this._incidencia.calificacionIncidente =0;
    this._incidencia.cumplioANS =0;
    this._incidencia.idUsuarioActualiza =0;
    this._incidencia.fechaActualiza = new Date();
    this._incidencia.idTipoIncidencia =-1;
    this._incidencia.idSubtipoIncidencia =-1;
    //////////console.log("creacion incidencia",this._incidencia);
    this.studentsService.insertIncidencias(this._incidencia).subscribe(res =>{
      this.idIncidencia = Number(res.objModel);
      if(this.idIncidencia == -1){
        Swal.fire({
          title: 'Error',
          text: "No hay usuarios de soporte asignados al Sistema - Empresa", 
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',          
          confirmButtonText: '¡OK!',
        })
      }else if(this.idIncidencia >0){
        this._comentario.comentario =  this.EditorForm.value.comentario;
        this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
        this._comentario.idIncidencia = this.idIncidencia;
        this._comentario.fechaRegistro = new Date();
        //Servicio para insertar comentario
          this.studentsService.insertIncidenciaComentario(this._comentario).subscribe(res =>{
            //////////console.log("comentario",res);
            let count =1; 
            for (let index = 0; index < this.listImg.length; index++) {
              const element = this.listImg[index];
              let fileName = 'adjunto_'+this.idIncidencia+'_'+count+'.jpg';
              this._incidenciaArchivo.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
              this._incidenciaArchivo.idIncidencia = this.idIncidencia;
              this._incidenciaArchivo.nombreArchivo = element.name;
              this._incidenciaArchivo.urlArchivo =environment.directorio+fileName;
              this._incidenciaArchivo.fechaRegistro=new Date();
              this.studentsService.insertIncidenciaArchivos(this._incidenciaArchivo).subscribe(res =>{
                 this.studentsService.UploadPhoto(element, fileName).subscribe(res =>{
                   //////////console.log("que bota",res);

                 })

              })
              count++;
            }
            Swal.fire({
              title: 'OK',
              text: "Se registro correctamente", 
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',          
              confirmButtonText: '¡OK!',
            })
            this.router.navigate(['/admin/incidencias/incidencias']);
          })
        }      
    })
  } 
 
  deleteImg(img){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se eliminará la imagen: ", 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
           var index= this.listpre.indexOf(img);
           this.listpre.splice(index,1); 
           this.listImg.splice(index,1); 
    });
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
      }catch (e){
      return null;
      }
  })
  onChangeTipo(value){
    this.subTipo = this.Incidentes.filter( x => x.idParametroPadre == value);
    //////////console.log("sub", this.subTipo)
    this.stdForm.get('idSubtipoIncidencia').setValue('');

  }
  cancelincidencia(){
    this.router.navigate(['/admin/incidencias/incidencias']);
  }
}
