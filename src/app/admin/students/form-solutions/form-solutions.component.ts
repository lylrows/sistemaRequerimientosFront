import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder ,Validators, UntypedFormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incidenciaSolucion, incidenciaSolucionPalabrasClave, tag } from 'src/app/system-models/incidencia';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parametroDetalle } from 'src/app/system-models/parametros';
@Component({
  selector: 'app-form-solutions',
  templateUrl: './form-solutions.component.html',
  styleUrls: ['./form-solutions.component.sass']
})
export class FormSolutionsComponent implements OnInit {
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
  tagsObj:incidenciaSolucionPalabrasClave={
    id: 0,
    idIncidenciaSolucion: 0,
    palabraClave: '',
   
  }

  constructor(public dialogRef: MatDialogRef<FormSolutionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,) {      
      //////////console.log("dataIn", data) 
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
      idIncidencia : [this.data.incidencia.idIncidencia],     
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
    this.tagAdd ={
      id: 0,
      nombre: ''
    }
    const input = event.input;
    const value = event.value;
    // Agregar Tags
    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      //////////console.log("value:", value.trim())
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
    //////////console.log("det:", this.parDetalle)
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
    this.LoadPerfiles();
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
      this.listpre.push(imagen.base);
    })
  }
  deleteImg(img){
    var index= this.listpre.indexOf(img);
    this.listpre.splice(index,1); 
    this.listImg.splice(index,1); 
    this.showNotification(
      'snackbar-success',
      'Imágen eliminada',
      'bottom',
      'center'
    );
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
      //////////console.log("??",this.Soluciones);
    })
    this.seguridadService.getParameterDetails(14).subscribe(res =>{
      this.tagListBD = res;
      //////////console.log("que es", this.tagListBD);
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
    this.IncSolucionObj=this.menuForm.value;
    //this.tagsObj.tags = this.tagSoluciones;
    this.seguridadService.insertIncidenciaSolucion(this.IncSolucionObj).subscribe( res =>{      
      this.tagsObj.idIncidenciaSolucion =res.objModel;
      this.seguridadService.insertTagsSoluciones(this.tagsObj).subscribe(res => {
        if(res.objModel){
          
        }
      })
    })
    //////////console.log("obj",this.IncSolucionObj)
    //////////console.log("tagsObj",this.tagsObj)
    //////////console.log("listImg",this.listImg)
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
