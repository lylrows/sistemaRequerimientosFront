import { Component, Inject,OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffService } from 'src/app/admin/staff/all-staff/staff.service';
import { accesos, objPersona } from 'src/app/system-models/acceso';
import { IncideciaService } from '../../students/about-student/incidencia.service';

@Component({
  selector: 'app-form-cliente-pass',
  templateUrl: './form-cliente-pass.component.html',
  styleUrls: ['./form-cliente-pass.component.sass']
})
export class FormClientePassComponent implements OnInit {
  dialogTitle:string;
  accesoForm: UntypedFormGroup;
  tyePass:any='password';
  tyeRePass:any='password';
  accesoObj:accesos = {
    id: 0,
    idPersona: 0,
    usuario: '',
    contrasenia: '',
    intentosFallidos: 0,
    codigoValidacion: 0,
    estaBloqueado: false
  }
  _cambioPersona: objPersona ={
    id: 0,
    idPerfil: 0,
    idEmpresa: 0,
    nombres: '',
    apellidos: '',
    email: '',
    tipoDocumento: 0,
    nroDocumento: '',
    direccion: '',
    telefono: '',
    celular: '',
    img: '',
    esActivo: 0,
    primeraVez: 0
  }
  password: string = '';
  txtButton: string = 'Crear Contraseña';
  action:string='add';
  constructor(public dialogRef: MatDialogRef<FormClientePassComponent>,
    public serviceacceso: IncideciaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public staffService: StaffService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,) {
      
      //////////console.log("data",data.id);

      this.dialogTitle = 'Primer login, actualice su contraseña';   
    this.staffService.getContraseniaByIdUser(this.data.id).subscribe(res =>{
      //////////console.log("contraseña", res.objModel);
      this.password = res.objModel;
      this.accesoForm = this.createContactForm();
      if(this.password != ''){
        this.txtButton ='Actualizar contraseña'
        this.action='upd';
      }
    })
    this.accesoForm = this.createContactForm();
   }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      nroDocumento:[this.data.nroDocumento],
      email:[this.data.email],
      password:[this.password, [Validators.required]],
      repassword:[this.password, [Validators.required]],
    })
  }

  ngOnInit(): void {
    
  }
  confirmAdd(){
    this.accesoObj.idPersona=this.data.id;
    this.accesoObj.usuario=this.accesoForm.value.email;
    this.accesoObj.contrasenia=this.accesoForm.value.password;
    this.accesoObj.fechaUltimoLogin=null;
    // if(this.action == 'add'){
    //    this.staffService.insertAcceso(this.accesoObj).subscribe(res=>{
    //      if(res.objModel>0){
    //        this.dialogRef.close(2);
    //      }else{
    //       this.showNotification(
    //         'snackbar-danger',
    //         'Ha ocurrido un error!!!',
    //         'bottom',
    //         'center'
    //       );
    //      }
    //   })
    // }else{
      this.staffService.updateContrasenia(this.accesoObj.contrasenia, this.accesoObj.usuario).subscribe(res =>{
        let idper =Number(JSON.parse(localStorage.getItem('currentUser')).id);
      this.serviceacceso.getacceso(idper).subscribe(res=>{
        //////////console.log("persona",res.objModel);
        this._cambioPersona=res.objModel;
        this._cambioPersona.primeraVez=1;
        this.serviceacceso.updatePersona(this._cambioPersona).subscribe(res=>{
          //////////console.log("modificaciónPer",res.objModel);
        })

      })
        if(res.objModel){
          this.dialogRef.close(1);
        }else {
          this.showNotification(
            'snackbar-danger',
            'Verifique el correo electrónico!!!',
            'bottom',
            'center'
          );
        }
      })
    //}
   
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
  changeRepass(){
    
    if(this.tyeRePass == 'password'){
      this.tyeRePass = 'text'
    }else{
      this.tyeRePass = 'password'
    }

  }
  changePass(){
    
    if(this.tyePass == 'password'){
      this.tyePass = 'text'
    }else{
      this.tyePass = 'password'
    }
  }
  validaPass(){
    let pass = this.accesoForm.get('password').value;
    let repass = this.accesoForm.get('repassword').value;
    //////////console.log("password",pass)
    //////////console.log("repassword", repass)
    if(pass != repass){
      this.accesoForm.get('repassword').setErrors(require);
    }
    
  }
}
