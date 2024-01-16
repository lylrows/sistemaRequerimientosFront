import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { incidenciaSolucion, incidenciaSolucionArchivos, incidenciaSolucionPalabrasClave, tag } from 'src/app/system-models/incidencia';
import { parametroDetalle } from 'src/app/system-models/parametros';
import { incidenciaObj, IncidenciaSol, LstIncidenciaSolArchivo, LstIncidenciaSolPalabra } from 'src/app/system-models/solucionObj';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-solutions-soporte',
  templateUrl: './form-solutions-soporte.component.html',
  styleUrls: ['./form-solutions-soporte.component.sass']
})
export class FormSolutionsSoporteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new UntypedFormControl();
  filteredTags: Observable<any[]>;
  tagList: string[] = [];
  AllTags: string[] = [];  
  dialogTitle: string;
  accion: string;
  previzualizacion: string;
  listpre: any=[];
  listImg: File[]= [];

  menuForm: FormGroup;
  Perfiles: any;
  ImgForm: FormGroup; 
  @ViewChild('tagInput', { static: true })
  tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;
  Soluciones: any;
  IncSolucionObj:incidenciaSolucion ={
    id: 0,
    idIncidencia: 0,
    tipoSolucion: 0,
    solucion: '',
    comentarios: ''
  }
  tagListBD: parametroDetalle[]=[];
  parDetalle:parametroDetalle = {
    id: 0,
    idParametro: 0,
    codigo: '',
    nombre: '',
    valor: '',
    valorEntero: 0,
    valorAuxiliar: '',
    idParametroPadre: 0,
    esActivo: 0
  };
  tagSoluciones:tag[]=[]
  tagAdd:tag={
    id: 0,
    nombre: ''
  }
  tagSolucionesList : LstIncidenciaSolPalabra[]=[];
  tagsObj:LstIncidenciaSolPalabra={
    id: 0,
    idIncidenciaSolucion: 0,
    palabraClave: '',
    
  }
  
  
  solucionArchivo: LstIncidenciaSolArchivo={
    id: 0,
    idIncidenciaSolucion: 0,
    idUsuario: 0,
    urlArchivo: '',
    nombreArchivo: ''
  }
  
  solucion: incidenciaObj={
    incidenciaSol: undefined,
    lstIncidenciaSolArchivos: [],
    lstIncidenciaSolPalabras: []
  }
  fileName: string;
  boolimg: boolean;
  result: boolean;
  

  constructor(public dialogRef: MatDialogRef<FormSolutionsSoporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router) {      
      ////////////console.log("dataIn", data.incidencia) 
      this.dialogTitle = 'Registrar Solución: ';      
      this.menuForm = this.createContactForm();
      this.ImgForm=this.createContactoForm();
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.AllTags.slice()
        )
      );      
   }
   createContactForm(): FormGroup<any> {
    return this.fb.group({
      id : [this.IncSolucionObj.id],
      idIncidencia : [this.data.incidencia],     
       tipoSolucion : ['', Validators.required],
       solucion : ['', Validators.required],
       comentarios : [''],
    });
    
  }
  createContactoForm(): FormGroup<any> {
    return this.fb.group({
      uploadFile:['']
     })
   }
  
  add(event: MatChipInputEvent): void {
    this.tagsObj ={
      id: 0,
      idIncidenciaSolucion: 0,
      palabraClave: '',
     }
    // this.tagAdd ={
    //   id: 0,
    //   nombre: ''
    // }
    const input = event.input;
    const value = event.value;
    // Agregar Tags
    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      ////////////console.log("value:", value.trim())
      this.tagsObj.id=0;
      this.tagsObj.idIncidenciaSolucion=0;
      this.tagsObj.palabraClave = value.trim();
      this.tagSolucionesList.push(this.tagsObj);
    }
    // Resetear el input
    if (input) {
      input.value = '';
    }
    this.tagsCtrl.setValue(null);
    ////////////console.log("tagsoluciones",this.tagSoluciones);
  }
  remove(tag: string): void {
    ////////////console.log("remove",tag);
    
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
    let tagremove= this.tagSolucionesList.filter(x=> x.palabraClave== tag)[0];
    const indextag = this.tagSolucionesList.indexOf(tagremove);
    this.tagSolucionesList.splice(indextag, 1);

  }
  selected(event: MatAutocompleteSelectedEvent): void {
    ////////////console.log("event",event.option.value);
     this.tagsObj ={
      id: 0,
      idIncidenciaSolucion: 0,
      palabraClave: '',
     }
     let _nombre =event.option.viewValue;
     this.parDetalle = this.tagListBD.filter( x => x.nombre == _nombre)[0];
    // ////////////console.log("det:", this.parDetalle)
     this.tagsObj.id = 0;
     this.tagsObj.idIncidenciaSolucion=0;//this.parDetalle.id;
     this.tagsObj.palabraClave = _nombre;
     this.tagSolucionesList.push(this.tagsObj);


    this.tagList.push(event.option.viewValue);
     this.tagInput.nativeElement.value = '';
     this.tagsCtrl.setValue(null);
     //this.tagsObj.palabraClave=event.option.value;
     //this.tagSolucionesList.push(this.tagsObj);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit(): void {  
    this.LoadPerfiles();
  }
  
  capturarFile(event){
    if(this.listImg.length == 1){
      // Swal.fire('Advertencia', 'Solo puede subir un archivo', 'warning');
      this.showNotification(
        'snackbar-warning',
        'Solo puede subir un archivo',
        'bottom',
        'center'
      );
      this.ImgForm.get('uploadFile').setValue('');
      
      return;
    }
    const archivonuevo=event.target.files[0];
    if (archivonuevo.size > 5 * 1024 * 1024) {
      this.showNotification(
        'snackbar-warning',
        'El archivo es demasiado grande, el tamaño máximo es de 5 megabytes.',
        'bottom',
        'center'
      );
      //Swal.fire('Advertencia', 'El archivo es demasiado grande, el tamaño máximo es de 5 megabytes.', 'warning');
      this.ImgForm.get('uploadFile').setValue('');
      return;
    }
    const extensionesPermitidas = ['.doc', 'docx', '.xls', 'xlsx', '.pdf', '.jpg', 'jpeg', '.png', '.txt', '.rar', '.zip'];
    const extensionArchivo = archivonuevo.name.slice(-4);
    ////console.log("file", archivonuevo)
    if (!extensionesPermitidas.includes(extensionArchivo)) {
      this.showNotification(
        'snackbar-warning',
        'El tipo de archivo no está permitido, solo se permiten: doc, docx, xls, xlsx, pdf, jpg, jpeg, png, txt, rar, zip',
        'bottom',
        'center'
      );
      //Swal.fire('Advertencia', 'El tipo de archivo no está permitido, solo se permiten: doc, docx, xls, xlsx, pdf, jpg, jpeg, png, txt, rar, zip', 'warning');
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
  GoextraerBase64(archivonuevo: any) {
    this.extraerBase64(archivonuevo).then((imagen: any)=>{
      this.previzualizacion = imagen.base;
      this.listpre.push(imagen.base);
    })
  }
  deleteImg(img){
    this.boolimg = true;
    // var index= this.listpre.indexOf(img);
    // this.listpre.splice(index,1); 
    // this.listImg.splice(index,1); 
    this.showNotification(
      'snackbar-success',
      'Archivo eliminado',
      'bottom',
      'center'
      
    );
      if(this.showNotification){
        var indexImg = this.listImg.findIndex(file => file.name === img.name && file.size === img.size);
        this.listpre.splice(indexImg,1);     
        this.listImg.splice(indexImg,1);  
        this.boolimg = false;
      }else {
        this.boolimg = false;
      }
      
     
    
  }
   
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

  
  LoadPerfiles() {
    this.seguridadService.getParameterDetails(2).subscribe(res =>{
      this.Perfiles = res;
    })
    this.seguridadService.getParameterDetails(13).subscribe(res =>{
      this.Soluciones = res;
      ////////////console.log("??",this.Soluciones);
    })
    this.seguridadService.getParameterDetails(14).subscribe(res =>{
      this.tagListBD = res;
      ////////////console.log("que es", this.tagListBD);
      this.tagListBD.forEach(element => {
        this.AllTags.push(element.nombre);
      });
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
  public confirmAdd(): void {
  //console.log("imagen",this.listImg);
    for (let index = 0; index < this.listImg.length; index++) {

      let count =Math.random();
      
    const element = this.listImg[index];
    //console.log("element",element);
    this.IncSolucionObj=this.menuForm.value;
    let idincidencia = this.IncSolucionObj.idIncidencia;
    if(element.type.toString().includes('pdf')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////////console.log("pdf")
    }else if (element.name.toString().includes('.doc')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////////console.log("word")
    }else if (element.name.toString().includes('.xls')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////////console.log("excel")
    }else if (element.name.toString().includes('.zip')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////console.log("zip")
    }else if (element.name.toString().includes('.rar')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////console.log("zip")
    }else if (element.name.toString().includes('.txt')){
      let extension = this.getFileExtension(element.name);
      this.fileName = 'solucion'+idincidencia+'_'+count+'.'+extension;
      ////console.log("zip")
    }else if (element.type.toString().includes('image')){
      ////////console.log("imagen")
      this.fileName = 'solucion'+idincidencia+'_'+count+'.jpg';
    }
    this.solucionArchivo.id=0;
        this.solucionArchivo.idIncidenciaSolucion=this.tagsObj.idIncidenciaSolucion;
        this.solucionArchivo.idUsuario=Number(JSON.parse(localStorage.getItem('currentUser')).id);
        this.solucionArchivo.nombreArchivo=element.name;
        this.solucionArchivo.urlArchivo=environment.directorio+this.fileName;
      
      ////console.log("foto",this.solucionArchivo);
      this.seguridadService.UploadPhoto(element,this.fileName).subscribe(res=>{
        
        
        ////console.log("foto",this.solucion.lstIncidenciaSolArchivos);
        
      })
      
      
      
    }
      this.solucion.incidenciaSol=this.IncSolucionObj;
      this.solucion.lstIncidenciaSolArchivos.push(this.solucionArchivo);
      this.solucion.lstIncidenciaSolPalabras=this.tagSolucionesList;
      //console.log("objetoCompleto",this.solucion);
      this.seguridadService.insertSolucion(this.solucion).subscribe(res =>{
      
      })
      

  Swal.fire({
    title: 'OK',
    text: "Se registro correctamente", 
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',          
    confirmButtonText: '¡OK!',
  })
  this.dialogRef.close();
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