import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { StaffService } from '../../staff.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Staff } from '../../staff.model';
//import { formatDate } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from 'src/app/system-models/responseApi';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent  implements OnInit {
  action: string;
  dialogTitle: string;
  staffForm: UntypedFormGroup;
  staff: Staff={
    id: 0,
    idPerfil: 0,
    perfil: '',
    idEmpresa: 0,
    nombres: '',
    apellidos: '',
    email: '',
    tipoDocumento: 0,
    nroDocumento: 0,
    direccion: '',
    telefono: 0,
    celular: 0,
    img: '',
    esActivo: 0,
    primeraVez: 0,
    isGerente: false,
    getRandomID: function (): string {
      throw new Error('Function not implemented.');
    }
  };
  tiposperfiles: ResponseDTO;
  empresas: ResponseDTO;
  documentos: ResponseDTO;
  tipoDoc:any = 'text';
  maxLen:any = 8;
  file_load: string;
  file: File;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public staffService: StaffService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Perfil :'+data.staff.nombres+' - '+data.staff.apellidos;
      this.staff = data.staff;
      if(this.staff.img == ''){
        this.staff.img = environment.directorio+'user01.png';
        this.staffService.imgTemp = environment.directorio+'user01.png';
      }else{
        this.staffService.imgTemp =this.staff.img;
      }
      this.selectDocument(data.staff.tipoDocumento);
    } else {
      this.dialogTitle = 'Nueva Persona';
      this.staff = new Staff({});
      this.staff.img = environment.directorio+'user01.png';
      this.staffService.imgTemp = environment.directorio+'user01.png';
      this.staff.esActivo =1;
    }
    this.staffForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.LoadData();  
    this.file_load = this.staff.img;
  }
  LoadData() {
    this.staffService.getParameterDetails(2).subscribe(res =>{
      this.tiposperfiles=res;
      ////////////console.log("tiposperfiles", res)
    })
    this.staffService.getEmpresas().subscribe(res =>{
      this.empresas = res.objModel;
      ////////////console.log("getEmpresas", res.objModel)
    })
    this.staffService.getParameterDetails(3).subscribe(res =>{
      this.documentos=res;
      ////////////console.log("documentos", res)
    })
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.staff.id],
      idPerfil: [this.staff.idPerfil, [Validators.required]],
      idEmpresa: [this.staff.idEmpresa, [Validators.required]],
      nombres: [this.staff.nombres, [Validators.required]],
      apellidos: [this.staff.apellidos, [Validators.required]],
      email: [
        this.staff.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      tipoDocumento: [this.staff.tipoDocumento, [Validators.required]],
      nroDocumento: [this.staff.nroDocumento],
      direccion: [this.staff.direccion, [Validators.required]],
      telefono: [this.staff.telefono, [Validators.required]],
      celular: [this.staff.celular, [Validators.required]],
      img: [this.staff.img],
      esActivo: [this.staff.esActivo],
      isGerente: [this.staff.isGerente],
      uploadFile:['']
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.staff = this.FillObj(this.staffForm.value);    
    //////console.log("obj", this.staff);
    
    if (this.action === 'edit') {
      this.staffService.updatePersona(this.staff).subscribe( res =>{
        if(res.objModel){
          this.dialogRef.close(1);
        }
      })
    }else{
      this.staffService.insertPersona(this.staff).subscribe( res =>{
        if(res.objModel > 0){
          this.dialogRef.close(1);
        }
      })
    }
   
    //////////console.log("staff", this.staff)
  }
  FillObj(value: any): Staff {
    this.staff.idPerfil = value.idPerfil;
    this.staff.idEmpresa =value.idEmpresa;
    this.staff.nombres = value.nombres;
    this.staff.apellidos = value.apellidos;
    this.staff.email = value.email;
    this.staff.tipoDocumento = value.tipoDocumento;
    this.staff.nroDocumento = value.nroDocumento;
    this.staff.direccion = value.direccion;
    this.staff.telefono = value.telefono;
    this.staff.celular = value.celular;
    this.staff.esActivo = value.esActivo;
    this.staff.isGerente = value.isGerente;
    if(this.staffForm.value.uploadFile == ""){
      this.staff.img = environment.directorio+'user01.png';
    }else{
      this.staff.img = environment.directorio+this.staffForm.value.nroDocumento+'.jpg';
      this.file = this.staffForm.value.uploadFile;
      this.staffService.UploadPhoto(this.file, this.staffForm.value.nroDocumento+'.jpg').subscribe( res =>{
        //////////console.log("res", res.objModel);
      })
    }
    return this.staff;
  }
  selectDocument(event){
    //////////console.log(event.value);
    switch (Number(event.value)) {
      case 1:
        {
          this.tipoDoc = 'number';
          this.maxLen = "8";
          let nroDocumento = this.staffForm.get('nroDocumento').value;
          if(nroDocumento.length > 8){
            nroDocumento = nroDocumento.substring(0,8);
            this.staffForm.get('nroDocumento').setValue('');
            this.staffForm.get('nroDocumento').setValue(nroDocumento);
          }

        }
      break;
      case 2:
        {
          this.tipoDoc = 'text';
          this.maxLen = "13";
          let nroDocumento = this.staffForm.get('nroDocumento').value;
          if(nroDocumento.length > 13){
            nroDocumento = nroDocumento.substring(0,13);
            this.staffForm.get('nroDocumento').setValue(nroDocumento);
          }

        }
      break;
      case 3:
        {
          this.tipoDoc = 'text';
          this.maxLen = "15";
          let nroDocumento = this.staffForm.get('nroDocumento').value;
          if(nroDocumento.length > 15){
            nroDocumento = nroDocumento.substring(0,15);
            this.staffForm.get('nroDocumento').setValue(nroDocumento);
          }

        }
      break;
      case 4:
        {
          this.tipoDoc = 'text';
          this.maxLen = "23";
          let nroDocumento = this.staffForm.get('nroDocumento').value;
          if(nroDocumento.length > 23){
            nroDocumento = nroDocumento.substring(0,23);
            this.staffForm.get('nroDocumento').setValue(nroDocumento);
          }

        }
      break;
      case 5:
        {
          this.tipoDoc = 'number';
          this.maxLen = "11";
          let nroDocumento = this.staffForm.get('nroDocumento').value;
          if(nroDocumento.length > 11){
            nroDocumento = nroDocumento.substring(0,11);
            this.staffForm.get('nroDocumento').setValue(nroDocumento);
          }

        }
        break;
                        
      default:
        break;
    }

  }
  onchangeFileUpload(event){
   

  }
  onChangeGerente(event){
    //////console.log("gerente", event.checked)
  }
}
