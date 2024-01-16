import { Component, Inject, OnInit } from '@angular/core';
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
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormSolutionsIncidenciaComponent } from './form-solutions-incidencia/form-solutions-incidencia.component';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.sass'],
})
export class AboutStudentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  public Editor = ClassicEditor;
  public Editor2 = ClassicEditor;
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
  stdForm: UntypedFormGroup;
  EditorForm: FormGroup;
  ImgForm: FormGroup;
  Incidencia: FormGroup;
  boolCalificacion:boolean=true;
  breadscrums = [
    {
      title: 'Incidencias',
      items: ['Detalle'],
      active: 'Gestión',
    },
  ];
  comentariosDTO:comentariosByIdincidenciaDTO[]=[]
  archivos: incidenciaArchivo []=[]
  cargaincidencia: any []=[] ; //incidenciaObj
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
editConstante(pp){


}

  
  constructor(public studentsServ : StudentsService,
    private fb: UntypedFormBuilder,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,public dialog: MatDialog,
    private incidenciaService : IncideciaService,
    private router: Router,) {
    super();
    
    //////////console.log("data", this.studentsServ.Incidenciadetalle)
    this.incidenciaid=this.studentsServ.Incidenciadetalle.idIncidencia;
    //////////console.log("idIncidecnia",this.incidenciaid);
    
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
    })
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      //////////console.log("res",res);
      this.tipificaciones = res;
    })
   }
  LoadFile(){
    this.incidenciaService.getIncidenciaArchivo(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
      this.archivos = res.objModel; 
      //////////console.log("archivos",this.archivos);
    })
  }
  loadIncidencia(){
    this.incidenciaService.getIncidencia(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
      this.cargaincidencia.push(res.objModel);   
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
      //////////console.log("tipoIncidentes", this.tipoIncidentes)
    })  
  }
  
   createContactoForma():FormGroup<any>{
    return this.fb.group({        
         idTipoIncidencia: [],
         idSubtipoIncidencia: [''],    
         idEstado: [''],
         tipificacion : ['']     
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
    //////////console.log("paraActualizar", actualizacion)
    //////////console.log("calificacionIncidente", this.calificacionIncidente)
    let idIncidencia = this.cargaincidencia[0].id;
    //////////console.log("idIncidencia", idIncidencia)
    let obj :incidenciaObj={
      id: idIncidencia,
      idTicket: this.studentsServ.Incidenciadetalle.idTicket,
      idEmpSist: 0,
      idUsuarioRegistro: 0,
      idTipoIncidencia: actualizacion.idTipoIncidencia,
      idSubtipoIncidencia: 0,
      idTipificacion: actualizacion.tipificacion,
      nombre: '',
      fechaRegistro: new Date(),
      idPrioridad: 0,
      idEstado: actualizacion.idEstado,
      fechaAtencion: new Date(),
      calificacionIncidente: this.calificacionIncidente,
      esActivo: 0,
      cumplioANS: 0,
      idUsuarioActualiza: 0,
      fechaActualiza: new Date(),
      horasEstimadas: 0,
      horasEjecutadas: 0
    }
    this.studentsServ.updateincidenciaTipifica(obj).subscribe( res =>{
      if(res.objModel){
        Swal.fire({
          title: 'OK',
          text: "Se actualizó incidencia correctamente", 
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',          
          confirmButtonText: '¡OK!',
        })   
        this.router.navigate(['/admin/incidencias/incidencias']);     
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
    /*actualizacion.esActivo = Number(this.Incidencia.getRawValue().esActivo);
     this.studentsServ.updateIncidencias(actualizacion).subscribe(res =>{

     })*/
     //this.router.navigate(['/admin/incidencias/incidencias']);
   }

  ngOnInit(): void {
    this.Loadcomentarios();
    this.LoadFile();
    this.loadIncidencia();
    this.LoadSistemas();
    this.sacardata();
  }
 
  sacardata(){
    //////////console.log("incidencia",this.cargaincidencia);
    for(let i=0;i<=this.cargaincidencia.length;i++){ 
      //////////console.log("que bota",this.cargaincidencia[i]); 
    }
   //this.abc =this.cargaincidencia;
   ////////////console.log("abc",this.abc);
  }
  LoadSistemas() {
    let users= JSON.parse(localStorage.getItem('currentUser')); 
    //////////console.log("users", users.id)
  } 
  addComentario(){
    this.boolEditor = false;
  }
  onNoClick(): void {
    this.router.navigate(['/admin/incidencias/incidencias']);   
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
  const archivonuevo=event.target.files[0];
  this.listImg.push(event.target.files[0]);
  this.extraerBase64(archivonuevo).then((imagen: any)=>{
    //////////console.log("imagen1",imagen);
   
    this.listpre.push(imagen.base);
    //////////console.log("imagenlista",this.listpre);
    if(this.listpre.length>3){
      //////////console.log("si entra");
      Swal.fire('Error', 'Ya copó el máximo de archivos', 'error');
      var index= this.listpre.indexOf(event);
        this.listpre.splice(index ,1);
     }
  })
}
public confirmimg(): void{
  const archivoCapturado = this.ImgForm.value;
  //this.listImg.push(archivoCapturado);
  // var today = new Date();
  // var dd = String(today. getDate()). padStart(2, ‘0’);
  // var mm = String(today. getMonth() + 1). padStart(2, ‘0’); //January is 0!
  // var yyyy = today. getFullYear();
  // ​
  // today = mm  + dd +  yyyy;
  //document. write(today);


  let count =Math.random(); 
  for (let index = 0; index < this.listImg.length; index++) {
    //////////console.log("ingresa al for");
    const element = this.listImg[index];
    let fileName = 'adjunto_'+this.idIncidencia+'_'+count+'.jpg';//element.name+this.idIncidencia+count+'.jpg';
    this._incidenciaArchivo.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
    this._incidenciaArchivo.idIncidencia = this.incidenciaid;
    this._incidenciaArchivo.nombreArchivo = element.name;
    //////////console.log("nombre",this._incidenciaArchivo.nombreArchivo);
    this._incidenciaArchivo.urlArchivo =environment.directorio+fileName;
    this._incidenciaArchivo.fechaRegistro=new Date();
    //////////console.log("archivo",this._incidenciaArchivo)
    this.studentsServ.insertIncidenciaArchivos(this._incidenciaArchivo).subscribe(res =>{
      this.LoadFile();
      //////////console.log("imagen",res);
      // this.studentsServ.UploadPhoto(element, fileName).subscribe(res =>{
      //   //////////console.log("que bota",res)

      // })

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


 
  this.ImgForm.get('uploadFile').setValue('');
}
public confirmAdd(comentario): void {
  this.listaComentarios.push(this.EditorForm.value);
  //////////console.log("que bota", this.listaComentarios);

        this._comentario.id=0;
        this._comentario.comentario =  this.EditorForm.value.comentario;
        this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
        this._comentario.idIncidencia = this.incidenciaid;
        this._comentario.fechaRegistro = new Date();
        
        ////////////console.log("comentario",this._comentario);

        this.studentsServ.insertIncidenciaComentario(this._comentario).subscribe(res =>{
            //////////console.log("listaIncidencia",res); 
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
    //////////console.log("si entra");
    Swal.fire('Error', 'Ya copó el máximo de comentarios', 'error');
    var index= this.listaComentarios.indexOf(comentario);
    this.listaComentarios.splice(index ,1);
   }
  this.EditorForm.get('comentario').setValue('');
}

NoClickimg(){
  this.boolimg = true;
}
verfoto(){
  this.boolver = false;
}
deleteImg(img){
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Se eliminará la imagen: ", //+ row.razonSocial,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: '¡Sí, bórralo!',
  }).then((result) => {
    var index= this.listpre.indexOf(img);
           this.listpre.splice(index,1);
  });
}
onChangeTipo(value){
  //////////console.log("tipoIncidentes", this.Incidentes)
  /*this.subTipo = this.Incidentes.filter( x => x.idParametroPadre == value);
  //////////console.log("sub", this.subTipo)
  this.stdForm.get('idSubtipoIncidencia').setValue('');*/

}
onChangeEstado(value){
  if(value == 2){
    const dialogRef = this.dialog.open(FormSolutionsIncidenciaComponent,{
     data:{
       incidencia: this.incidenciaid,    
     }
  })}
  
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
