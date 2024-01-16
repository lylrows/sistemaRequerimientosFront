import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mejoras, mejorasArchivos } from 'src/app/system-models/deleteObj';
import { DepartmentService } from '../all-departments/department.service';
import * as moment from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mejoraComplete } from 'src/app/system-models/mejoras';
import { MatDialog } from '@angular/material/dialog';
import { AsociarTicketDialogComponent } from './dialogs/asociar-ticket-dialog/asociar-ticket-dialog.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.sass'],
})
export class AddDepartmentComponent implements OnInit {
  public Editor = ClassicEditor;
  departmentForm: UntypedFormGroup;
  actualiza : boolean = true;
  breadscrums = [
    {
      title: 'Mejoras',
      items: ['Mejoras'],
      active: 'Agregar mejoras',
    },
  ];
  mejoras_ : mejoras={
    id: 0,
    idSistema: 0,
    idTipo: 0,
    prioridad: 0,
    idUsuarioRegistro: 0,
    idUsuarioAsignado: 0,
    titulo: '',
    descripcion: '',
    horasEstimadas: 0,
    horasConsumidas: 0,
    fechaRegistro: new Date(),
    fechaAtencion: new Date(),
    idUsuarioCliente: 0,
    idEstado: 0,
    comentario: '',
    idUsuarioActualiza: 0,
    fechaActualiza: new Date(),
    esActivo: 0,
    idEmpresa: 0,
    idMejora: 0
  }
  mejorasArchivos_: mejorasArchivos={
    id: 0,
    idMejora: 0,
    idUsuario: 0,
    urlArchivo: '',
    nombreArchivo: '',
    fechaRegistro: new Date()
  }
  ImgForm: FormGroup;
  listpre: any=[];
  listImg: File[] = [];
  fileName: string;
  idIncidencia: number;
  idMejora: number;
  EditorForm: FormGroup;
  sistemas: any;
  usuariosByEmpresa: any[] = [];
  prioridades: any;
  estados: any;
  tipoMejora: any;
  mejoraData: mejoraComplete;
  sistemaEmpresas: any;
  sistemasList: any[]=[];
  user: any;
  ticketsAsociados: any[]
  columnas: string[] =['idTicket','nombre','fechaRegistro','action']
  constructor(private fb: UntypedFormBuilder,
    public departmentService: DepartmentService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router,) {
      this.user= JSON.parse(localStorage.getItem('currentUser'));
      this.mejoraData = this.departmentService.Incidenciadetalle;
        //console.log("data de mejora", this.mejoraData);
      if(this.mejoraData.id != 0){
        //console.log("if")
        this.actualiza = false;
        this.departmentForm = this.fb.group({
          sistema: [this.mejoraData.idSistema, [Validators.required]],
          tipo: [this.mejoraData.idTipo, [Validators.required]],
          prioridad: [this.mejoraData.prioridad, [Validators.required]],
          usuarioReg: [this.mejoraData.usuarioRegistro],
          titulo: [this.mejoraData.titulo, [Validators.required]],
          estado: [this.mejoraData.valorEstado],
          comentario:[this.mejoraData.descripcion, [Validators.required]],
          uploadFile:[''],
          empresa: [this.mejoraData.idEmpresa],
          horasEstimadas: [this.mejoraData.horasEstimadas],
          horasConsumidas: [this.mejoraData.horasConsumidas],
          idUsuarioAsignado : [0],
          aprobado: [this.mejoraData.aprobado],
        });
        /*this.departmentForm.get('sistema')?.setValue(this.mejoraData.idSistema);
        this.departmentForm.get('tipo')?.setValue(this.mejoraData.idTipo);
        this.departmentForm.get('prioridad')?.setValue(this.mejoraData.prioridad);
        this.departmentForm.get('titulo')?.setValue(this.mejoraData.titulo);
        this.departmentForm.get('comentario')?.setValue(this.mejoraData.descripcion);
        this.departmentForm.get('empresa')?.setValue(this.mejoraData.idEmpresa);
        this.departmentForm.get('horasEstimadas')?.setValue(this.mejoraData.horasEstimadas);
        this.departmentForm.get('horasConsumidas')?.setValue(this.mejoraData.horasConsumidas);
        this.departmentForm.get('aprobado')?.setValue(this.mejoraData.aprobado);*/
        this.departmentService.getMejoraArchivo(this.mejoraData.id).subscribe(res=>{
          ////console.log("img",res)
          this.listpre = res
        })
        this.departmentService.getSistemasByEmpresa(this.mejoraData.idEmpresa).subscribe(res=>{
          this.sistemas = res.objModel
          ////console.log("sistema",this.sistemas);
        })
        
      }else{
        //console.log("else")
        this.departmentForm = this.fb.group({
          sistema: ['', [Validators.required]],
          tipo: ['', [Validators.required]],
          prioridad: ['', [Validators.required]],
          usuarioReg: [''],
          titulo: ['', [Validators.required]],
          estado: [1],
          idUsuarioAsignado : [0],
          comentario:['', [Validators.required]],
          uploadFile:[''],
          empresa: ['', [Validators.required]],
          horasEstimadas: ['', [Validators.required]],
          horasConsumidas: [''],
          aprobado: [''],
        });
      }
 
   
  }
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    // this.departmentService.getSistemasByEmpresa(user.idEmpresa).subscribe(res=>{
    //   this.sistemas = res.objModel
    //   //////console.log("sistema",this.sistemas);
    // })
    this.departmentService.getParameterDetail(9).subscribe( res => {
      this.prioridades = res;
      //////console.log("prioridades",this.prioridades);
    })
    this.departmentService.getParameterDetail(17).subscribe( res => {
      this.estados = res;
      //console.log("estados",this.estados);
    })
    this.departmentService.getParameterDetail(16).subscribe( res => {
      this.tipoMejora = res;
      //////console.log("mejora",this.tipoMejora);
    })
    this.departmentService.getNivelSoporteById(user.id).subscribe(res =>{
      let sistemas =res.objModel;
      this.sistemaEmpresas = res.objModel;
      ////console.log("empresa",this.sistemas);
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
      ////console.log("empresas",this.sistemasList)
    })
    // if(this.mejoraData.id != null || this.mejoraData.id != undefined){
    //   this.departmentService.getMejoraArchivo(this.mejoraData.id).subscribe(res=>{
    //     ////console.log("img",res)
    //     this.listpre = res
    //   })
    // }
    
  }
  asociarTickets(){
    let empresa = this.departmentForm.get('empresa')?.value;
    let sistema = this.departmentForm.get('sistema')?.value;
    //console.log("empresa",empresa)
    //console.log("sistema",sistema)
    if(empresa == 0){
      Swal.fire('Advertencia', 'Debe seleccionar una empresa.', 'warning');
      return;
    }
    if(sistema == 0){
      Swal.fire('Advertencia', 'Debe seleccionar un sistema.', 'warning');
      return;
    }
    const filter = {
      "idEmpresa": empresa,
      "idSistema": sistema
    }
    this.departmentService.getTicketsAsosciados(filter).subscribe( res =>{
      //console.log("res", res.objModel)
      const dialogRef = this.dialog.open(AsociarTicketDialogComponent, {
        data: res.objModel
        
      });
    })
    
  }
  onSubmit() {
    //////////////console.log('Form Value', this.departmentForm.value);
  }
  selectEmpresa(event){
    this.sistemas = this.sistemaEmpresas.filter(x =>x.idEmpresa == event.value)
    this.LoadUsuarios(event.value);
  }
  LoadUsuarios(idEmpresa: number) {
    this.departmentService.getUsuariosByEmpresa(idEmpresa).subscribe(res =>{
      //console.log("usuarios", res.objModel)
      this.usuariosByEmpresa = res.objModel;
    })
  }
  capturarFile(event){
    if(this.listImg.length == 1){
      Swal.fire('Advertencia', 'Se permite un archivo', 'warning');
      this.departmentForm.get('uploadFile').setValue('');
      return;
    }
    const archivonuevo=event.target.files[0];
    if (archivonuevo.size > 5 * 1024 * 1024) {
      Swal.fire('Advertencia', 'El archivo es demasiado grande, el tamaño máximo es de 5 megabytes.', 'warning');
      this.departmentForm.get('uploadFile').setValue('');
      return;
    }
    const extensionesPermitidas = ['.jpg', 'jpeg', '.png'];
    const extensionArchivo = archivonuevo.name.slice(-4);
    ////////console.log("file", archivonuevo)
    if (!extensionesPermitidas.includes(extensionArchivo)) {
      Swal.fire('Advertencia', 'El tipo de archivo no está permitido, solo se permiten imágenes', 'warning');
      this.departmentForm.get('uploadFile').setValue('');
      return;
    }    
    this.listImg.push(event.target.files[0]);
    if (archivonuevo.type.toString().includes('image')){
      this.extraerBase64(archivonuevo).then((imagen: any)=>{     
        this.listpre.push(imagen.base);      
      })
    }
    this.departmentForm.get('uploadFile').setValue('');
  }
  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
  putMejora(){
    const clientTimeZone = moment.tz.guess();
    let date;
if (clientTimeZone == 'America/Lima') {
  date = moment().tz('America/Lima');
} else {
  date = moment().tz('America/Lima');
}
let user = JSON.parse(localStorage.getItem('currentUser'));
    this.mejoras_.id=this.mejoraData.id;
    this.mejoras_.idSistema= this.departmentForm.value.sistema;
    this.mejoras_.idTipo= this.departmentForm.value.tipo;
    this.mejoras_.prioridad= this.departmentForm.value.prioridad;
    this.mejoras_.idUsuarioRegistro=this.mejoraData.idUsuarioRegistro;
    //this.mejoras_.idUsuarioAsignado= this.mejoraData.idUsuarioAsignado;
    this.mejoras_.titulo= this.departmentForm.value.titulo;
    this.mejoras_.descripcion= this.departmentForm.value.comentario;
    this.mejoras_.horasEstimadas=this.mejoraData.horasEstimadas;
    this.mejoras_.horasConsumidas=this.departmentForm.value.horasConsumidas;
    this.mejoras_.fechaRegistro= this.mejoraData.fechaRegistro;
    this.mejoras_.fechaAtencion= this.mejoraData.fechaAtencion;
    this.mejoras_.idUsuarioAsignado= this.departmentForm.value.idUsuarioAsignado;
    this.mejoras_.idEstado= this.departmentForm.value.estado;
    this.mejoras_.comentario= this.mejoraData.comentario;
    this.mejoras_.idUsuarioActualiza= user.id;
    this.mejoras_.fechaActualiza= date._d;
    this.mejoras_.esActivo= this.mejoraData.esActivo;
    this.mejoras_.idEmpresa=this.mejoraData.idEmpresa;
    
    if(user.isGerente && user.idEmpresa == this.mejoraData.idEmpresa ){
      //this.mejoras_.aprobado=this.departmentForm.value.aprobado;
      this.mejoras_.idUsuarioCliente=user.id;
    }else{
      this.mejoras_.idUsuarioCliente=0;
     // this.mejoras_.aprobado=0;
    }
    //console.log("mejora",this.mejoras_)
    
    this.departmentService.putMejora(this.mejoras_).subscribe(res=>{

    })
    Swal.fire({
      title: 'OK',
      text: "Se actualizo correctamente", 
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',          
      confirmButtonText: '¡OK!',
    })
    this.router.navigate(['/soporte/mejoras/bandeja']);
  }
  addMejora(){
    const clientTimeZone = moment.tz.guess();
    let date;
if (clientTimeZone == 'America/Lima') {
  date = moment().tz('America/Lima');
} else {
  date = moment().tz('America/Lima');
}
let user = JSON.parse(localStorage.getItem('currentUser'));
    this.mejoras_.id=0;
    this.mejoras_.idSistema= this.departmentForm.value.sistema;
    this.mejoras_.idTipo= this.departmentForm.value.tipo;
    this.mejoras_.prioridad= this.departmentForm.value.prioridad;
    this.mejoras_.idUsuarioRegistro=user.id;
    this.mejoras_.idUsuarioAsignado= 0;
    this.mejoras_.titulo= this.departmentForm.value.titulo;
    this.mejoras_.descripcion= this.departmentForm.value.comentario;
    this.mejoras_.horasEstimadas= this.departmentForm.value.horasEstimadas;
    this.mejoras_.horasConsumidas= 0;
    this.mejoras_.fechaRegistro= date._d;
    this.mejoras_.fechaAtencion= new Date();//null;
   
    this.mejoras_.idEstado= this.departmentForm.value.aprobado == 1? 2 : 1;
    this.mejoras_.comentario= '';
    this.mejoras_.idUsuarioActualiza= 0;
    this.mejoras_.fechaActualiza= new Date();//null;
    this.mejoras_.esActivo= 1;
    this.mejoras_.idEmpresa=this.departmentForm.value.empresa;
    
    if(user.isGerente){
      //this.mejoras_.aprobado=this.departmentForm.value.aprobado;
      this.mejoras_.idUsuarioCliente=user.id;
    }else{
      this.mejoras_.idUsuarioCliente=0;
      //this.mejoras_.aprobado=0;
    }
    //console.log("mejora",this.mejoras_)
    this.departmentService.postMejora(this.mejoras_).subscribe(res=>{
      this.idMejora = Number(res.objModel);
      if (this.listImg.length == 0){
        Swal.fire({
          title: 'OK',
          text: "Se registro correctamente", 
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',          
          confirmButtonText: '¡OK!',
        })
        this.router.navigate(['/soporte/mejoras/bandeja']);
        return;
      }
      let count =1; 
            /*for (let index = 0; index < this.listImg.length; index++) {
              //////console.log("Forimagen",this.listImg)
              const element = this.listImg[index];*/

               if (this.listImg[0].type.toString().includes('image')){
                ////////////console.log("imagen")
                this.fileName = 'adjuntoMejo_'+this.idMejora+'_'+count+'.jpg';
              }


              this.mejorasArchivos_.nombreArchivo = this.listImg[0].name;
              //////////////console.log("nombrearchivo",this._incidenciaArchivo.nombreArchivo);
              //let fileName = 'adjunto_'+this.idIncidencia+'_'+count+'.jpg';
              this.mejorasArchivos_.idUsuario = user.id;
              this.mejorasArchivos_.idMejora = this.idMejora;
              this.mejorasArchivos_.urlArchivo =environment.directorio+this.fileName;
              this.mejorasArchivos_.fechaRegistro=date._d;
              ////////////console.log("imagen",this._incidenciaArchivo);
              this.departmentService.insertMejoraArchivos(this.mejorasArchivos_).subscribe(res =>{
                 this.departmentService.UploadPhoto(this.listImg[0], this.fileName).subscribe(res =>{
                   //////////////console.log("que bota",res.objModel);
                   count++;
                   Swal.fire({
                     title: 'OK',
                     text: "Se registro correctamente", 
                     icon: 'success',
                     showCancelButton: false,
                     confirmButtonColor: '#3085d6',          
                     confirmButtonText: '¡OK!',
                   })
                   this.router.navigate(['/soporte/mejoras/bandeja']);
                 })
                 //this.LoadFile();
      

              })
              
            //}
    })
  }
  cancelar(){
    this.router.navigate(['/soporte/mejoras/bandeja']);
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
      var indexPre = this.listpre.indexOf(img);
      this.listpre.splice(indexPre,1); 
      var indexImg = this.listImg.indexOf(img);
      this.listImg.splice(indexImg,1); 
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
}
