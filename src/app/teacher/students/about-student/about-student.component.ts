import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { comentariosByIdincidenciaDTO, incidencia, incidenciaArchivo, incidenciaComentario, incidenciaObj } from 'src/app/system-models/incidencia';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { StudentsService } from '../all-students/students.service';
import {IncideciaService} from '../about-student/incidencia.service'
import { DomSanitizer } from '@angular/platform-browser';
import { FormImagenDetailComponent } from './form-imagen-detail/form-imagen-detail.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { formatDate } from '@fullcalendar/core';
import * as moment from 'moment-timezone';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.sass'],
})
export class AboutStudentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  public Editor = ClassicEditor;
  public Editor2 = ClassicEditor;
  //config.readOnly = true;CKEDITOR.Editor2.setReadOnly
  listaComentarios: incidenciaComentario []=[];
  sistema: any;
  incidenciaid: any;
  prueba: any []=[];
  prueba1: any []=[];
  prueba2: any []=[];
  prueba3: any []=[];
  incidencia: any []=[];
  boolEditor : boolean=true;
  boolimg : boolean=true;
  boolver: boolean=true;
  nuevaF: any []=[];
  abc: any [];
  fecha: Date=new Date();
  fecha1:string;
  estados: any ;
  Incidentes: any;
  subTipo: any;
  tipoIncidentes: any;
  idIncidencia: number;
  previzualizacion: string;
  listpre: any=[];
  listImg: File []= [];
  changeButon: boolean=false;
  stdForm: UntypedFormGroup;
  EditorForm: FormGroup;
  ImgForm: FormGroup;
  Incidencia: FormGroup;
  boolCalificacion:boolean=true;
  breadscrums = [
    {
      title: 'Ticket',
      items: ['Detalle'],
      active: 'Gestión',
    },
  ];
  comentariosDTO:comentariosByIdincidenciaDTO[]=[]
  archivos: incidenciaArchivo []=[]
  cargaincidencia: any []=[] ; //incidenciaObj
  changeButton: any;
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
    nombreArchivo: "nuevo",
    fechaRegistro: new Date(),
    img: ''
  }
  changes: any={
    id: 0,
    idTipoIncidencia: '',
    idSubtipoIncidencia:'' ,
    idEstado: '',
    tipificacion :'' ,

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
  calificacionIncidente: number = 0;
  nomDate: any;
  fileName: string;
  vistaImg: any []=[];
  preliminar: any[]=[];
  idPrioridad: number;
  incidenciaObj: incidenciaObj = {
    id: 0,
    idTicket: 0,
    idEmpSist: 0,
    idUsuarioRegistro: 0,
    idTipoIncidencia: 0,
    idSubtipoIncidencia: 0,
    idTipificacion: 0,
    nombre: '',
    fechaRegistro: '',
    idPrioridad: 0,
    idEstado: 0,
    fechaAtencion: undefined,
    calificacionIncidente: 0,
    cumplioANS: 0,
    horasEstimadas: 0,
    horasEjecutadas: 0,
    idUsuarioActualiza: 0,
    fechaActualiza: '',
    esActivo: 0
  };

editConstante(pp){
////////////console.log("que bota",pp);

}
@ViewChild(FileUploadComponent) fileUploadComponent: FileUploadComponent;

  
  constructor(public studentsServ : StudentsService,
    private fb: UntypedFormBuilder,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,public dialog: MatDialog,
    private incidenciaService : IncideciaService,
    private router: Router,) {
    super();
    
    //console.log("data", this.studentsServ.Incidenciadetalle)
    this.incidenciaid=this.studentsServ.Incidenciadetalle.idIncidencia;
    ////////////console.log("idIncidecnia",this.incidenciaid);
    
    this.EditorForm = this.createContactForm();
    this.ImgForm=this.createContactoForm();
    this.Incidencia=this.createContactoForma();
    
  }
  
  Loadcomentarios(){
       this.incidenciaService.getComentariosByIdincidencia(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
       this.comentariosDTO = res.objModel;
      
     })
     this.studentsServ.getParameterDetail(11).subscribe( res => {
      this.estados = res;
      
      ////////////console.log("estados cliente",this.estados);
      let option= this.estados.filter(x => x.nombre=='Pendiente')[0];
      let optios1= this.estados.filter(x => x.nombre=='Atendido')[0];
      var index= this.estados.indexOf(option,optios1);
      this.estados.splice(index ,2);
      
    })
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      ////////////console.log("res",res);
      this.tipificaciones = res;
    })
   }
  LoadFile(){
    this.incidenciaService.getIncidenciaArchivo(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
      this.archivos = res.objModel; 
      
    })
  }
  loadIncidencia(){
    this.incidenciaService.getIncidencia(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
      this.cargaincidencia.push(res.objModel); 
      this.incidenciaObj = res.objModel;
      this.changeButton= res.objModel.idEstado;
      //console.log("incidenciaObj",res.objModel);
       if(this.changeButton == 4){
         this.changeButon=true;
         ////////////console.log("si entra a la condicion");
       }
      this.idIncidencia=res.objModel.id;
      this.idPrioridad =res.objModel.idPrioridad;
      ////////////console.log("objincidencia",res.objModel)
      
      this.Incidencia.get('idTipoIncidencia').setValue(res.objModel.idTipoIncidencia);
      this.onChangeTipo(res.objModel.idTipoIncidencia);
      this.Incidencia.get('idSubtipoIncidencia').setValue(res.objModel.idSubtipoIncidencia);
      this.Incidencia.get('idEstado').setValue(res.objModel.idEstado);
      this.Incidencia.get('tipificacion').setValue(res.objModel.idTipificacion);
      if(res.objModel.idEstado == 4){
        this.onChangeEstado(4);
      }
      switch (res.objModel.calificacionIncidente) {
        case 1:
          this.calificacion('star1');
        break;
        case 2:
          this.calificacion('star2');
        break;
        case 3:
          this.calificacion('star3');
        break;
        case 4:
          this.calificacion('star4');
        break;
        case 5:
          this.calificacion('star5');
        break;
        default:
          break;
      }  
    })
    this.studentsServ.getParameterDetail(10).subscribe( res => {      
      this.Incidentes = res;
      this.tipoIncidentes = this.Incidentes.filter( x => x.idParametroPadre == -1);
    })  
  }
  
   createContactoForma():FormGroup<any>{
    return this.fb.group({
        // id: [this.cargaincidencia.id],
        // idEmpSist: [this.cargaincidencia.idEmpSist],
        // idUsuarioRegistro: [this.cargaincidencia.idUsuarioRegistro],
         idTipoIncidencia: ['',Validators.required],
         idSubtipoIncidencia: [''],
        // nombre: [this.cargaincidencia.nombre],
        // fechaRegistro: [this.cargaincidencia.fechaRegistro], 
        // idPrioridad: [this.cargaincidencia.idPrioridad],
         idEstado: [this.changeButton],
         tipificacion : ['',Validators.required]
        // fechaAtencion: [this.cargaincidencia.fechaAtencion],
        // esActivo: [this.cargaincidencia.esActivo],
     })
   }
   
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      comentario:['',Validators.required],
      
     })
   }

   createContactoForm(): FormGroup<any> {
    return this.fb.group({
      uploadFile:['']
     })
   }
   clickevento1(pp){
    const dialogRef = this.dialog.open(FormImagenDetailComponent,{
      data:{
        pp,
       
      }
    })
   }
   clickevento(img){
    const dialogRef = this.dialog.open(FormImagenDetailComponent,{
      data:{
        img,
       
      }
    })
   }
   change(){
    this.listaComentarios.push(this.EditorForm.value);
    ////////////console.log("que bota", this.listaComentarios);
  
          this._comentario.id=0;
          this._comentario.comentario =  this.EditorForm.value.comentario;
          this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
          this._comentario.idIncidencia = this.incidenciaid;
          this._comentario.fechaRegistro = new Date();
          
          //////////////console.log("comentario",this._comentario);
  
          this.studentsServ.insertIncidenciaComentario(this._comentario).subscribe(res =>{
              ////////////console.log("listaIncidencia",res); 
              this.Loadcomentarios();
              let count =1; 
              
              Swal.fire({
                title: 'OK',
                text: "Se registro correctamente", 
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',          
                confirmButtonText: '¡OK!',
              })
              
            })
    this.EditorForm.get('comentario').setValue('');
  

    let actualizacion :incidenciaObj= this.Incidencia.getRawValue();
    actualizacion.esActivo = Number(this.Incidencia.getRawValue().esActivo);
     this.studentsServ.updateIncidencias(actualizacion).subscribe(res =>{

     })
     this.router.navigate(['/cliente/incidencias/incidencias']);
   }

  ngOnInit(): void {
    this.Loadcomentarios();
    this.LoadFile();
    this.loadIncidencia();
    this.LoadSistemas();
    this.sacardata();
    //console.log("prioridad:", this.studentsServ.Incidenciadetalle.prioridad)
  }
  sacardata(){
    for(let i=0;i<=this.cargaincidencia.length;i++){  
    }
  }
  LoadSistemas() {
    let users= JSON.parse(localStorage.getItem('currentUser')); 
  } 
  addComentario(){
    this.boolEditor = false;
  }
  onNoClick(): void {
    this.router.navigate(['/cliente/incidencias/incidencias']);
}
deleteComentario(edit){
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Se eliminará el comentario: ", //+ row.razonSocial,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: '¡Sí, bórralo!',
  }).then((result) => {
    var index= this.listaComentarios.indexOf(edit);
     this.listaComentarios.splice(index ,1);
  }); 
}
addimg(){
  this.boolimg = false;
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
  //console.log("listpre",this.listpre)
}
descargarArchivo(url){
window.open(url);
}
public confirmimg(): void{
  if(this.listImg.length>0){   
    let date;
    date = moment().tz('America/Lima');
    this._incidenciaArchivo.idUsuario = JSON.parse(localStorage.getItem('currentUser')).id;
    this._incidenciaArchivo.idIncidencia = this.idIncidencia;
    this._incidenciaArchivo.nombreArchivo = '';
    this._incidenciaArchivo.urlArchivo =environment.directorio;
    this._incidenciaArchivo.fechaRegistro=date._d;
    this.incidenciaService.UploadPhotoList(this.listImg,this._incidenciaArchivo).subscribe( res => {
      Swal.fire({
                  title: 'OK',
                  text: "Se registro correctamente", 
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',          
                  confirmButtonText: '¡OK!',
                })
      this.listImg = [];
      this.listpre = [];
      this.boolver = true;
      this.LoadFile();
    })           
  }
  this.ImgForm.get('uploadFile').setValue('');
}
  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
public confirmAdd(comentario): void {
  this.listaComentarios.push(this.EditorForm.value);
  this._comentario.id=0;
  this._comentario.comentario =  this.EditorForm.value.comentario;
  this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
  this._comentario.idIncidencia = this.incidenciaid;
  this._comentario.fechaRegistro = new Date();

  this.studentsServ.insertIncidenciaComentario(this._comentario).subscribe(res =>{
      this.Loadcomentarios();
      let count =1;       
      Swal.fire({
        title: 'OK',
        text: "Se registro correctamente", 
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
      })
      
    })

  if(this.listaComentarios.length>3){
    Swal.fire('Error', 'Ya copó el máximo de comentarios', 'error');
    var index= this.listaComentarios.indexOf(comentario);
    this.listaComentarios.splice(index ,1);
   }
  this.EditorForm.get('comentario').setValue('');
}
grabarRespuesta(){
  this.listaComentarios.push(this.EditorForm.value);  
  this._comentario.id=0;
  this._comentario.comentario =  this.EditorForm.value.comentario;
  this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
  this._comentario.idIncidencia = this.incidenciaid;
  this._comentario.fechaRegistro = new Date();
  this.studentsServ.insertIncidenciaComentario(this._comentario).subscribe(res =>{        
      this.Loadcomentarios();
      Swal.fire({
        title: 'OK',
        text: "Se agregó respuesta correctamente", 
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
      })        
    })
  this.EditorForm.get('comentario').setValue('');
  //this.onNoClick()
 }
actualizarIncidencia(){  
  let actualizacion = this.Incidencia.getRawValue();
  let idIncidencia = this.cargaincidencia[0].id;
  let data= JSON.parse(localStorage.getItem('currentUser'));
  this.incidenciaObj.idEstado = actualizacion.idEstado;
  this.incidenciaObj.idUsuarioActualiza = data.id;
  this.incidenciaObj.calificacionIncidente = this.calificacionIncidente;
 
  const clientTimeZone = moment.tz.guess();
let date;
date = moment().tz('America/Lima');

this.incidenciaObj.fechaActualiza= date._d;
    
  this.studentsServ.updateincidenciaTipifica(this.incidenciaObj).subscribe( res =>{
    if(res.objModel){
      Swal.fire({
        title: 'OK',
        text: "Se actualizó incidencia correctamente", 
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
      })   
      this.router.navigate(['/cliente/incidencias/incidencias']);     
    }else{
      Swal.fire({
        title: 'Error',
        text: res.description, 
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
      })   
    }
  }) 
 }

NoClickimg(){
  this.boolimg = true;
}
verfoto(){
  this.boolver = false;
}
deleteImg(img){
  this.boolimg = true;
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Se eliminará el archivo: ", //+ row.razonSocial,
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
    
    //this.fileUploadComponent.writeValue(null);
    /*//console.log("listImg", this.listImg)
    //console.log("listpre", this.listpre)*/
  });
  
}
onChangeTipo(value){
  // this.subTipo = this.Incidentes.filter( x => x.idParametroPadre == value);
  // ////////////console.log("sub", this.subTipo)
  // this.stdForm.get('idSubtipoIncidencia').setValue('');

}
onChangeEstado(value){
  if(value == 4){
    this.boolCalificacion = false;
  }else{
    this.boolCalificacion = true;
    this.calificacionIncidente =0;
  }
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
calificacion(name: string){
  switch (name) {
    case 'star1':
      this.classStar1 ='material-icons text-warning';
      this.iconStar1 ='star'
      this.classStar2 ='material-icons';
      this.iconStar2 ='star_border'
      this.classStar3 ='material-icons';
      this.iconStar3 ='star_border'
      this.classStar4 ='material-icons';
      this.iconStar4 ='star_border'
      this.classStar5 ='material-icons';
      this.iconStar5 ='star_border';
      this.calificacionIncidente = 1;
    break;
    case 'star2':
      this.classStar1 ='material-icons text-warning';
      this.iconStar1 ='star'
      this.classStar2 ='material-icons  text-warning';
      this.iconStar2 ='star'
      this.classStar3 ='material-icons';
      this.iconStar3 ='star_border'
      this.classStar4 ='material-icons';
      this.iconStar4 ='star_border'
      this.classStar5 ='material-icons';
      this.iconStar5 ='star_border';
      this.calificacionIncidente = 2;
    break;
    case 'star3':
      this.classStar1 ='material-icons text-warning';
      this.iconStar1 ='star'
      this.classStar2 ='material-icons  text-warning';
      this.iconStar2 ='star'
      this.classStar3 ='material-icons text-warning';
      this.iconStar3 ='star'
      this.classStar4 ='material-icons';
      this.iconStar4 ='star_border'
      this.classStar5 ='material-icons';
      this.iconStar5 ='star_border';
      this.calificacionIncidente = 3;
    break;
    case 'star4':
      this.classStar1 ='material-icons text-warning';
      this.iconStar1 ='star'
      this.classStar2 ='material-icons  text-warning';
      this.iconStar2 ='star'
      this.classStar3 ='material-icons text-warning';
      this.iconStar3 ='star'
      this.classStar4 ='material-icons text-warning';
      this.iconStar4 ='star'
      this.classStar5 ='material-icons';
      this.iconStar5 ='star_border';
      this.calificacionIncidente = 4;
    break;
    case 'star5':
      this.classStar1 ='material-icons text-warning';
      this.iconStar1 ='star'
      this.classStar2 ='material-icons  text-warning';
      this.iconStar2 ='star'
      this.classStar3 ='material-icons text-warning';
      this.iconStar3 ='star'
      this.classStar4 ='material-icons text-warning';
      this.iconStar4 ='star'
      this.classStar5 ='material-icons text-warning';
      this.iconStar5 ='star';
      this.calificacionIncidente = 5;
      break;
                      
    default:
      break;
  }
}
}
