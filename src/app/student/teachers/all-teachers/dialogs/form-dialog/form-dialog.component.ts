import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FormImagenDetailComponent } from '../../../../../admin/students/about-student/form-imagen-detail/form-imagen-detail.component';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { incidenciaSolucion, incidenciaSolucionArchivos, incidenciaSolucionPalabrasClave, tag } from 'src/app/system-models/incidencia';
import { parametroDetalle } from 'src/app/system-models/parametros';
import { incidenciaObj, IncidenciaSol, LstIncidenciaSolArchivo, LstIncidenciaSolPalabra } from 'src/app/system-models/solucionObj';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent implements OnInit{
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
  solucionComentario: incidenciaSolucion[]=[];
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
  tagsObj:incidenciaSolucionPalabrasClave={
    id: 0,
    idIncidenciaSolucion: 0,
    palabraClave: '',
    
  }
  solucionPalabra:LstIncidenciaSolPalabra={
    id: 0,
    idIncidenciaSolucion: 0,
    palabraClave: ''
  }
  
  solucionArchivo: LstIncidenciaSolArchivo={
    id: 0,
    idIncidenciaSolucion: 0,
    idUsuario: 0,
    urlArchivo: '',
    nombreArchivo: ''
  }
  solucionList: incidenciaObj[]=[];
  solucion: incidenciaObj={
    incidenciaSol: undefined,
    lstIncidenciaSolArchivos: [],
    lstIncidenciaSolPalabras: []
  }
  comentar: any [];
  

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {  
      //console.log("data",data),    
      //////////////console.log("dataIn", data.incidencia) 
      this.dialogTitle = 'Solución'; 
      this.menuForm = this.createContactForm();
      this.ImgForm=this.createContactoForm();
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.AllTags.slice()
        )
      ); 
      for(let i =0; i<data.solucionImg.length;i++){
        //////////console.log("imagen de for",data.solucionImg[i].urlArchivo );
        this.listpre.push(data.solucionImg[i].urlArchivo); 
        //console.log("imagen de for", this.listpre);
      }      
   }
   createContactForm(): FormGroup<any> {
    
    return this.fb.group({
      id : [this.IncSolucionObj.id],
      //idIncidencia : [this.data.teachers.idIncidencia],     
       tipoSolucion : [this.data.solucionObj.tipoSolucion],
       solucion : [this.data.solucionObj.solucion],
       comentarios : [this.data.solucionObj.comentarios],
    });
    
  }
  descargarArchivo(url){
    window.open(url);
    }

  createContactoForm(): FormGroup<any> {
    return this.fb.group({
      uploadFile:[this.data.solucionImg.urlArchivo]
     })
   }
  
   LoadData(){
    //  this.seguridadService.getIncidenciaSolucion(this.data.teachers.idSolucion).subscribe(res =>{
    //   //////////console.log("res de load",res.objModel);
    //   //this.solucionList.push(res.objModel)
    //   this.IncSolucionObj.comentarios= res.objModel.incidenciaSol.comentarios;
    //   this.solucionComentario.push(res.objModel.incidenciaSol);
    //   //this.comentar.push(this.IncSolucionObj.comentarios);
      
    //  })
    //  //////////console.log("objeto",this.solucionComentario);
   }
  add(event: MatChipInputEvent): void {
    this.tagAdd ={
      id: 0,
      nombre: ''
    }
    const input = event.input;
    const value = event.value;
    // Agregar Tags
    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      ////////////console.log("value:", value.trim())
      this.tagAdd.id=0;
      this.tagAdd.nombre = value.trim();
      this.tagSoluciones.push(this.tagAdd);
    }
    // Resetear el input
    if (input) {
      input.value = '';
    }
    this.tagsCtrl.setValue(null);
  }
  remove(tag: string): void {
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagAdd ={
      id: 0,
      nombre: ''
    }
    let _nombre =event.option.viewValue;
    this.parDetalle = this.tagListBD.filter( x => x.nombre == _nombre)[0];
    ////////////console.log("det:", this.parDetalle)
    this.tagAdd.id=this.parDetalle.id;
    this.tagAdd.nombre = _nombre;
    this.tagSoluciones.push(this.tagAdd);
    this.tagList.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
    
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit(): void {  
    this.LoadData();
    this.LoadPerfiles();
  //   this.menuForm = this.fb.group({
  //     name: new FormControl({ value: '', disabled: this.disabled })
  // });
  }
  
  
  capturarFile(event){
    if(this.listImg.length == 0){
      const archivonuevo=event.target.files[0];
      this.GoextraerBase64(archivonuevo);
      this.listImg.push(archivonuevo);
    }else if(this.listImg.length == 1){
      const archivonuevo=event.target.files[0];
      this.GoextraerBase64(archivonuevo);
      this.listImg.push(archivonuevo);
    }else if(this.listImg.length == 2){
      const archivonuevo=event.target.files[0];
      this.GoextraerBase64(archivonuevo);
      this.listImg.push(archivonuevo);
    }else if(this.listImg.length == 3){
      this.showNotification(
        'snackbar-danger',
        'Máximo de archivos permitidos',
        'bottom',
        'center'
      );
    }  
    this.ImgForm.get('uploadFile').setValue('');
  }
  GoextraerBase64(archivonuevo: any) {
    this.extraerBase64(archivonuevo).then((imagen: any)=>{
      this.previzualizacion = imagen.base;
      //this.listpre.push(imagen.base);
    })
  }
   deleteImg(img){
    ////////////console.log("img",img);

    const dialogRef = this.dialog.open(FormImagenDetailComponent,{
       data:{
         img,
      
       }
    })
  //    var index= this.listpre.indexOf(img);
  //    this.listpre.splice(index,1); 
  //  this.listImg.splice(index,1); 
  //    this.showNotification(
  //      'snackbar-success',
  //      'Imágen eliminada',
  //      'bottom',
  //      'center'
  //    );
   }
  //  eventoImg(img){
  //   ////////////console.log("img",img);
  //    const dialogRef = this.dialog.open(FormImagenDetailComponent,{
  //      data:{
  //        img,
       
  //      }
  //    })
  //  }
   
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
  public confirmAdd(): void {
    for (let index = 0; index < this.listImg.length; index++) {
    let count =1;
    const element = this.listImg[index];
    this.IncSolucionObj=this.menuForm.value;
    let idincidencia = this.IncSolucionObj.idIncidencia;
    ////////////console.log("id",this,idincidencia);
    //this.tagsObj.tags = this.tagSoluciones;
    //this.seguridadService.insertIncidenciaSolucion(this.IncSolucionObj).subscribe( res =>{      
      //this.tagsObj.idIncidenciaSolucion =res.objModel;
      // this.seguridadService.insertTagsSoluciones(this.tagsObj).subscribe(res => {

      //   for(let i=0;i<this.tagsObj.tags.length;i++){
      //   this.solucionPalabra.id=this.tagsObj.id;
      //   this.solucionPalabra.idIncidenciaSolucion=this.tagsObj.idIncidenciaSolucion;
      //   this.solucionPalabra.idPalabraClave=this.tagsObj.tags[i].id;
      //   ////////////console.log("palabraclave",this.solucionPalabra);
      // }
      // })
      let fileName = 'adjunto_'+idincidencia+'_'+count+'.jpg';//element.name+idincidencia+count+'.jpg';
      this.solucionArchivo.id=0;
      this.solucionArchivo.idIncidenciaSolucion=this.tagsObj.idIncidenciaSolucion;
      this.solucionArchivo.idUsuario=Number(JSON.parse(localStorage.getItem('currentUser')).id);
      this.solucionArchivo.urlArchivo=environment.directorio+fileName;
      this.solucionArchivo.nombreArchivo=element.name;
      
      ////////////console.log("img",this.solucionArchivo);
      ////////////console.log("obj",this.IncSolucionObj)
      ////////////console.log("tagsObj",this.tagsObj)
      this.solucion.incidenciaSol=this.IncSolucionObj;
      this.solucion.lstIncidenciaSolArchivos.push(this.solucionArchivo);
      this.solucion.lstIncidenciaSolPalabras.push(this.solucionPalabra)
      ////////////console.log("objetoCompleto",this.solucion);
      this.seguridadService.insertSolucion(this.solucion).subscribe(res =>{
        
      })




    //})
    
    
  }
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