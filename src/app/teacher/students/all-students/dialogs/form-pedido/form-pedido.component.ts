import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsService } from '../../students.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { aprobacionCorreo, pedidos, pedidosArchivos, pedidosRespuesta } from 'src/app/system-models/emision';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.sass']
})
export class FormPedidoComponent implements OnInit {
  emissionForm :UntypedFormGroup;
  responseForm :UntypedFormGroup;
  boolDetail:boolean=false;
  emailList: string[] = [];
  emailToList: string[] = [];
  filteredEmails: Observable<string[]>;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13]; // Enter key
  emailsCtrl = new FormControl();
  public Editor2 = ClassicEditor;
  fileThumbnails = {
    fichaTecnica: 'assets/images/logo-excel.png',
    tramaDatos: 'assets/images/logo-txt.png',
    cartaNoSiniestro: 'assets/images/logo-pdf.jpg',
    documentosAdicionales: 'assets/images/logo-word.jpg'
  };
  
  fileNames = {
    fichaTecnica: 'Descargar todos los adjuntos',
    tramaDatos: 'Elegir archivo para trama de datos',
    cartaNoSiniestro: 'Elegir archivo para carta de no siniestro',
    documentosAdicionales: 'Elegir archivo para documentos adicionales'
  };
  estadoPedidos: any;
  pedidosObj : pedidos = {
    id: 0,
    titulo: '',
    descripcion: '',
    inicioVigencia: '',
    idEstado: 0,
    fichaTecnica: '',
    tramaDatos: '',
    cartaNoSiniestro: '',
    documentosAdicionales: '',
    idUsuarioRegistro: 0,
    fechaRegistro: undefined,
    idUsuarioAtendido: 0,
    fechaAtencion: undefined,
    esActivo: 0,
    emailCopyList: '',
    idCuenta: 0,
    idMovimiento: 0,
    ordenesServicio: ''
  }
  title = '';
  archivosList:pedidosArchivos[] = [];
  aprobacionCorreo: aprobacionCorreo;
  respuestaObj : pedidosRespuesta = {
    id: 0,
    idPedido: 0,
    titulo: '',
    comentario: ''
  }
  boolResponse: boolean = false;
  boolApprobed: boolean = false;
  idTipoEmision: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FormPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    private snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    )     
    {
      this.idTipoEmision = Number(JSON.parse(localStorage.getItem('currentUser')).idTipoEmision) == 1? false : true;
      if(data.action == 'detail'){
        this.title = 'Pedido de emisión Nro. '
        this.boolDetail = false;
        this.boolApprobed = true;
        this.boolResponse = true;
      }else if(data.action == 'aprobar'){
        this.title = 'Solicitud de aprobación para id Nro. '
        this.boolDetail = true;
        this.boolApprobed = false;
        this.boolResponse = true;
      }else{
        this.title = 'Respuesta del pedido de emisión Nro. '
        this.boolDetail = true;
        this.boolApprobed = true;
        this.boolResponse = false;
      }
      this.studentsService.getPedidosById(data.pedidos.id).subscribe( pedido => {
        //console.log("pedido", pedido.objModel) 
        this.pedidosObj =  pedido.objModel;
        //console.log("data", data.pedidos) 
        this.studentsService.downloadPedidosArchivos(this.data.pedidos.id).subscribe( res =>{
          this.archivosList = res.objModel   
          this.studentsService.getRespuestaByIdPedido(this.data.pedidos.id).subscribe( respuesta => {
            //console.log("respuesta", respuesta.objModel)
            if(respuesta.objModel != null){
              this.respuestaObj = respuesta.objModel;    
              this.responseForm = this.createResponseForm();        
            }
          })   
        })             
      })
      this.emissionForm = this.createEmissionForm();
      this.responseForm = this.createResponseForm();
      this.loadParameters();
      // Verificar si existe la lista en el localStorage
    const storedEmailList = localStorage.getItem('emailList');
    if (storedEmailList) {
      this.emailList = JSON.parse(storedEmailList);
    }

     this.filteredEmails = this.emailsCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => email ? this._filter(email) : this.emailList.slice()));
    }
  createResponseForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.data.pedidos.id],
      titulo:[this.respuestaObj.titulo, [Validators.required]],
      emailToList:[[]],
      comentario:[this.respuestaObj.comentario, [Validators.required]]
    })
  }
  createEmissionForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.data.pedidos.id],
      titulo:['', [Validators.required]],
      emailToList:[[], [Validators.required]],
      comentario:['', [Validators.required]]
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emailList.filter(email => email.toLowerCase().indexOf(filterValue) === 0);
  }
  remove(email: string): void {
    const index = this.emailToList.indexOf(email);

    if (index >= 0) {
      this.emailToList.splice(index, 1);
      this.emissionForm.get('emailToList').setValue(this.emailToList);
    }
  }
  aprobacion(){
    //console.log("form", this.emissionForm.value)
    this.aprobacionCorreo = this.emissionForm.value;
    this.studentsService.aprobacionCorreo(this.aprobacionCorreo).subscribe( res => {

    })
  }
  respuesta(){
    this.aprobacionCorreo = this.responseForm.value;
    this.studentsService.respuestaEmision(this.aprobacionCorreo).subscribe( res =>{
      if(res.objModel){
        this.dialogRef.close(1);
      }
    })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const email = value.trim();
      if (this.validateEmail(email) && !this.emailToList.includes(email)) {
        this.emailList.push(email);
        this.emailToList.push(email);
        this.emissionForm.get('emailToList').setValue(this.emailToList);
      }
    }

    if (input) {
      input.value = '';
    }

    this.emailsCtrl.setValue(null);
    //console.log("emailList", this.emailList)
    //console.log("emailToList", this.emailToList)
    this.saveListEmail();
  }
  saveListEmail() {
    const storedEmailListString = localStorage.getItem('emailList');
        let storedEmailList: string[] = [];
        if (storedEmailListString) {
          storedEmailList = JSON.parse(storedEmailListString);
        }
        // Crear una nueva lista con los correos electrónicos que no estén en la lista almacenada
        const newEmailList = this.emailList.filter(email => !storedEmailList.includes(email));
        // Combinar la lista almacenada con la nueva lista de correos electrónicos únicos
        const combinedEmailList = [...storedEmailList, ...newEmailList];
        // Almacenar la lista combinada en el localStorage
        localStorage.setItem('emailList', JSON.stringify(combinedEmailList));
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
    if(!emailRegex.test(email)) {
        this.showNotification(
        'snackbar-danger',
        'Formato incorrecto',
        'bottom',
        'center'
      );
    }
 
    return emailRegex.test(email);
  }
  selected(event): void {
    const email = event.option.viewValue;
    if (this.validateEmail(email)  && !this.emailToList.includes(email)) {
      //this.emailList.push(email);
      this.emailToList.push(email);
      this.emissionForm.get('emailToList').setValue(this.emailToList);
    }
    this.emailsCtrl.setValue(null);
    //this.saveListEmail();
    //console.log("emailList", this.emailList)
    //console.log("emailToList", this.emailToList)
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  loadParameters() {
    this.studentsService.getParameterDetail(18).subscribe(res =>{
      //console.log("pedidos", res)
      this.estadoPedidos = res;
    })
  }
  
  getImage(nombreArchivo :string) :string{
    const fileExtension = nombreArchivo.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'xls':
      case 'xlsx':             
      return 'assets/images/logo-excel.png';
        break;
      case 'txt':
        return 'assets/images/logo-txt.png';
        break;
      case 'pdf':
        return 'assets/images/logo-pdf.jpg';
        break;
      case 'doc':
      case 'docx':
        return 'assets/images/logo-word.jpg';
        break;
      default:
        return '';
    }
    
  }
  ngOnInit(): void {
  }
  download(file: pedidosArchivos){
    //console.log("urlArchivo", file.urlArchivo)
    window.open(file.urlArchivo, '_blank');
  }
  open(file: pedidosArchivos) {
    window.open(file.urlArchivo, '_blank');
  }
}
