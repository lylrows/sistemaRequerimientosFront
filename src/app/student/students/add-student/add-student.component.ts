import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {incidencia, incidenciaArchivo, incidenciaComentario, incidenciaObj, incidenciaObjprueba} from '../../../system-models/incidencia'
import Swal from 'sweetalert2';
import { Department } from '../../departments/all-departments/department.model';
import { DepartmentService } from '../../departments/all-departments/department.service';
import { Students } from '../all-students/students.model';
import { StudentsService } from '../all-students/students.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddArchivoComponent } from './add-archivo/add-archivo.component';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {
  public Editor = ClassicEditor;
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
  sistemasList: any[]=[];
  Incidentes: any;
  tipoIncidentes: any;
  prioridades: any;
  estados: any;
  subTipo: any;
  idEmpresa: number;
  filterForms:FormGroup;
  filterForms2:FormGroup;
  sistemaEmpresas: any;
  sistemas: any;
  nivelSoporte: string='';
  incidenciaLista: any []=[];
  _incidencia:incidenciaObj = {
    id: 0,
    idTicket:0,
    idEmpSist: 0,
    idUsuarioRegistro: 0,
    idTipoIncidencia: 0,
    idSubtipoIncidencia: 0,
    idTipificacion: 0,
    nombre: '',
    fechaRegistro: new Date(),
    idPrioridad: 0,
    idEstado: 0,
    fechaAtencion: null,
    calificacionIncidente: 0,
    cumplioANS: 0,
    idUsuarioActualiza: 0,
    fechaActualiza: new Date(),
    esActivo: 0,
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
  usuariosByEmpresa: any[] = [];
  fileName: string;
  boolimg: boolean;
  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    public empresa: DepartmentService,
    private sanitizer: DomSanitizer,
    private router: Router) {      
    this.stdForm = this.fb.group({
      id: [0],     
      //idEmpSist: ['', [Validators.required]],
      idUsuarioRegistro: [''],
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
     this.filterForms2 = this.fb.group({
      idSistema:['']
     });
     this.filterForms = this.fb.group({
      idEmpresa:['']
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
    let users= JSON.parse(localStorage.getItem('currentUser'));
    //////////console.log("users", users)
    if(users.role == 'Cliente'){
      this.studentsService.getAllIncidencias(users.role, users.id,0).subscribe(res =>{
        //////////console.log("incidencias", res.objModel)
        this.incidenciaLista=res.objModel;
      })
    }else{
      this.studentsService.getNivelSoporteById(users.id).subscribe(res =>{
        let sistemas =res.objModel;
        this.sistemaEmpresas = res.objModel;
        //////////console.log("sistema empresa",this.sistemaEmpresas);
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
  LoadSistemas(id:number) {
    this.studentsService.getSistemas(id).subscribe(res =>{
      this.sistema=res.objModel;
    })
  }  
 
  capturarFile(event){
    if(this.listImg.length == 3){
      Swal.fire('Advertencia', 'Ya copó el máximo de archivos', 'warning');
      this.ImgForm.get('uploadFile').setValue('');
      return;
    }
    const archivonuevo=event.target.files[0];
    if (archivonuevo.size > 5 * 1024 * 1024) {
      Swal.fire('Advertencia', 'El archivo es demasiado grande, el tamaño máximo es de 5 megabytes.', 'warning');
      this.ImgForm.get('uploadFile').setValue('');
      return;
    }
    const extensionesPermitidas = ['.doc', 'docx', '.xls', 'xlsx', '.pdf', '.jpg', 'jpeg', '.png', '.txt', '.rar', '.zip'];
    const extensionArchivo = archivonuevo.name.slice(-4);
    ////console.log("file", archivonuevo)
    if (!extensionesPermitidas.includes(extensionArchivo)) {
      Swal.fire('Advertencia', 'El tipo de archivo no está permitido, solo se permiten: doc, docx, xls, xlsx, pdf, jpg, jpeg, png, txt, rar, zip', 'warning');
      this.ImgForm.get('uploadFile').setValue('');
      return;
    }    
    this.listImg.push(event.target.files[0]);
    if(archivonuevo.type.toString().includes('pdf')){
      this.listpre.push('assets/images/logo-pdf.jpg');
    }else if (archivonuevo.name.toString().includes('.doc')){
      this.listpre.push('assets/images/logo-word.jpg');
    }else if (archivonuevo.name.toString().includes('.xls')){
      this.listpre.push('assets/images/logo-excel.png');
    }else if (archivonuevo.name.toString().includes('.zip')){
      this.listpre.push('assets/images/logo-zip.jpg');
    }else if (archivonuevo.name.toString().includes('.rar')){
      this.listpre.push('assets/images/logo-rar.jpg');
    }else if (archivonuevo.name.toString().includes('.txt')){
      this.listpre.push('assets/images/logo-txt.png');
    }else if (archivonuevo.type.toString().includes('image')){
      this.extraerBase64(archivonuevo).then((imagen: any)=>{     
        this.listpre.push(imagen.base);      
      })
    }
    this.ImgForm.get('uploadFile').setValue('');
  }



  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
  addincidencia(){    
    //this._incidencia =  this.stdForm.value; 
    // const currentDate = new Date(); 
    // currentDate.setTime(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)); 
    // currentDate.setHours(currentDate.getHours());
    // const dateInLimaTimezone = currentDate.toISOString();
    const clientTimeZone = moment.tz.guess();
    let date;
// Si la zona horaria del cliente es diferente a la zona horaria de Lima
if (clientTimeZone == 'America/Lima') {
  // Convertir la fecha y hora actual a la zona horaria de Lima
  date = moment().tz('America/Lima');
} else {
  // Mantener la fecha y hora actual
  date = moment().tz('America/Lima');
}

    this._incidencia.idUsuarioRegistro= this.stdForm.value.idUsuarioRegistro;
    this._incidencia.nombre= this.stdForm.value.nombre;
    this._incidencia.idPrioridad= this.stdForm.value.idPrioridad;
    this._incidencia.idEstado = this.stdForm.value.idEstado;
    this._incidencia.fechaRegistro = date._d;
    let abc = this.stdForm.value.fechaAtencion;
    this._incidencia.fechaAtencion= null;
    this._incidencia.fechaActualiza=null;
    this._incidencia.esActivo= this.stdForm.value.esActivo;
    this._incidencia.idEmpSist= this.filterForms2.value.idSistema;
    this._incidencia.idTipoIncidencia =-1;
    this._incidencia.idSubtipoIncidencia =-1;
    ////////console.log("creacion incidencia",this._incidencia);
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
        this._comentario.idUsuario = this.stdForm.value.idUsuarioRegistro;
        this._comentario.idIncidencia = this.idIncidencia;
        this._comentario.fechaRegistro = date._d;
        //Servicio para insertar comentario
          this.studentsService.insertIncidenciaComentario(this._comentario).subscribe(res =>{
            //////////console.log("comentario",res);
          })
          if(this.listImg.length>0){   
            this._incidenciaArchivo.idUsuario = this.stdForm.value.idUsuarioRegistro;
            this._incidenciaArchivo.idIncidencia = this.idIncidencia;
            this._incidenciaArchivo.nombreArchivo = '';
            this._incidenciaArchivo.urlArchivo =environment.directorio;
            this._incidenciaArchivo.fechaRegistro=date._d;
            this.studentsService.UploadPhotoList(this.listImg,this._incidenciaArchivo).subscribe( res => {
            Swal.fire({
                        title: 'OK',
                        text: "Se registro correctamente", 
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',          
                        confirmButtonText: '¡OK!',
                      })
                      this.router.navigate(['/soporte/incidencias/incidencias']);
            })  
          }
          // if(this.listImg.length>0){
          //   //////////console.log("listaimagen",this.listImg)
          //   let count =1; 
          //   for (let index = 0; index < this.listImg.length; index++) {
          //     //////////console.log("Forimagen",this.listImg)
          //     const element = this.listImg[index];

          //     if(element.type.toString().includes('pdf')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////////console.log("pdf")
          //     }else if (element.name.toString().includes('.doc')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////////console.log("word")
          //     }else if (element.name.toString().includes('.xls')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////////console.log("excel")
          //     }else if (element.name.toString().includes('.zip')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////console.log("zip")
          //     }else if (element.name.toString().includes('.rar')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////console.log("zip")
          //     }else if (element.name.toString().includes('.txt')){
          //       let extension = this.getFileExtension(element.name);
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
          //       ////console.log("zip")
          //     }else if (element.type.toString().includes('image')){
          //       ////////console.log("imagen")
          //       this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.jpg';
          //     }


          //     this._incidenciaArchivo.nombreArchivo = element.name;
          //     //////////console.log("nombrearchivo",this._incidenciaArchivo.nombreArchivo);
          //     //let fileName = 'adjunto_'+this.idIncidencia+'_'+count+'.jpg';
          //     this._incidenciaArchivo.idUsuario = this.stdForm.value.idUsuarioRegistro;
          //     this._incidenciaArchivo.idIncidencia = this.idIncidencia;
          //     this._incidenciaArchivo.urlArchivo =environment.directorio+this.fileName;
          //     this._incidenciaArchivo.fechaRegistro=date._d;
          //     this.studentsService.UploadPhoto(element, this.fileName).subscribe(res =>{
          //       //////////console.log("que bota",res.objModel);

          //     })
          //     ////////console.log("imagen",this._incidenciaArchivo);
          //     this.studentsService.insertIncidenciaArchivos(this._incidenciaArchivo).subscribe(res =>{
                 
          //        //this.LoadFile();
      

          //     })
          //     count++;
          //   }
          // }
          // Swal.fire({
          //   title: 'OK',
          //   text: "Se registro correctamente", 
          //   icon: 'success',
          //   showCancelButton: false,
          //   confirmButtonColor: '#3085d6',          
          //   confirmButtonText: '¡OK!',
          // })
          // this.router.navigate(['/soporte/incidencias/incidencias']);
        }      
    })
  } 
 
  deleteImg(img){
    this.boolimg = true;
    //console.log("img", img)
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se eliminará el archivo  ", 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if(result.isConfirmed){
        var indexImg = this.listImg.findIndex(file => file.name === img.name && file.size === img.size);
        this.listpre.splice(indexImg,1);     
        this.listImg.splice(indexImg,1);  
        this.boolimg = false;
      }else {
        this.boolimg = false;
      }
      
     
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
    this.router.navigate(['/soporte/incidencias/incidencias']);
  }
  selectEmpresa(event){
    //////////console.log("idEmpresa",event.value)
    this.idEmpresa = Number(event.value);
    this.LoadUsuarios(this.idEmpresa);
    //////////console.log("sistemaEmpresas",this.sistemaEmpresas)
    this.sistemas = this.sistemaEmpresas.filter(x =>x.idEmpresa == event.value)
    this.nivelSoporte='';
    this.incidenciaLista=[];
  }
  LoadUsuarios(idEmpresa: number) {
    this.studentsService.getUsuariosByEmpresa(idEmpresa).subscribe(res =>{
      //////////console.log("usuarios", res.objModel)
      this.usuariosByEmpresa = res.objModel;
    })
  }
  selectSistema(event){
    //////////console.log("idSistema",event.value)
    let nivel = this.sistemaEmpresas.filter(x =>x.idEmpresa == this.idEmpresa && x.idSistema == event.value)
    //////////console.log("nivel", nivel[0])
    //this.nivelSoporte=nivel[0].idNivelSoporte;
    let sistema = nivel[0].nombreSistema;
    let users= JSON.parse(localStorage.getItem('currentUser'));
    this.studentsService.getAllIncidencias(users.role, users.id,nivel[0].idNivelSoporte).subscribe(res =>{
      //////////console.log("incidencias", res.objModel)
      this.incidenciaLista=res.objModel.filter(x => x.nombreSistema == sistema);
      
    })
  }
}
