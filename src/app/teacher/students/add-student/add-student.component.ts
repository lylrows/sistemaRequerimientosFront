import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment-timezone';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as XLSX from 'xlsx';
import { pedidos } from 'src/app/system-models/emision'
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {  
  public Editor = ClassicEditor;
  public Editor2 = ClassicEditor;
  stdForm: UntypedFormGroup;
  emissionForm :UntypedFormGroup;
  uploadProgress: any = {
    fichaTecnica: 0,
    tramaDatos: 0,
    cartaNoSiniestro: 0,
    documentosAdicionales: 0
  };
  files: any = {
    fichaTecnica: null,
    tramaDatos: null,
    cartaNoSiniestro: null,
    ordenesServicio: null,
    documentosAdicionales: []
  };
  filesAdd : File[] = [];
  fileThumbnails = {
    fichaTecnica: '',
    tramaDatos: '',
    cartaNoSiniestro: '',
    documentosAdicionales: '',
    ordenesServicio:''
  };
  
  fileNames = {
    fichaTecnica: 'Elegir archivo para ficha técnica',
    tramaDatos: 'Elegir archivo para trama de datos',
    cartaNoSiniestro: 'Elegir archivo para carta de no siniestro',
    documentosAdicionales: 'Elegir archivo para documentos adicionales',
    ordenesServicio:'Elegir archivo para ordenes de servicio'
  };
  validationRules = {
    "Edad mínima de ingreso:": { columnsToSkip: 2, validationFunction: this.validateDate },
    "Edad máxima de ingreso:": { columnsToSkip: 2, validationFunction: this.validateDate },
    "TASA NETA": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "Renovación": { columnsToSkip: 1, validationFunction: this.validateText },
    "RAZON SOCIAL": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "TIPO DE DOCUMENTO": { columnsToSkip: 1, validationFunction: this.validateText },
    "DIRECCIÓN": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "ACTIVIDAD ECONOMICA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "CONTACTO": { columnsToSkip: 1, validationFunction: this.validateText },
    "NOMBRE O RAZON SOCIAL": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "N° DOCUMENTO": { columnsToSkip: 1, validationFunction: this.validateDocumentNumber },
    "TELÉFONO": { columnsToSkip: 1, validationFunction: this.validatePhoneNumber },
    "CORREO ELECTRÓNICO": { columnsToSkip: 1, validationFunction: this.validateEmail2 },
    "Descripción de la forma de pago": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "CANAL":{columnsToSkip: 1, validationFunction: this.validateText},
    "EJECUTIVO":{columnsToSkip: 1, validationFunction: this.validateText},
    "RUC":{columnsToSkip: 1, validationFunction: this.validateDocumentNumber},    
    "TIPO DE EMPRESA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DEPARTAMENTO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "PROVINCIA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DISTRITO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DIRECCION": { columnsToSkip: 1, validationFunction: this.validateTextNull },    
    "SEDE O LUGAR DE TRABAJO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "PLAN": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "RENOVACIÓN": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "INICIO DE VIGENCIA": { columnsToSkip: 1, validationFunction: this.validateDate },
    "FIN DE VIGENCIA": { columnsToSkip: 1, validationFunction: this.validateDate },
    "TASA NETA SUGERIDA": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "PRIMA NETA": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "PRIMA TOTAL (INC. IGV)": { columnsToSkip: 1, validationFunction: this.validateNumber },    
  }

  /*validationRulesNew = {
    "CANAL":{columnsToSkip: 1, validationFunction: this.validateText},
    "EJECUTIVO":{columnsToSkip: 1, validationFunction: this.validateText},
    "RUC":{columnsToSkip: 1, validationFunction: this.validateDocumentNumber},
    "RAZON SOCIAL": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "ACTIVIDAD ECONOMICA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "TIPO DE EMPRESA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DEPARTAMENTO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "PROVINCIA": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DISTRITO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "DIRECCION": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "CONTACTO": { columnsToSkip: 1, validationFunction: this.validateText },
    "TELÉFONO": { columnsToSkip: 1, validationFunction: this.validatePhoneNumber },
    "CORREO ELECTRÓNICO": { columnsToSkip: 1, validationFunction: this.validateEmail2 },
    "SEDE O LUGAR DE TRABAJO": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "NOMBRE O RAZON SOCIAL": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "PLAN": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "RENOVACIÓN": { columnsToSkip: 1, validationFunction: this.validateTextNull },
    "INICIO DE VIGENCIA": { columnsToSkip: 1, validationFunction: this.validateDate },
    "FIN DE VIGENCIA": { columnsToSkip: 1, validationFunction: this.validateDate },
    "TASA NETA SUGERIDA": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "PRIMA NETA": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "PRIMA TOTAL (INC. IGV)": { columnsToSkip: 1, validationFunction: this.validateNumber },
    "Descripción de la forma de pago": { columnsToSkip: 1, validationFunction: this.validateTextNull },
  }*/

  workerValidationRules = [
    { columnName: "Ap. Paterno", validationFunction: this.validateText },
    { columnName: "Ap. Materno", validationFunction: this.validateTextOrNN },
    { columnName: "Nombre 1", validationFunction: this.validateText },
    { columnName: "Nombre 2", validationFunction: this.validateText2 },
    { columnName: "Nacionalidad", validationFunction: this.validateNacionalidad },
    { columnName: "Tipo de Documento", validationFunction: this.validateTipoDocumento },
    { columnName: "N° Documento", validationFunction: this.validateNumDocumento },
    { columnName: "Fecha de Nac.", validationFunction: this.validateFechaNacimiento },
    { columnName: "Sexo", validationFunction: this.validateSexo },
    { columnName: "Estado Civil", validationFunction: this.validateEstadoCivil },
    { columnName: "Tipo de Trabajador", validationFunction: this.validateTipoTrabajador },
    { columnName: "Sueldo", validationFunction: this.validateSueldo }
  ];
  isEstado:boolean = false;
  incidencia: any;
  sistema: any;
  listaComentarios: incidenciaComentario []=[];
  listImg: File[] = [];
  previzualizacion: string;
  listpre: any=[];
  incidencia_: incidencia;
  getincidencia_: Students;
  getempresa: Department;
  title = 'Agregar Ticket'
  items = ['Ticket']
  active = 'Agregar Ticket'

  breadscrums = [
    {
      title:this.title,
      items: this.items,
      active: this.active,
    },
  ];
  showEmisionTab: boolean = false;
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
  fileName: string;
  errors: string[] = [];
  boolimg: boolean;
  isPastDate: boolean = false;
  estadoPedidos: any;
  user: any;
  emailList: string[] = [];
  emailCopyList: string[] = [];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13]; // Enter key
  emailsCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  cuentas: any[] = [];
  movimientos: any[] = [];
  typeFicha: string ='new';
  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    public empresa: DepartmentService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router) {  
    this.user = JSON.parse(localStorage.getItem('currentUser'));   
    this.stdForm = this.fb.group({
      id: [0],     
      idEmpSist: ['', [Validators.required]],
      idUsuarioRegistro: [this.user.id],
      idTipoIncidencia:[1], //[Validators.required]],
      idSubtipoIncidencia:[1],// [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaRegistro: [new Date()],
      idPrioridad: [''],
      idEstado: [1],    
      fechaAtencion: [new Date()],
      esActivo: [1]
    });
    this.emissionForm = this.fb.group({
      titulo :['', [Validators.required]],
      descripcion:['', [Validators.required]],
      inicioVigencia:['', [Validators.required]],
      idEstado:[1, [Validators.required]],
      idCuenta: ['', [Validators.required]],
      idMovimiento: ['', [Validators.required]],
      fichaTecnica: [''],
      tramaDatos: [''],
      ordenesServicio: ['', Validators.required],
      cartaNoSiniestro: [''],
      documentosAdicionales: [''],
      tipoTecnica:['']
    })
    this.EditorForm = this.fb.group({
      comentario:['', [Validators.required]]
     });
    this.ImgForm = this.fb.group({
      uploadFile:['']
     });
     if(this.user.idTipoEmision == 2){
       this.showEmisionTab = true;
     }
      // Verificar si existe la lista en el localStorage
    const storedEmailList = localStorage.getItem('emailList');
    if (storedEmailList) {
      this.emailList = JSON.parse(storedEmailList);
    }

     this.filteredEmails = this.emailsCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => email ? this._filter(email) : this.emailList.slice()));
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
    this.studentsService.getParameterDetail(1018).subscribe( res => {
      this.cuentas = res;
    })
    this.studentsService.getParameterDetail(1019).subscribe( res => {
      this.movimientos = res;
    })
    this.studentsService.getParameterDetail(11).subscribe( res => {
      this.estados = res;
    })
  }
  LoadSistemas(id:number) {
    this.studentsService.getSistemas(id).subscribe(res =>{
      this.sistema=res.objModel;
    })
    this.studentsService.getParameterDetail(18).subscribe(res =>{
      //console.log("pedidos", res)
      this.estadoPedidos = res;
    })
  }  
  onChangeCuenta(event){
    //console.log("eventCuenta", event.value)
    if(event.value == 1){
      this.isEstado = true;
      const control = this.emissionForm.get('ordenesServicio');
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }else{
      this.isEstado = false;
      const control = this.emissionForm.get('ordenesServicio');
      control.clearValidators();
      control.updateValueAndValidity();
    }
    
  }
  onChangeMovimiento(event){
    console.log("movimientos", this.movimientos)
    console.log("e", event)
  }
  typeBtnClick(event){
    console.log("e", event)
    this.typeFicha = event;
    this.removeFile('fichaTecnica');
  }
  sendEmissionOrder() {           
    if(this.emissionForm.value.cartaNoSiniestro != ''){
      this.emissionForm.value.cartaNoSiniestro =this.emissionForm.value.cartaNoSiniestro.replace(/C:\\fakepath\\/i, '');
    }
    if(this.emissionForm.value.documentosAdicionales != ''){
      this.emissionForm.value.documentosAdicionales =this.emissionForm.value.documentosAdicionales.replace(/C:\\fakepath\\/i, '');
    }
    this.emissionForm.value.fichaTecnica =this.emissionForm.value.fichaTecnica.replace(/C:\\fakepath\\/i, '');
    this.emissionForm.value.tramaDatos =this.emissionForm.value.tramaDatos.replace(/C:\\fakepath\\/i, '');
    //console.log("emissionForm", this.emissionForm.value)
    //console.log("files", this.files)
    let emailListString = '';
    if (this.emailCopyList.length > 0) {
      emailListString = this.emailCopyList.join(',');
    }
    let pedidosObj : pedidos = {
      id: 0,
      titulo: this.emissionForm.value.titulo,
      descripcion: this.emissionForm.value.descripcion,
      inicioVigencia: this.emissionForm.value.inicioVigencia,
      idEstado: this.emissionForm.value.idEstado,
      fichaTecnica: this.emissionForm.value.fichaTecnica,
      tramaDatos: this.emissionForm.value.tramaDatos,
      cartaNoSiniestro: this.emissionForm.value.cartaNoSiniestro,
      documentosAdicionales: this.emissionForm.value.documentosAdicionales,
      idUsuarioRegistro: Number(JSON.parse(localStorage.getItem('currentUser')).id),
      fechaRegistro: new Date(),
      idUsuarioAtendido: 0,
      fechaAtencion: null,
      esActivo: 1,
      emailCopyList: emailListString,
      idCuenta: this.emissionForm.value.idCuenta,
      idMovimiento: this.emissionForm.value.idMovimiento,
      ordenesServicio:  this.emissionForm.value.ordenesServicio
    }
    this.filesAdd.push(this.files.fichaTecnica)
    this.filesAdd.push(this.files.tramaDatos)
    if(this.files.documentosAdicionales != []){
      this.files.documentosAdicionales.forEach(element => {
        this.filesAdd.push(element);
      });      
    }
    if(this.files.cartaNoSiniestro != null){
      this.filesAdd.push(this.files.cartaNoSiniestro)
    }
    if(this.files.ordenesServicio != null){
      this.filesAdd.push(this.files.ordenesServicio)
    }
    this.studentsService.insertEmisionPedido(pedidosObj, this.filesAdd).subscribe( res =>{
      if(res.objModel > 0){
        Swal.fire({
          title: 'OK',
          text: "Se registro el pedido con éxito", 
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',          
          confirmButtonText: '¡OK!',
        })
        /*const storedEmailListString = localStorage.getItem('emailList');
        let storedEmailList: string[] = [];
        if (storedEmailListString) {
          storedEmailList = JSON.parse(storedEmailListString);
        }
        // Crear una nueva lista con los correos electrónicos que no estén en la lista almacenada
        const newEmailList = this.emailList.filter(email => !storedEmailList.includes(email));
        // Combinar la lista almacenada con la nueva lista de correos electrónicos únicos
        const combinedEmailList = [...storedEmailList, ...newEmailList];
        // Almacenar la lista combinada en el localStorage
        localStorage.setItem('emailList', JSON.stringify(combinedEmailList));*/
        this.router.navigate(['/cliente/incidencias/incidencias']);
      }
    })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const email = value.trim();
      if (this.validateEmail(email) && !this.emailCopyList.includes(email)) {
        this.emailList.push(email);
        this.emailCopyList.push(email);
      }
    }

    if (input) {
      input.value = '';
    }

    this.emailsCtrl.setValue(null);
    //console.log("emailList", this.emailList)
    //console.log("emailCopyList", this.emailCopyList)
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  remove(email: string): void {
    const index = this.emailCopyList.indexOf(email);

    if (index >= 0) {
      this.emailCopyList.splice(index, 1);
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emailList.filter(email => email.toLowerCase().indexOf(filterValue) === 0);
  }
  selected(event): void {
    const email = event.option.viewValue;
    if (this.validateEmail(email)  && !this.emailCopyList.includes(email)) {
      //this.emailList.push(email);
      this.emailCopyList.push(email);
    }
    this.emailsCtrl.setValue(null);
    //this.saveListEmail();
    //console.log("emailList", this.emailList)
    //console.log("emailCopyList", this.emailCopyList)
  }
  onTabChange(event: MatTabChangeEvent): void{
    if (event.index === 0){
      this.title = 'Agregar Ticket'
      this.items = ['Ticket']
      this.active = 'Agregar Ticket'
    }else{
      this.title = 'Solicitar Emisión'
      this.items = ['Pedido']
      this.active = 'Emisión'
    }    
    this.breadscrums = [
      {
        title:this.title,
        items: this.items,
        active: this.active,
      },
    ];
  }
  onFileChange(event: any, control: string): void {
    if (event.target.files && event.target.files.length) {      
      const target: DataTransfer = <DataTransfer>(event.target);
      const reader: FileReader = new FileReader();
      const file = event.target.files[0];
      switch (control) {
        case 'fichaTecnica':             
          this.fileNames[control] = file.name;
          ////console.log("file", file)  
          this.files[control] = file;      
          if (target.files.length !== 1) {
            throw new Error('Cannot upload multiple files at once.');
          }          
          reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            // Read the file with xlsx
            const workbook = XLSX.read(bstr, { type: 'binary' });
            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // Convert the worksheet to an array of JSON objects
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // Process the data (validate, read rows and columns, etc.)
           
            this.processData(data);
           
            
          };  
          reader.readAsBinaryString(target.files[0]);          
          break;
        case 'tramaDatos': 
          this.fileNames[control] = file.name;
          ////console.log("file", file)  
          this.files[control] = file;          
          if (target.files.length !== 1) {
            throw new Error('Cannot upload multiple files at once.');
          }          
          reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            // Read the file with xlsx
            const workbook = XLSX.read(bstr, { type: 'binary' });
            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // Convert the worksheet to an array of JSON objects
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // Process the data (validate, read rows and columns, etc.)
            this.processDataWorker(data);
          }; 
          reader.readAsBinaryString(target.files[0]);    
          break;
        case 'cartaNoSiniestro':
          this.fileNames[control] = file.name;
          ////console.log("file", file)  
          this.files[control] = file; 
          break;
        case 'ordenesServicio':
          this.fileNames[control] = file.name;
          ////console.log("file", file)  
          this.files[control] = file; 
          break;
        case 'documentosAdicionales':   
          //console.log("target",event.target.files.length)
          for (let index = 0; index < event.target.files.length; index++) {
            const element = event.target.files[index];
            this.files.documentosAdicionales.push(element);
          }
                     
          this.fileNames[control] = this.files.documentosAdicionales.length + ' documento (s) agregado (s).';
          ////console.log("file", file) 
          break;
                
        default:
          break;
      }
      const fileExtension = file.name.split('.').pop().toLowerCase();
      switch (fileExtension) {
        case 'xls':
        case 'xlsx':             
          this.fileThumbnails[control] = 'assets/images/logo-excel.png';
          break;
        case 'txt':
          this.fileThumbnails[control] = 'assets/images/logo-txt.png';
          break;
        case 'pdf':
          this.fileThumbnails[control] = 'assets/images/logo-pdf.jpg';
          break;
        case 'doc':
        case 'docx':
          this.fileThumbnails[control] = 'assets/images/logo-word.jpg';
          break;
        default:
          this.fileThumbnails[control] = '';
      }
    }
    if(control == 'documentosAdicionales' && this.files.documentosAdicionales.length > 1){
      this.fileThumbnails[control] = 'assets/images/logo-documentos.jpg';
    }
    //console.log("files", this.files)
  }
  removeFile(control: string): void {
    switch (control) {
      case 'fichaTecnica':
        this.fileNames[control] = 'Elegir archivo para ficha técnica'; 
        break;
      case 'tramaDatos':
        this.fileNames[control] = 'Elegir archivo para trama de datos';
        break;
      case 'cartaNoSiniestro':
        this.fileNames[control] = 'Elegir archivo para carta de no siniestro';
        break;
      case 'documentosAdicionales':
        this.fileNames[control] = 'Elegir archivo para documentos adicionales';
        break;
      case 'ordenesServicio':
        this.fileNames[control] = 'Elegir archivo para carta de no siniestro';
        break;        
      default:
        break;
    }
    if(control == 'documentosAdicionales'){    
      this.files[control]=[];
    }else{
      this.files[control]=null;
    }
    this.fileThumbnails[control] = '';
    this.emissionForm.get(control).reset();
    
  }
  generateUniqueKey(row: any[]): string {
    // Cambiar el índice en función de la posición de las columnas en tu archivo
    const keyColumns = [0, 1, 2, 3, 6];
    const keyValues = keyColumns.map(index => row[index]);
    return keyValues.join('|');
  }
  isRowEmpty(row: any[]): boolean {
    return row.every(cell => !cell || cell.toString().trim() === '');
  }
  processDataWorker(data: any[]) {
    this.errors = [];
  // Validate data
  if (!data || data.length < 2) {
    this.errors.push('Invalid data format.');
    return;
  }

  // Read header row
  const header = data[0];
  console.log('Header:', header);
  const uniqueKeys = {};
  // Read and process rows
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const uniqueKey = this.generateUniqueKey(row);
    if (this.isRowEmpty(row)) {
      break;
    }
    if (uniqueKeys[uniqueKey]) {
      this.errors.push(`Registro duplicado en la fila ${i + 1}.`);
      break;
    } else {
      uniqueKeys[uniqueKey] = true;
    }
    for (let j = 0; j < row.length; j++) {
      
      if(header[j] == 'N° Documento'){
        const cell = row[j];          
        const cell1 = row[j - 1];   
        const { validationFunction } = this.workerValidationRules[j];
        const valid = validationFunction.apply(null, [cell, cell1]);  
        if (!valid) {
          this.errors.push(`En ${header[j]}: en la celda ${String.fromCharCode(65 + j)}${i + 1}.`);
        }      
      }else{
        let cell = row[j];  
        // Reemplazar caracteres especiales por un espacio en blanco si la celda es de tipo string
        /*if (typeof cell === 'string') {
          cell = cell.replace(/[^\w\s]/g, ' ');
        } */
        const { validationFunction } = this.workerValidationRules[j];
        const valid = validationFunction.apply(null, [cell]);
        if (!valid) {
          this.errors.push(`En ${header[j]}: en la celda ${String.fromCharCode(65 + j)}${i + 1}.`);
        }
      }         
    }
  }
  //console.log("errorsWorker", this.errors)
  if(this.errors.length > 0){ 
    let texInfo ='';
    this.errors.forEach(element => {
      texInfo = texInfo + '<ol>' + element + '</ol>'
    }); 
    Swal.fire({
      title: 'Error de data',
      text: texInfo, 
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',          
      confirmButtonText: '¡OK!',
      html:texInfo
    })
    this.removeFile('tramaDatos');
  }else{
    Swal.fire({
      title: 'OK',
      text: 'Archivo cargado', 
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',          
      confirmButtonText: '¡OK!',        
    })
  }
}  
  processData(data: any[]) {
    // Validate data
    this.errors = [];
    if (!data || data.length < 2) {
      console.error('Invalid data format.');
      return;
    }  
    // Read header row
    /*const header = data[0];
    console.log('Header:', header);*/  
    // Read and process rows
    for (let i = 1; i < data.length; i++) {     
      const row = data[i];
      for (const field in this.validationRules) {
        const targetTextIndex = row.findIndex(cell => cell === field);
        try {
          if (targetTextIndex !== -1) {
            const { columnsToSkip, validationFunction } = this.validationRules[field];
            const targetCell = row[targetTextIndex + columnsToSkip];
            const valid = validationFunction(targetCell);

            //console.log("row", row)
            //console.log("valid", valid)
            if (!valid && field == 'Edad mínima de ingreso:') {
              this.errors.push(`En Inicio de vigencia: en la celda ${String.fromCharCode(65 + targetTextIndex + columnsToSkip + 1)}${i + 1}.`);
            }
            else  if (!valid && field == 'Edad máxima de ingreso:') {
              this.errors.push(`En Fin de vigencia: en la celda ${String.fromCharCode(65 + targetTextIndex + columnsToSkip + 1)}${i + 1}.`);
            }
            else  if (!valid) {
              this.errors.push(`En ${field}: en la celda ${String.fromCharCode(65 + targetTextIndex + columnsToSkip)}${i + 1}.`);
            }
            break;
          }
        }catch (error){
          console.error("error", error);
          this.errors.push(`Se produjo un error: ${error.message}`);
          break;
        }
       
      }
    }
    //console.log("errors", this.errors)
    if(this.errors.length > 0){ 
      let texInfo ='';
      this.errors.forEach(element => {
        texInfo = texInfo + '<ol>' + element + '</ol>'
      }); 
      Swal.fire({
        title: 'Error de data',
        text: texInfo, 
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',
        html:texInfo
      })
      this.removeFile('fichaTecnica');
    }else{
      Swal.fire({
        title: 'OK',
        text: 'Archivo cargado', 
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',          
        confirmButtonText: '¡OK!',        
      })
    }
  }
  validateDate(cell: any): boolean {
    const datePattern = /\d{2}\/\d{2}\/\d{4}/;
    return typeof cell === 'string' && datePattern.test(cell);
  }  
  validateNumber(cell: any): boolean {
    return typeof cell === 'number';
  }  
  validateTextNull(cell: any) : boolean{
    if (typeof cell !== 'string') {
      return false;
    }  
    const trimmedCell = cell.trim();  
    // Verificar si el texto tiene una longitud mayor a 0
    if (trimmedCell.length === 0) {
      return false;
    }  
    return true;
  }
  validateText(cell: any): boolean {
    if (typeof cell !== 'string') {
      return false;
    }  
    const trimmedCell = cell.trim();  
    // Verificar si el texto tiene una longitud mayor a 0
    if (trimmedCell.length === 0) {
      return false;
    }  
    //console.log("cellValidateText", cell)
    const regex = /[^a-zA-Z0-9\s'\/áéíóúÁÉÍÓÚüÜñÑ]/;
    const splitString = trimmedCell.split("'");
    const hasSpecialCharacters = regex.test(trimmedCell);
     if(splitString.length > 1){
      return false;
     }
    if(hasSpecialCharacters){
      return !hasSpecialCharacters
    }
    return true;
  }
  validateText2(cell: any): boolean {
    return true;
  }
  validateDocumentNumber(cell: any): boolean {
    console.log("validateDocumentNumber", cell)
    const cellStr = String(cell);
    return cellStr.length == 11;
  }  
  validatePhoneNumber(cell: any): boolean {
    //console.log("validatePhoneNumber", cell)
    const cellStr = String(cell);
    return cellStr.length == 9;
  }
  validateEmail2(cell: any): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof cell === 'string' && emailPattern.test(cell);
  }  
  validateTextOrNN(cell: any): boolean {
    if (typeof cell !== 'string') {
      return false;
    }  
    const trimmedCell = cell.trim();  
    // Verificar si el texto tiene una longitud mayor a 0
    if (trimmedCell.length === 0) {
      return false;
    }  
    // Verificar si el texto contiene caracteres especiales
    //console.log("cellValidateText", cell)
    const regex = /[^a-zA-Z0-9\s'\/áéíóúÁÉÍÓÚüÜñÑ]/;
    const splitString = trimmedCell.split("'");
    //console.log("splitStringLength", splitString.length)
    //console.log("splitString", splitString)
    const hasSpecialCharacters = regex.test(trimmedCell);
    //console.log("hasSpecialCharacters", hasSpecialCharacters)  
    // Retornar false si hay caracteres especiales, de lo contrario true
     if(splitString.length > 1){
      return false;
     }
    if(hasSpecialCharacters){
      return !hasSpecialCharacters
    }
    return true;
  }  
  validateNacionalidad(cell: any): boolean {
    return cell.toString().toLowerCase() === 'peruano' || cell.toString().toLowerCase() === 'extranjero';
  }  
  validateTipoDocumento(cell: any): boolean {
    return cell === 'DNI' || cell === 'CE' || cell === 'Pasaporte';
  }  
  validateNumDocumento(cell: any, tipoDocumento: string): boolean {
    if (tipoDocumento === 'DNI') {
      return /^\d{8}$/.test(cell);
    } else if (tipoDocumento === 'CE') {
      return /^\d{9}$/.test(cell);
    } else if (tipoDocumento === 'Pasaporte') {
      return /^.{9}$/.test(cell);
    }
  
    return false;
  }
  validateFechaNacimiento(cell: any): boolean {
    let dateString: string;
  
    // Cuando la celda se lee como una fecha en formato numérico (sin apóstrofe)
    if (typeof cell === 'number') {
      // Convertir el número a fecha y luego a una cadena en formato 'dd/MM/yyyy'
      const excelDate = new Date(Math.round((cell - 25569) * 86400 * 1000));
      const day = ('0' + excelDate.getDate()).slice(-2);
      const month = ('0' + (excelDate.getMonth() + 1)).slice(-2);
      const year = excelDate.getFullYear();
      dateString = `${day}/${month}/${year}`;
    } else if (typeof cell === 'string') {
      // Cuando la celda se lee como una cadena (con apóstrofe)
      dateString = cell;
    } else {
      // Si no es ni cadena ni número, la celda no es válida
      return false;
    }
  
    // Validar el formato de la fecha y calcular la edad
    const datePattern = /\d{2}\/\d{2}\/\d{4}/;
    if (!datePattern.test(dateString)) {
      return false;
    }
  
    const [day, month, year] = dateString.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    //console.log("edad", age)  
    return age >= 18 && age <= 75;
  }
  validateSexo(cell: any): boolean {
    return cell === 'M' || cell === 'F';
  }
  
  validateEstadoCivil(cell: any): boolean {
    return ['soltero', 'casado', 'viudo', 'divorciado'].includes(cell.toString().toLowerCase());
  }
  
  validateTipoTrabajador(cell: any): boolean {
    cell = cell.Trim();
    return cell.toString().toLowerCase() === 'empleado' || cell.toString().toLowerCase() === 'obrero';
  }
  
  validateSueldo(cell: any): boolean {
    return typeof cell === 'number' && cell >= 1;
  }
  


  onDateChange(event: any): void {
    const selectedDate: Date = new FormControl(event.value).value as Date;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare only the date part
  
    if (selectedDate < currentDate) {
      this.isPastDate = true;
      this.emissionForm.get('cartaNoSiniestro').setValidators([Validators.required]);
    } else {
      this.isPastDate = false;
      this.emissionForm.get('cartaNoSiniestro').setValidators(null);
    }
    this.emissionForm.get('cartaNoSiniestro').updateValueAndValidity();
    //console.log("selectedDate", selectedDate)
    //console.log("isPastDate", this.isPastDate)
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
    // const currentDate = new Date(); 
    // currentDate.setTime(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)); 
    // currentDate.setHours(currentDate.getHours());
    // const dateInLimaTimezone = currentDate.toISOString();

// Obtener la zona horaria del cliente
const clientTimeZone = moment.tz.guess();
let date;
date = moment().tz('America/Lima');
    this._incidencia =  this.stdForm.value;     
    this._incidencia.idTipificacion =0;
    this._incidencia.calificacionIncidente =0;
    this._incidencia.cumplioANS =0;
    this._incidencia.idUsuarioActualiza =0;
    this._incidencia.fechaActualiza = new Date();
    this._incidencia.fechaRegistro= date._d;
    this._incidencia.idTipoIncidencia =-1;
    this._incidencia.idSubtipoIncidencia =-1;
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
        this._comentario.fechaRegistro = date._d;
          this.studentsService.insertIncidenciaComentario(this._comentario).subscribe(res =>{                        
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
                      this.router.navigate(['/cliente/incidencias/incidencias']);
            })         
            /*let count =1; 
            for (let index = 0; index < this.listImg.length; index++) {
              const element = this.listImg[index];
              if(element.type.toString().includes('pdf')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.name.toString().includes('.doc')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.name.toString().includes('.xls')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.name.toString().includes('.zip')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.name.toString().includes('.rar')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.name.toString().includes('.txt')){
                let extension = this.getFileExtension(element.name);
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.'+extension;
              }else if (element.type.toString().includes('image')){
                this.fileName = 'adjuntoCli_'+this.idIncidencia+'_'+count+'.jpg';
              }              
              this._incidenciaArchivo.idUsuario = this.stdForm.value.idUsuarioRegistro;
              this._incidenciaArchivo.idIncidencia = this.idIncidencia;
              this._incidenciaArchivo.nombreArchivo = element.name;
              this._incidenciaArchivo.urlArchivo =environment.directorio+this.fileName;
              this._incidenciaArchivo.fechaRegistro=date._d;
              this.studentsService.UploadPhoto(element, this.fileName).subscribe(res =>{  
              })
              this.studentsService.insertIncidenciaArchivos(this._incidenciaArchivo).subscribe(res =>{
              })
              count++;
            }*/
          }else{
            this.router.navigate(['/cliente/incidencias/incidencias']);
          }
         
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
    this.router.navigate(['/cliente/incidencias/incidencias']);
  }
}
