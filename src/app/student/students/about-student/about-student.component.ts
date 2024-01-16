import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { comentariosByIdincidenciaDTO, incidenciaArchivo, incidenciaComentario, incidenciaObj, prioridadHistorial, tags, tagsIncidencias } from 'src/app/system-models/incidencia';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { StudentsService } from '../all-students/students.service';
import {IncideciaService} from '../about-student/incidencia.service'
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormSolutionsSoporteComponent } from './form-solutions-soporte/form-solutions-soporte.component';
import { TeachersService } from '../../teachers/all-teachers/teachers.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.sass'],
})
export class AboutStudentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  isDisabled:  boolean = false;
  public Editor = ClassicEditor;
  public Editor2 = ClassicEditor;
  listaComentarios: incidenciaComentario []=[];
  sistema: any;
  public incidenciaid: any;
  boolEditor : boolean=true;
  boolimg : boolean;
  boolver: boolean=true;
  changeButon: boolean=false;
  estados: any ;
  Incidentes: any;
  tipoIncidentes: any;
  idIncidencia: number;
  listpre: any=[];
  listImg: File []= [];
  EditorForm: FormGroup;
  ImgForm: FormGroup;
  Incidencia: FormGroup;
  boolCalificacion:boolean=true;
  boolMotivo:boolean=true;
  breadscrums = [
    {
      title: 'Incidencias',
      items: ['Detalle'],
      active: 'Gestión',
    },
  ];
  tagList :tags[] = [];
  tagListResponse :tags[] = [];
  nombreTags: string[] = [];
  comentariosDTO:comentariosByIdincidenciaDTO[]=[]
  archivos: incidenciaArchivo []=[]
  cargaincidencia: any []=[] ; 
  refecha: any []=[];
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
  tagCtrl= new FormControl();
  separatorKeysCodes: number[] = [13]; 
  filteredTags: Observable<string[]>;
  selectable = true;
  removable = true;
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
  changeButton: any;
  listdeta: any;
  fileName: string;
  listTipEmpresa: any;
  listTipoTickets: any;
  prioridades: any;  
  incidenciaDetalle: incidenciaObj = {
    id: 0,
    idEmpSist: 0,
    idTicket: 0,
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
  ansText: string = '';
  tag: tags;
  constructor(public studentsServ : StudentsService,
    public teacherServ: TeachersService,
    private fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer,public dialog: MatDialog,
    private incidenciaService : IncideciaService,
    private router: Router,) {
    super();    
    this.incidenciaid=this.studentsServ.Incidenciadetalle.idIncidencia;
    console.log("incidencia",this.studentsServ.Incidenciadetalle);
    this.EditorForm = this.createContactForm();
    this.ImgForm=this.createContactoForm();
    this.Incidencia=this.createContactoForma();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.nombreTags.slice()));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nombreTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  
  Loadcomentarios(){
        this.incidenciaService.getComentariosByIdincidencia(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
        this.comentariosDTO = res.objModel;      
      })
     this.studentsServ.getParameterDetail(11).subscribe( res => {
      this.estados = res;
      let option= this.estados.filter(x => x.nombre=='Observado')[0];
      let optios1= this.estados.filter(x => x.nombre=='Conforme')[0];
      var index= this.estados.indexOf(option,optios1);
      this.estados.splice(index ,2);
    })
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      this.tipificaciones = res;
    })    
    this.studentsServ.getTags().subscribe( res => {
      this.tagListResponse = res.objModel;
      this.nombreTags= res.objModel.map(tag => tag.nombreTag);
    })
    this.studentsServ.getTagListByIdIncidencia(this.incidenciaid).subscribe( res => {
      if(res.objModel != []){
        this.tagList = res.objModel;
      }
    })
   }
  LoadFile(){
    this.incidenciaService.getIncidenciaArchivo(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
      this.archivos = res.objModel;       
    })
  }
  loadIncidencia(){
    this.studentsServ.getListTipificaciones(this.studentsServ.Incidenciadetalle.idEmpresa).subscribe(res=>{
      this.listTipEmpresa = res.objModel.listTipificacion;
      this.listTipoTickets = res.objModel.listTipoIncidencias;
      //console.log("tipificacion",this.listTipEmpresa);
      this.Incidencia=this.createContactoForma();
      this.incidenciaService.getIncidencia(this.studentsServ.Incidenciadetalle.idIncidencia).subscribe(res =>{
        console.log("res", res.objModel)        
        this.incidenciaDetalle = res.objModel;
        this.ansText = this.incidenciaDetalle.cumplioANS == 1? 'SI' : this.incidenciaDetalle.cumplioANS == 0?'NO':'En Proceso';
        this.cargaincidencia.push(res.objModel); 
        this.changeButton= res.objModel.idEstado;
         if(this.changeButton == 4){
           this.changeButon=true;
         }
        this.refecha.push(res.objModel.fechaRegistro)
        this.Incidencia.get('idTipoIncidencia').setValue(res.objModel.idTipoIncidencia);
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
        this.studentsServ.getParameterDetail(9).subscribe( res => {      
          this.prioridades = res;
          this.Incidencia.get('prioridad').setValue(this.incidenciaDetalle.idPrioridad);      
        })  
        this.Incidencia.get('horasEjecutadas').setValue(this.incidenciaDetalle.horasEjecutadas);  
        this.Incidencia.get('horasEstimadas').setValue(this.incidenciaDetalle.horasEstimadas);  
      })  
      
    })        
    this.studentsServ.getParameterDetail(10).subscribe( res => {      
      this.Incidentes = res;
      this.tipoIncidentes = this.Incidentes.filter( x => x.idParametroPadre == -1);
      
    })      
  }
  
   createContactoForma():FormGroup<any>{
    return this.fb.group({
         idTipoIncidencia: ['',Validators.required],
         idSubtipoIncidencia: [''],
         fechaAtencion: [new Date()],
         fechaRegistro: [this.refecha.values],
         fechaActualiza: [new Date()],
         idEstado: [this.changeButton],
         tipificacion : ['',Validators.required],
         prioridad:[this.incidenciaDetalle.idPrioridad],
         motivo:[''],
         horasEstimadas : [this.studentsServ.Incidenciadetalle.horasEstimadas, Validators.required],
         horasEjecutadas : [this.studentsServ.Incidenciadetalle.horasEjecutadas, Validators.required,]

     })
   }
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tag = this.tagListResponse.filter( x => x.nombreTag == value)[0];
      console.log("tag", this.tag)
      if(this.tag){
        this.insertTagIncidencia(this.incidenciaid, this.tag.id)
      }else{
        this.tag ={
          id : 0,
          nombreTag : value
        }        
        this.insertNewTag(this.tag);
      }       
      
    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
   }
  insertTagIncidencia(idIncidencia: number, idTag: number) {
    let tagInc :tagsIncidencias={
      id: 0,
      idTag: idTag,
      idIncidencia: idIncidencia,
      solucionRaiz: false
    }
    this.studentsServ.insertTagIncidencia(tagInc).subscribe(res =>{
      if(res.objModel > 0){
        this.tagList.push(this.tag);
      }
    })
  }
  insertNewTag(tag: tags) {
    this.studentsServ.insertTag(tag).subscribe(res =>{
      this.tag.id=res.objModel;
      this.insertTagIncidencia(this.incidenciaid, this.tag.id)      
    })
  }
   selected(event): void {
    console.log("event", event.option.viewValue)
    const value = event.option.viewValue;
    if ((value || '').trim()) {
      this.tag = this.tagListResponse.filter( x => x.nombreTag == value)[0];
      console.log("tag", this.tag)
      if(this.tag && !this.tagList.includes(this.tag)){
        this.insertTagIncidencia(this.incidenciaid, this.tag.id)
      }else{
        this.tag ={
          id : 0,
          nombreTag : value
        }     
        this.insertNewTag(this.tag);
      }    
      
    }
    this.tagCtrl.setValue(null);
   }
   remove(tag: tags){    
    console.log("tag-delete:", tag)
     this.studentsServ.deleteTagsById(tag.id, this.incidenciaid).subscribe( res =>{
       if(res){        
        const index = this.tagList.indexOf(tag);
        this.tagList.splice(index, 1);
       }      
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

   grabarRespuesta(){
    this.listaComentarios.push(this.EditorForm.value);  
    this._comentario.id=0;
    this._comentario.comentario =  this.EditorForm.value.comentario;
    this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
    this._comentario.idIncidencia = this.incidenciaid;
    this._comentario.fechaRegistro = new Date();
    this.studentsServ.insertIncidenciaComentario(this._comentario).subscribe(res =>{        
        this.Loadcomentarios();
        this.boolEditor = true;
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
   }
   grabarNotificar(){
    this.listaComentarios.push(this.EditorForm.value);  
    this._comentario.id=0;
    this._comentario.comentario =  this.EditorForm.value.comentario;
    this._comentario.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
    this._comentario.idIncidencia = this.incidenciaid;
    this._comentario.fechaRegistro = new Date();
    this.studentsServ.insertIncidenciaComentarioNotificar(this._comentario).subscribe(res =>{        
        this.Loadcomentarios();
        this.boolEditor = true;
        Swal.fire({
          title: 'OK',
          text: "Se agregó respuesta correctamente, y se notificó al usuario", 
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',          
          confirmButtonText: '¡OK!',
        })        
      })
    this.EditorForm.get('comentario').setValue('');
   }
   actualizarIncidencia(){  
    let actualizacion = this.Incidencia.getRawValue();
    ////console.log("data",actualizacion);
    let idIncidencia = this.cargaincidencia[0].id;
    let data= JSON.parse(localStorage.getItem('currentUser'));
    let obj :incidenciaObj={
      id: idIncidencia,
      idTicket: this.studentsServ.Incidenciadetalle.idTicket,
      idEmpSist: 0,
      idUsuarioRegistro: 0,
      idTipoIncidencia: actualizacion.idTipoIncidencia,
      idSubtipoIncidencia: 0,
      idTipificacion: actualizacion.tipificacion,
      nombre: '',
      fechaRegistro: this.studentsServ.Incidenciadetalle.fechaRegistro,
      idPrioridad: this.Incidencia.get('prioridad').value,
      idEstado: actualizacion.idEstado,
      fechaAtencion: new Date(),
      calificacionIncidente: this.calificacionIncidente,
      esActivo: 0,
      cumplioANS: 0,
      idUsuarioActualiza: data.id,
      fechaActualiza: new Date(),
      horasEstimadas: this.Incidencia.get('horasEstimadas').value,
      horasEjecutadas: this.Incidencia.get('horasEjecutadas').value
    }
    //console.log("objeto",obj);
  
    const clientTimeZone = moment.tz.guess();
    let date;
    if (clientTimeZone == 'America/Lima') {
       date = moment().tz('America/Lima');
    } else {
        date = moment().tz('America/Lima');
    }
        obj.fechaActualiza= date._d;
  
    this.studentsServ.updateincidenciaTipifica(obj).subscribe( res =>{
      if(this.incidenciaDetalle.idPrioridad != this.Incidencia.get('prioridad').value){
        if (clientTimeZone == 'America/Lima') {
          date = moment().tz('America/Lima');
       } else {
           date = moment().tz('America/Lima');
       }
        let objPrioridad : prioridadHistorial = {
          id: 0,
          idIncidencia: idIncidencia,
          idUsuario: Number(JSON.parse(localStorage.getItem('currentUser')).id),
          idPrioridadInicial: this.incidenciaDetalle.idPrioridad,
          idPrioridadFinal: this.Incidencia.get('prioridad').value,
          motivo: this.Incidencia.get('motivo').value,
          fechaRegistro: date._d
        }
        this.studentsServ.insertPrioridad(objPrioridad).subscribe(resPrioridad =>{
          if(res.objModel){
            Swal.fire({
              title: 'OK',
              text: "Se actualizó incidencia correctamente", 
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',          
              confirmButtonText: '¡OK!',
            })   
            this.router.navigate(['/soporte/incidencias/incidencias']);     
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
      }else{
        if(res.objModel){
          Swal.fire({
            title: 'OK',
            text: "Se actualizó incidencia correctamente", 
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',          
            confirmButtonText: '¡OK!',
          })   
          this.router.navigate(['/soporte/incidencias/incidencias']);     
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
      }
      
    })

   }

  ngOnInit(): void {
    this.Loadcomentarios();
    this.LoadFile();
    this.loadIncidencia();
    //console.log("prioridad", this.studentsServ.Incidenciadetalle.idPrioridad)  
  }    
  addComentario(){
    this.boolEditor = false;
  }
  onNoClick(): void {
    this.router.navigate(['/soporte/incidencias/incidencias']); 
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
  //this.boolimg = false;
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
    this._incidenciaArchivo.idIncidencia = this.incidenciaid;
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
  // const archivoCapturado = this.ImgForm.value;
  // let count =Math.random();
  // for (let index = 0; index < this.listImg.length; index++) {  
  //   const element = this.listImg[index];
  //   if(element.type.toString().includes('pdf')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoSop_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.name.toString().includes('.doc')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoSop_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.name.toString().includes('.xls')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoSop_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.name.toString().includes('.zip')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoCli_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.name.toString().includes('.rar')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoCli_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.name.toString().includes('.txt')){
  //     let extension = this.getFileExtension(element.name);
  //     this.fileName = 'adjuntoCli_'+this.incidenciaid+'_'+count+'.'+extension;
  //   }else if (element.type.toString().includes('image')){
  //     this.fileName = 'adjuntoSop_'+this.incidenciaid+'_'+count+'.jpg';
  //   }    
  //   this._incidenciaArchivo.idUsuario = Number(JSON.parse(localStorage.getItem('currentUser')).id);
  //   this._incidenciaArchivo.idIncidencia = this.incidenciaid;
  //   this._incidenciaArchivo.nombreArchivo = element.name;
  //   this._incidenciaArchivo.urlArchivo =environment.directorio+this.fileName;
  //   this._incidenciaArchivo.fechaRegistro=new Date();
  //   this.studentsServ.insertIncidenciaArchivos(this._incidenciaArchivo).subscribe(res =>{
  //     this.studentsServ.UploadPhoto(element, this.fileName).subscribe(res =>{
  //     })
  //     this.LoadFile();


  //   })
  //   count++;
  // }
  // this.listpre=[''];
  // Swal.fire({
  //   title: 'OK',
  //   text: "Se registro correctamente", 
  //   icon: 'success',
  //   showCancelButton: false,
  //   confirmButtonColor: '#3085d6',          
  //   confirmButtonText: '¡OK!',
  // }) 
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
}

NoClickimg(){
  //this.boolimg = true;
}
verfoto(){
  this.boolver = false;
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
onChangePrioridad(value){
  if(this.incidenciaDetalle.idPrioridad != value){
   this.boolMotivo = false;

  }else{
    this.boolMotivo = true;
    this.Incidencia.get('motivo').setValue('');
  }
 
}
onChangeEstado(value){
  if(value == 2){
    const dialogRef = this.dialog.open(FormSolutionsSoporteComponent,{
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
  volverBandeja(){
    this.router.navigate(['/soporte/incidencias/incidencias']);    
  }
}
